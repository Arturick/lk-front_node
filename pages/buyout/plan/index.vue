<template>
    <div class="md:container md:mx-auto">
        <div class="bg-white rounded-3xl mt-2.5 mx-2.5 p-2.5 md:p-7 pb-20">

            <div class=" flex gap-8 items-center">
                <Breadcrumbs :items="crumbs" :back="back"/>
            </div>

            <div class="mt-12">
                <div class="progress">
                    <div class="progress__item" :class="{'progress__item_check' : step >= 1}">
                        <div class="progress__wrap">
                            <div class="progress__num">1</div>
                        </div>
                        <div class="progress__name">Модель работы</div>
                    </div>
                    <div class="progress__item" :class="{'progress__item_check' : step >= 2}">
                        <div class="progress__wrap">
                            <div class="progress__num">2</div>
                        </div>
                        <div class="progress__name">Добавить выкупы</div>
                    </div>
                    <div class="progress__item" :class="{'progress__item_check' : step >= 3}">
                        <div class="progress__wrap">
                            <div class="progress__num">3</div>
                        </div>
                        <div class="progress__name">График</div>
                    </div>
                </div>
            </div>


            <template v-if="step == 1">
                <div class="mt-12">
                    <div class="content-title">Выберите модель работы</div>

                    <div class="mt-8 md:w-3/5">
                        <div>«Под ключ» - мы сами выкупим ваши товары по нашим пунктам выдачи (их более 100), сами заберем и отгрузим вам, либо на склад маркетплейса.</div>
                        <div class="mt-4">«Самостоятельно» - вы сами оплачиваете товары через наши аккаунты, сами выбираете ПВЗ и сами забираете товар</div>
                    </div>
                </div>

                <div class="mt-14">
                    <div class="flex gap-4 items-center">
                        <div>
                            <v-select :items="model_opt" v-model="model" dense outlined hide-details="auto" label="Модель работы" class="rounded-lg bg-white"></v-select>
                        </div>
                        <div class="">
                            <Button class="rounded-lg p-2.5 but-1" @click="step = 2">Далее</Button>
                        </div>
                    </div>
                </div>
            </template>
            <template v-if="step == 2">
              <div v-if="model=='m2'">
                <div class="result-empty">ЗДЕСЬ ПОКА НИЧЕГО</div>
              </div>
              <div v-else>
                <div class="mt-12">
                  <div class="content-title">Добавить выкуп Wildberries</div>

                  <div class="mt-8 md:w-3/5">
                    <div>Создайте новую группу выкупов. Введите артикулы товаров и заполните необходимые данные.</div>
                  </div>
                </div>
                <div class="mt-14">
                  <div class="flex gap-4 items-center flex-col md:flex-row">
                    <div class="w-full md:w-auto">
                      <div class="input-block">
                        <input type="text" v-model="art" class="input-block__input input-block__input_w p-2.5" placeholder="Введите артикул" autocomplete="off">
                        <Button class="rounded-lg py-2.5 px-4 but-1 input-block__but" @click="findByArt" v-if="art">✚</Button>
                      </div>
                    </div>

                    <div class="w-full md:w-auto">
                      <Button class="rounded-lg p-2.5 but-0 w-full" @click="() => {
                              this.modalByApiShow = true;
                              this.apiItemsLoading = true;
                            }">По API</Button>
                    </div>
                    <div class="w-full md:w-auto">
                      <Button class="rounded-lg p-2.5 but-0 w-full" @click="bulkAdd=true">Массовое добавление</Button>
                    </div>
                    <div class="w-full md:w-auto">
                      <template v-if="tItems.length > 0">
                        <Button class="rounded-lg p-2.5 but-1 w-full" @click="checkQueries">Далее</Button>
                      </template>
                    </div>
                  </div>
                </div>
                <div class="mt-12">
                  <template v-if="tItems.length == 0">
                    <div class="result-empty">ЗДЕСЬ ПОКА НИЧЕГО</div>
                  </template>
                  <template v-else>

                    <v-data-table
                      :headers="tHeaders"
                      :items="tItems"
                      class="postable"
                      :item-class= "rowClasses"
                      :loading="!loadingResultsInSearch"
                    >
                      <template v-slot:item.image="{ item }">
                        <img :src="item.image"  alt="" class="img-table">
                      </template>
                      <template v-slot:item.status="{ item }">
                        <span  :class="'status-' + item.status.split('|')[1]">{{item.status.split('|')[0]}}</span>
                      </template>
                      <template v-slot:item.price="{ item }">
                        {{item.price}} ₽
                      </template>
                      <template v-slot:item.size="{ item , index}">
                        <template  v-if="item.sizes.length > 0">
                          <v-select @click="rmClass(index)" style="width: 104px; z-index: 2; position: relative" :items="item.sizes" label="" v-model="item.size" dense outlined hide-details="auto" class="rounded-lg bg-white"/></v-select>
                        </template>
                        <template v-else>
                          {{item.size}}
                        </template>
                      </template>
                      <template v-slot:item.gender="{ item }">
                        <v-select style="width: 104px"   :items="genderOptions" v-model="item.gender" dense outlined hide-details="auto" class="rounded-lg bg-white"></v-select>
                      </template>
                      <template v-slot:item.count="{ item }">
                        <Switcher v-model="item.count" @input="numberWrite(item)" :min="1"/>
                      </template>
                      <template v-slot:item.rcount="{ item }">
                        <Switcher v-model="item.rcount" @input="numberWrite(item)" :min="0" :max="item.count" maxMsg="Кол-во отзывов не должно превышть кол-во выкупов"/>
                      </template>
                      <template v-slot:item.query="{ item, index }">
                        <div class="input-block" style="width: 150px;"  v-if="loadingResultsInSearch">
                          <input type="text" style="z-index: 2; position:relative;" @click="rmClass(index)" class="input-block__input input-block__input_w_1 py-2 px-4"   v-model="item.query">
                        </div>
                        <div v-else>
                          <input type="text" style="z-index: 2; position:relative;" @click="rmClass(index)" disabled class="input-block__input input-block__input_w_1 py-2 px-4"  v-model="item.query">

                        </div>
                      </template>
                      <template v-slot:item.barcode="{ item, index }">
                        <div class="input-block"  style="width: 150px;">
                          <input type="text" style="z-index: 2; position:relative;" @click="rmClass(index)" class="input-block__input input-block__input_w_1 py-2 px-4" v-model="item.barcode">
                        </div>
                      </template>
                      <template v-slot:item.copy="{ item, index }">
                        <a href="#" @click.prevent="copy(index)"><i class="icon icon_copy"></i></a>
                      </template>
                      <template v-slot:item.del="{ item, index }">
                        <a href="#" @click.prevent="del(index)"><i class="icon icon_close_g" style="position:relative; z-index: 999"></i></a>
                      </template>
                      <template v-slot:item.link="{ item }">
                        <a :href="item.link"><i class="icon icon_arrow_r"></i></a>
                      </template>
                      <template v-slot:item.position="{ item }">
                        <template v-if="item.position >= 0">
                          <template v-if="item.position == 0">
                            <span class="status-dunger">{{item.position}}</span>
                          </template>
                          <template v-else>{{item.position}}</template>
                        </template>
                        <template v-else><span></span></template>
                      </template>
                    </v-data-table>
                  </template>
                </div>
                <div class="mt-12">
                  <div>Общее количество:  <strong>артикулы - {{artCount}} шт, выкупов - {{posCount}} шт, отзывов - {{posRCount}} шт</strong> </div>
                  <div>Сумма выкупа: <strong>{{buyOutSum}}₽</strong></div>
                  <div>Услуги: <strong>0₽</strong></div>
                </div>
              </div>


            </template>
            <template v-if="step==3">

              <div class="mt-12">
                    <div class="content-title">Период реализации</div>
                </div>

                <div class="mt-12">
                    <div class="flex gap-4 items-center">

                        <div class="w-96">
                            <v-dialog
                                ref="dialog"
                                v-model="dialogDate"
                                :return-value.sync="selectedDate"
                                persistent
                                width="290px"
                              >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                v-model="dateRangeText"
                                prepend-icon="mdi-calendar"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                              ></v-text-field>
                            </template>
                            <v-date-picker
                                v-model="selectedDate"
                                range
                                show-adjacent-months
                                locale="ru-RU"
                            >
                              <v-spacer></v-spacer>
                              <v-btn
                                text
                                color="primary"
                                @click="dialogDate = false"
                              >
                                Cancel
                              </v-btn>
                              <v-btn
                                text
                                color="primary"
                                @click="$refs.dialog.save(selectedDate)"
                              >
                                OK
                              </v-btn>
                            </v-date-picker>
                          </v-dialog>
                        </div>




                        <div>
                            <Button class="rounded-lg p-2.5 but-1" @click="splitByDate">Далее</Button>
                        </div>
                    </div>
                </div>
            </template>
            <template v-if="step == 4">
                <div class="mt-12">
                    <div class="content-title">Согласование заявки</div>
                </div>

                <div class="mt-12">
                    <div class="mt-8 md:w-3/5">
                        <div>Проверьте корректность заявки и отправить ее в работу, либо вы можете сохранить ее в черновики. Если заявка сохраняется в черновики, планируемая дата выкупа сохранена не будет.</div>
                    </div>
                </div>

                <div class="mt-14">
                    <div class="flex gap-4 items-center flex-col md:flex-row">
                        <div class="w-full md:w-auto">
                            <Button class="rounded-lg p-2.5 but-0" @click="step = 2">Добавить товары</Button>
                        </div>
                        <div class="w-full md:w-auto">
                            <template v-if="orderItems.length > 0">
                                <Button class="rounded-lg p-2.5 but-1" @click="orderSave('bid')">Заказать</Button>
                            </template>
                        </div>
                      <div class="w-full md:w-auto">
                        <Button class="rounded-lg p-2.5 but-0" @click="draftSave('draft')">В черновики</Button>
                      </div>
                    </div>
                </div>

                <div class="mt-12">

                    <v-data-table
                        :headers="orderHeaders"
                        :items="orderItems"
                        class="postable"
                        :item-class= "rowClasses"
                      >
                        <template v-slot:item.image="{ item }">
                            <img :src="item.image" alt="" v-model="item.image" class="img-table">
                        </template>
                        <template v-slot:item.status="{ item }">
                            <span :class="'status-' + item.status.split('|')[1]">{{item.status.split('|')[0]}}</span>
                        </template>
                        <template v-slot:item.price="{ item }">
                            {{item.price}} ₽
                        </template>
                        <template v-slot:item.size="{ item }">
                            <template v-if="item.sizes.length > 0">
                                <v-select :items="item.sizes" label="" v-model="item.size" dense outlined hide-details="auto" class="rounded-lg bg-white"/></v-select>
                            </template>
                            <template v-else>
                                {{item.size}}
                            </template>
                        </template>
                        <template v-slot:item.gender="{ item }">
                            <v-select style="width: 88px" :items="genderOptions" v-model="item.gender" dense outlined hide-details="auto" class="rounded-lg bg-white"></v-select>
                        </template>
                        <template v-slot:item.count="{ item }">
                            <Switcher v-model="item.count"/>
                        </template>
                        <template v-slot:item.rcount="{ item }">
                            <Switcher v-model="item.rcount" :max="item.count" maxMsg="Кол-во отзывов не должно превышть кол-во выкупов"/>
                        </template>
                        <template v-slot:item.barcode="{ item }">
                           <div class="input-block" style="width: 150px;">
                              <input type="text" class="input-block__input input-block__input_w_1 py-2 px-4" v-model="item.barcode">
                           </div>
                        </template>
                        <template v-slot:item.del="{ item, index }">
                            <a href="#" @click.prevent="del(index)"><i class="icon icon_close_g"></i></a>
                        </template>

                        <template v-slot:item.position="{ item }">
                            <template v-if="item.position >= 0">
                                <template v-if="item.position == 0">
                                    <span class="status-dunger">{{item.position}}</span>
                                </template>
                                <template v-else>{{item.position}}</template>
                            </template>
                            <template v-else><span></span></template>
                        </template>
                        <template v-slot:item.date="{ item, index }">
                            <Datepicker
                                v-model="item.date"
                                lang="ru"
                                input-class="datepicker-input"
                                position="left"
                              />
                        </template>
                      </v-data-table>

                </div>

              <div class="mt-12">
                <div>Общее количество:  <strong>артикулы - {{artCount}} шт, выкупов - {{posCount}} шт, отзывов - {{posRCount}} шт</strong> </div>
                <div>Сумма выкупа: <strong>{{buyOutSum}}₽</strong></div>
                <div>Услуги: <strong>0₽</strong></div>
              </div>

            </template>

        </div>
        <Modal v-show="modalByApiShow" @close-modal="modalByApiShow = false">
            <div class="bg-white rounded-3xl mt-2.5 mx-2.5 p-2.5 md:p-7" style="height: 600px">
                <div class="h-full flex flex-col gap-1">
                    <div class="content-title">Выберите товары</div>
                    <div class="flex gap-4">
                        <div class="input-block">
                            <input type="text" class="input-block__input input-block__input_w p-2.5" placeholder="Поиск по баркоду, артикулу поставщика, бренду" autocomplete="off" v-model="queryParams">
                        </div>
                        <Button class="rounded-lg p-2.5 but-1" @click="addToTItems">Добавить</Button>
                    </div>
                  <div class="grow" style="overflow: scroll; height: 70%">
                    <template>
                      <CommonTable :headers="apiHeaders" :items="sortPost" :loading="apiItemsLoading" class="h-96" style="overflow: auto">
                        <template v-slot:item.image="{ item }">
                          <img :src="item.image" alt="" class="img-table">
                        </template>
                        <template v-slot:item.check="{ item }">
                          <Checkbox v-model="item.check"/>
                        </template>

                      </CommonTable>
                    </template>
                  </div>
                </div>
            </div>
        </Modal>


        <v-dialog
            v-model="bulkAdd"
            transition="dialog-bottom-transition"
            max-width="450"
        >
          <v-card>
            <div class="bg-white rounded-3xl p-2.5 md:p-7">
                <div class="content-title">Массовое добавление</div>
                <div class="flex gap-4 mt-8">
                    <Button class="rounded-lg p-2.5 w-1/2" :class="{'but-1': bulk.type == 1}" @click="bulk.type = 1">Буфер обмена</Button>
                    <Button class="rounded-lg p-2.5 w-1/2" :class="{'but-1': bulk.type == 2}" @click="bulk.type = 2">Импорт из Excel</Button>
                    </div>
                <div class="mt-5">
                    <template v-if="bulk.type == 1">

                        <v-textarea
                          v-if="lotArtsLoad == false"
                          label="Артикул через пробел, запятую или перенос строки"
                          autofocus
                          clearable
                          clear-icon="mdi-close-circle"
                          auto-grow
                          outlined
                          rows="5"
                          v-model="bulk.arts"
                        ></v-textarea>
                          <div v-else style="margin: 40px auto; width: 100%">
                            <div class="load_title">Ищем товары, в выдаче товаров</div>
                            <div style="width: 150px;margin: auto;">
                              <v-progress-circular
                                :size="150"
                                color="#93e4d5"
                                indeterminate
                              ></v-progress-circular>
                            </div>
                            </div>
                        <div class="mt-5">
                            <Button class="rounded-lg p-2.5 but-1 w-full" @click="bulkSend">Добавить</Button>
                        </div>
                    </template>
                    <template v-if="bulk.type == 2">
                      <div v-if="!loadingExcel" style="    width: 100%;height: 120px;position: relative;overflow: hidden;">
                        <v-progress-circular
                          :size="70"
                          :width="7"
                          color="#92E6D6"
                          indeterminate
                          style="position: initial;"
                        ></v-progress-circular>
                      </div>
                      <div v-else>
                        <div class="flex flex-col gap-4">
                          <a href="/Массовое добавление(под ключ).xlsx" download="" class="rounded-lg p-2.5 but-0">
                            <v-icon dense>mdi-tray-arrow-down</v-icon>
                            Скачать шаблон XLS
                          </a>

                          <Button class="rounded-lg p-2.5 but-1 overflow-hidden relative" :loading="loadingExcel">
                            <v-icon dense>mdi-tray-arrow-up</v-icon>
                            <template v-if="!bulk.files">Загрузить XLS</template>
                            <template v-else>
                              <template v-if="bulk.files[0]['name']">
                                {{bulk.files[0]['name']}}
                              </template>
                            </template>

                            <input type="file" @change="bulkFile" class="file-up" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet">
                          </Button>
                        </div>
                      </div>

                    </template>
                </div>
            </div>
          </v-card>
        </v-dialog>
      <v-dialog
        v-model="bulkAdd2"
        transition="dialog-bottom-transition"
        max-width="450"
      >
        <v-card>
          <div class="bg-white rounded-3xl p-2.5 md:p-7">

            <div class="mt-5">
              <template v-if="bulk.type == 2">
                <div style="margin: 40px auto; width: 100%">
                  <div class="load_title">Ищем товары, в выдаче товаров</div>
                  <div style="width: 150px;margin: auto;">
                    <v-progress-circular
                      :size="150"
                      color="#93e4d5"
                      indeterminate
                    ></v-progress-circular>
                  </div>
                </div>
              </template>
              <template v-if="bulk.type == 1">
                <div v-if="!loadingExcel" style="    width: 100%;height: 120px;position: relative;overflow: hidden;">
                  <v-progress-circular
                    :size="70"
                    :width="7"
                    color="#92E6D6"
                    indeterminate
                    style="position: initial;"
                  ></v-progress-circular>
                </div>
                <div v-else>
                  <div class="flex flex-col gap-4">
                    <a href="/Массовое добавление(под ключ).xlsx" download="" class="rounded-lg p-2.5 but-0">
                      <v-icon dense>mdi-tray-arrow-down</v-icon>
                      Скачать шаблон XLS
                    </a>

                    <Button class="rounded-lg p-2.5 but-1 overflow-hidden relative" :loading="loadingExcel">
                      <v-icon dense>mdi-tray-arrow-up</v-icon>
                      <template v-if="!bulk.files">Загрузить XLS</template>
                      <template v-else>
                        <template v-if="bulk.files[0]['name']">
                          {{bulk.files[0]['name']}}
                        </template>
                      </template>

                      <input type="file" @change="bulkFile" class="file-up" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet">
                    </Button>
                  </div>
                </div>

              </template>
            </div>
          </div>
        </v-card>
      </v-dialog>
    </div>
</template>

<script>
export default {
  components: { },
  data() {
    return {
        bulk: {
            type: 2,
            arts: '',
            files: null
        },
        loadingResultsInSearch:true,
        bulkAdd: false,
        bulkAdd2: false,
        dialogDate: false,
        loadingExcel: true,
      queryParams: '',
      userId: '',
      lotArtsLoad: false,
      lotArtsLoad2: false,
      localeData: {
            firstDay: 1, format: 'dd-mm-yyyy',
            applyLabel: 'Принять',
            cancelLabel: 'Закрыть',
            daysOfWeek: ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'],
            monthNames: ['янв.', 'февр.', 'март', 'апр.', 'май', 'июнь', 'июль', 'авг.', 'сент.', 'окт.', 'нояб.', 'дек.'],
        },

        sizeOptions: [
          {"value":"", "name":"Нет"},
          {"value":"s", "name":"S"},
          {"value":"xs", "name":"XS"},
          {"value":"l", "name":"L"},
          {"value":"m", "name":"M"},
        ],
        genderOptions: [
          {"value":"", "name":"Нет", "text":"Нет"},
          {"value":"m", "name":"М", "text":"М"},
          {"value":"w", "name":"Ж", "text":"Ж"},
        ],
        countPageOptions: [
          {"value":10, "name":"10"},
          {"value":20, "name":"20"},
          {"value":50, "name":"50"},
          {"value":100, "name":"100"},
        ],
        crumbs: [
            {"name": 'Выкупы', "link" : "/buyout", "type" : "link"},
            {"name": 'Планирование', "link" : "", "type" : "text"},
        ],

      model_opt: [
        {"value":"m1", "text":"Под ключ"},
        {"value":"m2", "text":"Самостоятельно"}
      ],
      model: "m1",
      step: 1,
      modalByApiShow: false,
      selectedDate: [
            new Date().toISOString().split("T")[0],
            new Date(new Date().getTime() + 9 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        ],

      // selectedDate: {
      //       startDate: new Date(),
      //       endDate:
      //   },

        art:'',
        tItems:[],
        tHeaders:[],
        orderItems:[],
        orderHeaders:[],

        apiItems:[],
        apiHeaders:[],

        findWbParams: {
            'search': '',
            'skip': 0,
            'take': 11,
        },
        timeoutfindWb: null,
        apiItemsLoading: true
    }
  },
  watch: {

    bulkAdd: function(val) {
        if ( val ) {
            this.bulk = { type: 1, arts: '', files: null}
        }
    },
    findWbParams: {
        deep: true,
        handler(val) {
            clearTimeout( this.timeoutFindWb )
            this.timeoutFindWb = setTimeout(() => {
                this.getByApi();
            }, 200);
        },
    },
    modalByApiShow: function(val) {
        if ( val ) {
            this.getByApi();
        }
    }
  },
  computed: {
    sortPost: function(){
      return this.apiItems.filter(i => {
        console.log(i);
        return i.name.toLowerCase().includes(this.queryParams.toLowerCase());
      })
    },

    dateRangeText: function() {
        let text = ''
        return this.selectedDate
        // return text
    },

    artCount : function() {
        let arts = []
        switch(this.step){
          case 2:
            for (var i = 0; i < this.tItems.length; i++) {
              console.log(1221131);
              let art = this.tItems[i]['article']
              if ( arts.indexOf(art) < 0) {
                arts.push( art );
              }
            }
            break;
          case 4:
            for (var i = 0; i < this.orderItems.length; i++) {
              let art = this.orderItems[i]['article']
              if ( arts.indexOf(art) < 0) {
                arts.push( art );
              }
            }
            break;
        }


        return arts.length
    },
    posCount : function() {
        let counts = []
        switch (this.step) {
          case 2:
            for (var i = 0; i < this.tItems.length; i++) {
              let count = parseInt(this.tItems[i]['count'], 10)
              if ( count ) {
                counts.push( count )
              }
            }
            break;
          case 4:
            for (var i = 0; i < this.orderItems.length; i++) {
              let count = parseInt(this.orderItems[i]['count'], 10)
              if ( count ) {
                counts.push( count )
              }
            }
            break;
        }

        return _.sum(counts)
    },
    posRCount : function() {
        let counts = []
      switch (this.step) {
        case 2:
          for (var i = 0; i < this.tItems.length; i++) {
            let count = parseInt(this.tItems[i]['rcount'], 10)
            if ( count ) {
              counts.push( count )
            }
          }
          break;
        case 4:
          for (var i = 0; i < this.orderItems.length; i++) {
            let count = parseInt(this.orderItems[i]['rcount'], 10)
            if ( count ) {
              counts.push( count )
            }
          }
          break;
      }
        return _.sum(counts)
    },
    buyOutSum : function() {
        let sums = []

        switch (this.step) {
          case 2:
            for (var i = 0; i < this.tItems.length; i++) {
              let count = parseInt(this.tItems[i]['count'], 10)
              let price = parseInt(this.tItems[i]['price'], 10)
              if ( count && price ) {
                sums.push( count * price )
              }
            }
            break;
          case 4:
            for (var i = 0; i < this.orderItems.length; i++) {
              let count = parseInt(this.orderItems[i]['count'], 10)
              let price = parseInt(this.orderItems[i]['price'], 10)
              if ( count && price ) {
                sums.push( count * price )
              }
            }
            break;
        }

        return _.sum(sums)
    },
    servicesSum : function() {
        let sums = []
        for (var i = 0; i < this.tItems.length; i++) {
            let rcount = parseInt(this.tItems[i]['rcount'], 10)
            let price = parseInt(this.tItems[i]['price'], 10)
            if ( rcount && price ) {
                sums.push( rcount * price )
            }
        }
        return _.sum(sums)
    },
  },
  methods: {

    rowClasses(item) {
        if (item.class) {
          return item.class;
        }
    },
    bulkFile: function( e ) {
        let files = e.target.files;
        console.log(e.target.files);
   //   console.log(e.dataTransfer.files);
        this.bulk.files = files
        this.bulkSend()
    },
    addToTItems: function() {
        let items = this.apiItems.filter(item => (item.check) );
        console.log(items);
        if ( items.length > 0 ) {
            for (var i = 0; i < items.length; i++) {
              this.art = items[i]['art'];
              this.findByArt(1,1,items[i]['barcode'], '');
            }

            this.modalByApiShow = false
            this.apiItems = []
        }

    },
    copy: function(index) {
      this.tItems.splice(index, 0, _.cloneDeep(this.tItems[index]) )
    },
    del(index) {
        if ( this.step == 4 ) {
            this.orderItems.splice(index, 1);
            if ( this.orderItems.length == 0 ) {
                this.step = 2
            }
        } else {
            this.tItems.splice(index, 1);
            if ( this.tItems.length == 0 ) {
                this.step = 2
            }
        }

    },
    back: function() {
        if ( this.step == 1 ) this.$router.push('/buyout')
        else this.step = this.step - 1
    },
    findByArt: function(count = false, rcount = false, barcode = false, query = false) {
        this.$store.dispatch('request/get_findbyart', {userId: this.userId,article: this.art}).then((x) => {

              if(!x.data.data.products){
                this.$toast.warning(`Артикул ${this.art} Не найден`);
                return 0;
              }
              this.tHeaders = x.data.data.headers;
          if(count){
            x.data.data.products['count'] = count;
            x.data.data.products['rcount'] = rcount;
            x.data.data.products['barcode'] = barcode;
            x.data.data.products['query'] = query;
          }

              this.tItems.push(x.data.data.products);
          console.log(this.tItems);

            if ( x.data.error ) {
                this.$toast.warning(x.data.msg);
            }

        })
        this.art = ''
    },
    bulkSend: function() {

        if ( this.bulk.type == 1 && !this.bulk.arts ) {
            this.$toast.warning('Не введён артикул');
            return
        }

        if ( this.bulk.type == 2 && !this.bulk.files ) {
            this.$toast.warning('Не выбран файл');
            return
        }

        if ( this.bulk.type == 1) {
            this.lotArtsLoad = true;
            this.$store.dispatch('request/find_articles', {userId: this.userId, articles: this.bulk.arts}).then((x) => {
                    this.tHeaders = x.data.data.headers
                    this.bulkAdd = false
                    this.lotArtsLoad = false;
              console.log(x);
                if (x.data.data.products.length > 0) {
                    for (var i = x.data.data.products.length - 1; i >= 0; i--) {
                        this.tItems.push(x.data.data.products[i])
                    }
                } else {
                    this.$toast.warning('Ничего не добавлено');
                }




            })
        }
        if ( this.bulk.type == 2) {
            this.loadingExcel = false;
            let formData = new FormData();
            this.bulk.files.forEach((item, i) => {
                formData.append(i, item)
            })
            formData.append('type', this.bulk.type)
            console.log(formData);
            this.$store.dispatch('request/parseExcel', formData).then((x) => {
                this.bulkAdd = false;
              if(x.data.data.ers){
                this.$toast.error(`Ошибка в файле на строке ${x.data.data.line}`);
                this.loadingExcel = true;
                return 0;
              }
                this.loadingExcel = true;
                if (x.data.data.length > 0) {
                    for (let i = x.data.data.length - 1; i >= 0; i--) {
                        this.art = x.data.data[i]['art'];
                      this.findByArt(x.data.data[i]['count'], x.data.data[i]['rcount'], x.data.data[i]['barcode'], x.data.data[i]['query']);
                    }
                }



            }).catch((error) => {
              console.log(error);
              this.loadingExcel = true;
                this.$toast.error('Что то пошло не так')
            })
        }
    },
    getByApi(){
      this.apiItemsLoading = true;
      this.$store.dispatch('request/get_api', {userId: this.userId,}).then((x) => {
        this.apiItemsLoading = false
        if ( !x.data.error ) {

          this.apiItems = []
          for(let i = 0; i < x.data.data.products.length; i++){
            //if(x.data.data.products[i]['count'] > 0){
              this.apiItems.push(x.data.data.products[i])
            //}

          }
          this.apiHeaders = x.data.data.headers
        } else {
          this.$toast.error(x.data.msg);
        }
      })
    },
    checkQueries: function() {

      this.loadingResultsInSearch = false;
      for(let i in this.tItems){
        if(this.tItems[i]['barcode'].length < 2){
          this.tItems[i]['warn'] = 'new_req_err';
          this.$toast.error('Поле баркод пусто');
          this.loadingResultsInSearch = true;
          this.tItems[i].class = 'new_req_err';
        }
        if(this.tItems[i]['query'].length < 2){
          this.tItems[i]['warn'] = 'new_req_err';
          this.$toast.error('Поле Запрос пусто пусто');
          this.loadingResultsInSearch = true;
          this.tItems[i].class = 'new_req_err';
        }
        console.log(this.tItems[i]);
        if(this.tItems[i]['sizes'].length > 0 && this.tItems[i]['size'] == 0){
          this.tItems[i]['warn'] = 'new_req_err';
          this.$toast.error('Размер не выбран');
          this.loadingResultsInSearch = true;
          this.tItems[i].class = 'new_req_err';
        }
        if(+this.tItems[i]['rcount'] > +this.tItems[i]['count']){
          this.$toast.error('Комментариев не должно быть больше чем выкупов');
          this.loadingResultsInSearch = true;
          this.tItems[i].class = 'new_req_err';
        }

      }
      if(this.loadingResultsInSearch){return;}
      this.bulk.type = 2;
      this.bulkAdd2 = true;
      this.lotArtsLoad2 = true;
      this.$store.dispatch('request/checkallquery', {items: this.tItems, userId: this.userId,}).then((x) => {
        this.loadingResultsInSearch = true;
        this.lotArtsLoad2 = false;
        this.bulkAdd2 = false;
        let isError = false;
        for (var i = x.data.data.length - 1; i >= 0; i--) {
                console.log(x.data.data);
                if(x.data.data[i].position < 0 || !x.data.data[i].position){
                  this.tItems[ x.data.data[i].index ]['warn'] = 'status-warning';
                  this.tItems[i].class = 'new_req_err';
                  this.$toast.warning('Запрос не найден');
                  this.loadingResultsInSearch = true;
                  isError = true;
                }
                this.tItems[ x.data.data[i].index ]['position'] = x.data.data[i].position
                this.tItems[ x.data.data[i].index ]['class'] = x.data.data[i].class
            }

            if ( !isError ) {
                ++this.step
            } else {
                for (var i = x.data.msgs.length - 1; i >= 0; i--) {
                    this.$toast.error(x.data.msgs[i]);
                }

            }
        })
      .catch(error => {
        this.loadingResultsInSearch = true;
        this.$toast.error('Не найден запрос');
      })
    },
    splitByDate: function() {
        this.$store.dispatch('request/splitbydate', {items: this.tItems, date: this.selectedDate.sort((a,r) =>{return a < r}), userId: this.userId,}).then((x) => {
            this.orderItems = x.data.data.items
            this.orderHeaders = x.data.data.headers
            this.step = 4
        })
    },
    orderSave: function( type ) {
      console.log(this.orderItems)
      this.$store.dispatch('request/order_save', {items: this.orderItems, userId: this.userId, }).then((x) => {
            if ( !x.data.error ) {

                this.$toast.success('Заявка успешно оформлена');
                this.orderItems = []
                this.tItems = []
                this.items = []
                this.step = 1
            } else {
                this.$toast.error(x.data.msg);
            }
        })
    },
    draftSave: function (type) {
      console.log(this.orderItems)
      this.$store.dispatch('request/draft_save', {items: this.orderItems, userId: this.userId, }).then((x) => {
        if ( !x.data.error ) {

          this.$toast.success('Товар Успешно Сохранен');
          this.orderItems = []
          this.tItems = []
          this.items = []
          this.step = 1
        } else {
          this.$toast.error(x.data.msg);
        }
      })
    },
    findWb: function() {
        this.apiItemsLoading = true
        this.$store.dispatch('request/find_wb', this.findWbParams).then((x) => {
            this.apiItemsLoading = false
            if ( !x.data.error ) {
              console.log(x);
              this.apiItems = []
              for(let i = 0; i < x.data.items.length; i++){
                if(x.data.items[i]['rcount'] > 0){
                  this.apiItems.push(x.data.items[i])
                }

              }
                this.apiHeaders = x.data.headers
            } else {
                this.$toast.error(x.data.msg);
            }
        })
    },
    numberWrite(item){
      if(item.rcount > item.count){
        item.rcount = item.count;
        this.$toast.error('Комментариев не должно быть больше выкупов');
      }
      console.log(item);
    },
    rmClass(index){
      this.loadingResultsInSearch = false;
      this.tItems[index].class = 'new_req_err2';
      this.loadingResultsInSearch = true;
      console.log(index);
    },
  },
  mounted() {
    //this.findByArt()
    this.userId = +window.localStorage.getItem('id');
  }
}
</script>


<style scoped>
.progress {
  display: flex;
  align-items: center;
}
.progress__item {
    display: flex;
    align-items: center;
    gap: 8px;
    filter: grayscale(1);
}

.progress__item.progress__item_check {
 filter: grayscale(0);
}

.progress__num {
  width: 34px;
  height: 34px;
  background: #92E6D6;
  border-radius: 30px;
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 500;
  font-size: 17px;
  line-height: 21px;
  color: #000000;
  line-height: 34px;
  text-align: center;
  position: relative;
  z-index: 100;
}
.progress__wrap {
  position: relative;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 8px;
}
.progress__wrap:before {
  content: '';
  height: 2px;
  background: #92E6D6;
  z-index: 1;
  width: 130px;
}

.progress__item:first-child {
  width: auto;
  filter: grayscale(0);
}
.progress__item:first-child .progress__wrap {
  width: 34px;
}
.progress__item:first-child .progress__wrap:before {
  display: none;
}

.progress__name {
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  line-height: 18px;
  color: #92E6D6;
  position: relative;
  z-index: 10;
  height: 100%;
  background: #fff;
  display: inline-block;
  padding-right: 8px;
}
  .close{
    width: 32px;
  }

  .load_title{
    font-size: 20px;
    margin: 20px 0;
    width: 100%;
  }

  .v-input__append-inner{
    width: 100px;
  }
  .content{
    position: initial;
  }
</style>
