<template>
    <div class="md:container md:mx-auto">
        <div class="bg-white rounded-3xl mt-2.5 mx-2.5 p-2.5 md:p-7 pb-20">

            <div class=" flex gap-8 items-center justify-between ">
                <div>
                    <Breadcrumbs :items="crumbs" :back="back"/>
                </div>
                <div style="">
                    <template v-if="!showActions">
                        <div  class="h-full flex gap-8 items-center">
                            <div class="w-52">
                                <v-select style="width: 182px;" :items="sort_opt" label="" v-model="sort" dense outlined hide-details="auto" class="rounded-lg bg-white"/></v-select>
                            </div>
                        </div>
                    </template>
                </div>
            </div>

            <div class="mt-12">
                <div class="content-title">Заявка от {{tDate}}</div>

            </div>

            <template v-if="step == 1">
              <div class="mt-14" v-if="isDraft == 'true'">
                <div class="flex gap-4 items-center flex-col md:flex-row">
                  <div class="w-full md:w-auto">
                    <div class="input-block">
                      <input type="text" v-model="art" class="input-block__input input-block__input_w p-2.5" placeholder="Введите артикул" autocomplete="off">
                      <Button class="rounded-lg py-2.5 px-4 but-1 input-block__but" @click="findByArt" v-if="art">✚</Button>
                    </div>
                  </div>

                  <div class="w-full md:w-auto">
                    <Button class="rounded-lg p-2.5 but-0 w-full" @click="modalByApiShow=true">По API</Button>
                  </div>
                  <div class="w-full md:w-auto">
                    <Button class="rounded-lg p-2.5 but-0 w-full" @click="bulkAdd=true">Массовое добавление</Button>
                  </div>
                  <div class="w-full md:w-auto">
                    <template v-if="tItems.length > 0">
                      <Button class="rounded-lg p-2.5 but-1 w-full" @click="checkQueries">Далее</Button>
                    </template>
                  </div>
                  <div class="w-full md:w-auto">
                    <Button class="rounded-lg p-2.5 text-red-500 border border-solid border-red-500" @click="deleteDraft">Удалить черновик</Button>
                  </div>
                </div>
              </div>
              <div v-if="this.isDraft == 'true'" class="mt-12">
                <template v-if="tItems.length == 0">
                  <div class="result-empty">ЗДЕСЬ ПОКА НИЧЕГО</div>
                </template>
                <template v-else>

                  <v-data-table
                    :headers="tHeaders"
                    :items="tItems"
                    :item-class= "rowClasses"
                    class="postable"

                  >
                    <template v-slot:item.image="{ item }" :class="item.class">
                      <img :src="item.image"  alt="" class="img-table">
                    </template>
                    <template v-slot:item.status="{ item }" :class="item.class">
                      <span :class="'status-' + item.status.split('|')[1]">{{item.status.split('|')[0]}}</span>
                    </template>
                    <template v-slot:item.price="{ item }" :class="item.class">
                      {{item.price}} ₽
                    </template>
                    <template v-slot:item.size="{ item , index}" :class="item.class">
                      <template  v-if="item.sizes.length > 0">
                        <v-select @click="rmClass(index)" style="width: 104px; z-index: 2; position: relative" :items="item.sizes" label="" v-model="item.size" dense outlined hide-details="auto" class="rounded-lg bg-white"/></v-select>
                      </template>
                      <template v-else>
                        {{item.size}}
                      </template>
                    </template>
                    <template v-slot:item.gender="{ item }" :class="item.class">
                      <v-select style="width: 104px"   :items="genderOptions" v-model="item.gender" dense outlined hide-details="auto" class="rounded-lg bg-white"></v-select>
                    </template>
                    <template v-slot:item.count="{ item }" :class="item.class">
                      <Switcher v-model="item.count" :min="1"/>
                    </template>
                    <template v-slot:item.rcount="{ item }" :class="item.class">
                      <Switcher v-model="item.rcount" :min="0" :max="item.count" maxMsg="Кол-во отзывов не должно превышть кол-во выкупов"/>
                    </template>
                    <template v-slot:item.query="{ item, index }" :class="item.class">
                      <div class="input-block" style="width: 150px;" >
                        <input type="text" style="z-index: 2; position:relative;" @click="rmClass(index)" class="input-block__input input-block__input_w_1 py-2 px-4"   v-model="item.query">
                      </div>

                    </template>
                    <template v-slot:item.barcode="{ item, index }" :class="item.class">
                      <div class="input-block"  style="width: 150px;">
                        <input type="text" style="z-index: 2; position:relative;" @click="rmClass(index)" class="input-block__input input-block__input_w_1 py-2 px-4" v-model="item.barcode">
                      </div>
                    </template>
                    <template v-slot:item.copy="{ item, index }" :class="item.class">
                      <a href="#" @click.prevent="copy(index)"><i class="icon icon_copy"></i></a>
                    </template>
                    <template v-slot:item.del="{ item, index }" :class="item.class">
                      <a href="#" @click.prevent="del(index)"><i class="icon icon_close_g" style="z-index: 2; position: relative"></i></a>
                    </template>
                    <template v-slot:item.link="{ item }" :class="item.class">
                      <a :href="item.link"><i class="icon icon_arrow_r"></i></a>
                    </template>
                    <template v-slot:item.position="{ item }" :class="item.class">
                      <template v-if="item.position >= 0" >
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
              <div v-else :class="cls[sort]">
                    <template v-if="tItems.length == 0">
                        <div class="result-empty">ЗДЕСЬ ПОКА НИЧЕГО</div>
                    </template>
                    <template v-else>
                      <v-data-table
                        :headers="tHeaders"
                        :items="tItems"
                        class="postable"
                        :item-class= "rowClasses"
                      >
                        <template v-slot:item.image="{ item }">
                            <img :src="item.image" alt="" class="img-table">
                        </template>
                        <template v-slot:item.copy="{ item, index }">
                        </template>
                        <template v-slot:item.date_buy="{ item }">

                          <template>{{item.date_buy}}</template>
                        </template>
                        <template v-slot:item.status="{ item , index}" style="display: flex">
                            <template v-if="item.status">
                                <span :class="'status-' + item.status.split('|')[1]">{{item.status.split('|')[0]}}</span>
                            </template>
                        </template>
                        <template v-slot:item.price="{ item }">
                            {{item.price}} ₽
                        </template>
                        <template @focus="rmClass(item)"  v-slot:item.size="{ item }">
                            <template v-if="item.can_be_edited">
                                <v-select :items="item.sizes" style="width: 104px" label="" v-model="item.size" dense outlined hide-details="auto" class="rounded-lg bg-white"/></v-select>
                            </template>
                            <template v-else>{{item.size}}</template>
                        </template>
                        <template v-slot:item.gender="{ item }">
                            <template v-if="item.can_be_edited">
                                <v-select :items="genderOptions"  v-model="item.gender" dense outlined hide-details="auto" class="rounded-lg bg-white" style="width: 104px"></v-select>
                            </template>
                            <template v-else>{{item.gender}}</template>
                        </template>
                        <template   v-slot:item.count="{ item }">
                            <template v-if="item.can_be_edited">
                                <Switcher v-model="item.count"/>
                            </template>
                            <template v-else>{{item.count}}</template>
                        </template>
                        <template @click="rmClass(item)"  v-slot:item.rcount="{ item }">
                            <template v-if="item.can_be_edited">
                                <Switcher v-model="item.rcount"/>
                            </template>
                            <template v-else>{{item.rcount}}</template>
                        </template>
                        <template @click="rmClass(item)"  v-slot:item.query="{ item }">
                            <template v-if="item.can_be_edited">
                               <div class="input-block" style="width: 150px;">
                                  <input type="text" class="input-block__input input-block__input_w_1 py-2 px-4" v-model="item.query">
                               </div>
                            </template>
                            <template v-else>{{item.query}}</template>
                        </template>
                        <template @click="rmClass(item)" v-slot:item.barcode="{ item }">

                            <template>{{item.barcode}}</template>
                        </template>
                        <template v-slot:item.copy="{ item, index }">
                            <template v-if="item.can_be_edited">
                                <a href="#" @click.prevent="copy(index)"><i class="icon icon_copy"></i></a>
                            </template>
                        </template>
                        <template v-slot:item.del="{ item, index }">
                            <template v-if="item.status == 'Запланировано|plan'">
                              <v-btn icon @click="del( item['id'], item ,index)">
                                <v-icon>mdi-close</v-icon>
                              </v-btn>
                            </template>
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
                        <template v-slot:item.action="{ item, index }">
                             <a href="#" @click.prevent="showGroupModal(item)"><i class="icon icon_arrow_r"></i></a>
                        </template>
                      </v-data-table>
                    </template>
                </div>


              <div class="mt-12">
                <div>Общее количество:  <strong>артикулы - {{artCount}} шт, выкупов - {{posCount}} шт, отзывов - {{posRCount}} шт</strong> </div>
                <div>Сумма выкупа: <strong>{{buyOutSum}}₽</strong></div>
                <div>Услуги: <strong>0₽</strong></div>
              </div>

            </template>
            <template v-if="step == 2">
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
            <template v-if="step == 3">
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
                    <Button class="rounded-lg p-2.5 but-0" @click="step = 1">Добавить товары</Button>
                  </div>
                  <div class="w-full md:w-auto">
                    <template v-if="orderItems.length > 0">
                      <Button class="rounded-lg p-2.5 but-1" @click="orderSave()">Заказать</Button>
                    </template>
                  </div>
                  <div class="w-full md:w-auto">
                    <Button class="rounded-lg p-2.5 but-0" @click="draftSave()">В черновики</Button>
                  </div>
                  <div class="w-full md:w-auto">
                    <Button class="rounded-lg p-2.5 text-red-500 border border-solid border-red-500" @click="deleteDraft()">Удалить черновик</Button>
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
                      <v-select style="width: 104px" :items="item.sizes" label="" v-model="item.size" dense outlined hide-details="auto" class="rounded-lg bg-white"/></v-select>
                    </template>
                    <template v-else>
                      {{item.size}}
                    </template>
                  </template>
                  <template v-slot:item.gender="{ item }">
                    <v-select style="width: 104px" :items="genderOptions" v-model="item.gender" dense outlined hide-details="auto" class="rounded-lg bg-white"></v-select>
                  </template>
                  <template v-slot:item.count="{ item }">
                    <Switcher v-model="item.count"/>
                  </template>
                  <template v-slot:item.rcount="{ item }">
                    <Switcher v-model="item.rcount" :max="item.count" maxMsg="Колличество отзывов не должно превышать колличетсво выкупов"/>
                  </template>
                  <template v-slot:item.barcode="{ item }">
                    <div class="input-block" style="width: 150px;">
                      <input type="text" class="input-block__input input-block__input_w_1 py-2 px-4" v-model="item.barcode">
                    </div>
                  </template>
                  <template v-slot:item.del="{ item, index }">
                    <a href="#" @click.prevent="del(item.id, item, index)"><i class="icon icon_close_g"></i></a>
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
            <div class="bg-white rounded-3xl mt-2.5 mx-2.5 p-2.5 md:p-7 h-full">
                <div class="h-full flex flex-col gap-1">
                    <div class="content-title">Выберите товары</div>
                    <div class="flex gap-4">
                        <div class="input-block">
                            <input type="text" class="input-block__input input-block__input_w p-2.5" placeholder="Поиск по баркоду, артикулу поставщика, бренду" autocomplete="off" v-model="findWbParams.search">
                        </div>
                        <Button class="rounded-lg p-2.5 but-1" @click="addToTItems">Добавить</Button>
                    </div>

                    <div class="grow">
                        <template v-if="apiItems.length == 0">
                            <div class="result-empty">ЗДЕСЬ ПОКА НИЧЕГО</div>
                        </template>
                        <template v-else>
                            <CommonTable :headers="apiHeaders" :items="apiItems" :loading="apiItemsLoading" class="h-96">
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
                          label="Артикул через пробел, запятую или перенос строки"
                          autofocus
                          clearable
                          clear-icon="mdi-close-circle"
                          auto-grow
                          outlined
                          rows="5"
                          v-model="bulk.arts"
                        ></v-textarea>

                        <div class="mt-5">
                            <Button class="rounded-lg p-2.5 but-1 w-full" @click="bulkSend">Добавить</Button>
                        </div>
                    </template>
                    <template v-if="bulk.type == 2">
                        <div class="flex flex-col gap-4">
                            <a href="/Массовое добавление(под ключ).xlsx" download="" class="rounded-lg p-2.5 but-0">
                                <v-icon dense>mdi-tray-arrow-down</v-icon>
                                Скачать шаблон XLS
                            </a>

                            <Button class="rounded-lg p-2.5 but-1 overflow-hidden relative">
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
                    </template>
                </div>
            </div>
          </v-card>
        </v-dialog>

        <v-dialog
            v-model="groupDialog"
            transition="dialog-bottom-transition"
            max-width="1200"
        >
          <v-card>
              <div class="bg-white rounded-3xl p-2.5 md:p-7">
                <div v-if="bulk.type == 1">
                <v-data-table
                    :headers="bufferTHeaders"
                    :items="groupItems"
                    class="postable"
                    :item-class= "rowClasses"
                    :loading="tLoading"
                    loading-text="Loading... Please wait"
                  >
                    <template v-slot:item.image="{ item }">
                        <img :src="item.image" alt="" class="img-table">
                    </template>
                    <template v-slot:item.status="{ item }">
                        <template v-if="item.status">
                            <span :class="'status-' + item.status.split('|')[1]">{{item.status.split('|')[0]}}</span>
                        </template>
                    </template>
                    <template v-slot:item.price="{ item }">
                        {{item.price}} ₽
                    </template>
                    <template v-slot:item.size="{ item }">
                        <template v-if="item.can_be_edited">
                            <v-select :items="item.sizes" label="" v-model="item.size" dense outlined hide-details="auto" class="rounded-lg bg-white"/></v-select>
                        </template>
                        <template v-else>{{item.size}}</template>
                    </template>
                    <template v-slot:item.gender="{ item }">
                        <template v-if="item.can_be_edited">
                            <v-select :items="genderOptions" v-model="item.gender" dense outlined hide-details="auto" class="rounded-lg bg-white"></v-select>
                        </template>
                        <template v-else>{{item.gender}}</template>
                    </template>
                    <template v-slot:item.count="{ item }">
                        <template v-if="item.can_be_edited">
                            <Switcher v-model="item.count"/>
                        </template>
                        <template v-else>{{item.count}}</template>
                    </template>
                    <template v-slot:item.rcount="{ item }">
                        <template v-if="item.can_be_edited">
                            <Switcher v-model="item.rcount"/>
                        </template>
                        <template v-else>{{item.rcount}}</template>
                    </template>
                    <template v-slot:item.query="{ item }">
                        <template v-if="item.can_be_edited">
                           <div class="input-block" style="width: 150px;">
                              <input type="text" class="input-block__input input-block__input_w_1 py-2 px-4" v-model="item.query">
                           </div>
                        </template>
                        <template v-else>{{item.query}}</template>
                    </template>
                    <template v-slot:item.barcode="{ item }">
                        <template v-if="item.can_be_edited">
                           <div class="input-block" style="width: 150px;">
                              <input type="text" class="input-block__input input-block__input_w_1 py-2 px-4" v-model="item.barcode">
                           </div>
                        </template>
                        <template v-else>{{item.barcode}}</template>
                    </template>
                    <template v-slot:item.copy="{ item, index }">
                        <template v-if="item.can_be_edited">
                            <a href="#" @click.prevent="copy(index)"><i class="icon icon_copy"></i></a>
                        </template>
                    </template>
                    <template v-slot:item.del="{ item, index }">
                        <template v-if="item.can_be_edited">
                            <a href="#" @click.prevent="del(item['id'], item, index )"><i class="icon icon_close_g"></i></a>
                        </template>
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
                </div>
                <template v-if="bulk.type == 2">

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
              </div>
          </v-card>
        </v-dialog>
      <v-dialog
        v-model="searchDialog"
        transition="dialog-bottom-transition"
        max-width="400"
      >
        <v-card style="width: 500px; overflow: hidden">
          <div class="load_title" style="text-align: center; margin: 10px 0; font-size: 23px; font-weight: bold">Ищем товары, в выдаче товаров</div>
          <div style="width: 150px;margin: auto;">
            <v-progress-circular
              :size="150"
              color="#93e4d5"
              indeterminate
            ></v-progress-circular>
          </div>
        </v-card>
      </v-dialog>

    </div>
</template>


<script>
import _ from 'lodash';
import {mapState} from "vuex";

export default {
  components: {
    ...mapState('request', [
      'user',
      'opt_roles'
    ])
  },
  data() {
    return {
        bulk: {
            type: 1,
            arts: '',
            files: null
        },
        bulkAdd: false,
        groupDialog: false,
      searchDialog: false,
      dialogDate: false,

      localeData: {
        firstDay: 1, format: 'dd-mm-yyyy',
        applyLabel: 'Принять',
        cancelLabel: 'Закрыть',
        daysOfWeek: ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'],
        monthNames: ['янв.', 'февр.', 'март', 'апр.', 'май', 'июнь', 'июль', 'авг.', 'сент.', 'окт.', 'нояб.', 'дек.'],
      },

        sort_opt: [
            {'value': 1, 'text': 'По артикулам'},
            {'value': 3, 'text': 'Все (базовая)'},
            {'value': 2, 'text': 'По датам'},
        ],
        sort: 3,
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

      modelOptions: [
        {"value":"m1", "name":"Под ключ"},
        {"value":"m2", "name":"Самостоятельно"}
      ],
      model: "m1",
      step: 1,
      modalByApiShow: false,
      isDraft: this.$route.query.draft,
      selectedDate: [
        new Date().toISOString().split("T")[0],
        new Date(new Date().getTime() + 9 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      ],

        art:'',
        tItems:[],
        tHeaders:[],
        cls: {
          1:'mt-2.5',
          2:'mt-2.5 md:w-3/5',
          3: 'mt-2.5'
        },
        bufferTItems:[],
        bufferTHeaders:[],

        groupHeaders:[],
        groupItems:[],

        tLoading: true,
        orderItems:[],
        orderHeaders:[],

        apiItems:[],
        apiHeaders:[],

        findWbParams: {
            'search': '',
            'skip': 0,
            'take': 10,
        },
      userId: '',
      dialogDate: false,
        timeoutfindWb: null,
        apiItemsLoading: false,
        tDate: '',
        showActions: false
    }
  },
  watch: {


    sort: function(val) {
        this.getByGroup()
    },


    bulkAdd: function(val) {
        if ( val ) {
            this.bulk = { type: 1, arts: '', files: null}
        }
    },
    findWbParams: {
        deep: true,
        handler(val) {
            clearTimeout( this.timeoutFindWb )

        },
    },
    modalByApiShow: function(val) {
        if ( val ) {
            this.findWb()
        }
    }
  },
  computed: {
    dateRangeText: function() {
      let text = ''
      return this.selectedDate
      // return text
    },
    artCount : function() {
      let arts = []
      switch(this.step){
        case 1:
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
      if(this.draft){
        switch (this.step) {
          case 1:
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
      } else {
        for(let i in this.tItems){
          counts.push(1);
        }
      }


      return _.sum(counts)
    },
    posRCount : function() {
      let counts = []
      if(this.draft){
        switch (this.step) {
          case 1:
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
      } else {
        for(let i of this.tItems){
          if(i.type == 'отзыв'){
            counts.push(1);
          }
        }
      }
      return _.sum(counts)
    },
    buyOutSum : function() {
      let sums = []
      if(this.draft){
        switch (this.step) {
          case 1:
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
      } else {
        for(let i of this.tItems){
          sums.push(+i.price);
        }
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

    showGroupModal( item ) {
        this.groupItems = this.bufferTItems.filter( x => (_.indexOf(item.ids, x.id) > -1)  )
        this.groupDialog = true
      this.bulk.type = 1;
    },

    deleteDraft() {

    },
    dateRangeText: function() {
      let text = ''
      return this.selectedDate
      // return text
    },

    bulkFile: function( e ) {
        let files = e.target.files || e.dataTransfer.files;
        this.bulk.files = files
        this.bulkSend()
    },

    addToTItems: function() {
        let items = this.apiItems.filter(item => (item.check) )
        if ( items.length > 0 ) {
            for (var i = 0; i < items.length; i++) {

                let clone = _.cloneDeep(items[i])
                clone['can_be_edited'] = true

                this.tItems.push( clone )
            }

            this.modalByApiShow = false
            this.apiItems = []
        }

    },

    copy: function(index) {
        this.tItems.splice(index, 0, _.cloneDeep(this.tItems[index]) )
    },
    del(id, item, index ) {




      this.$store.dispatch('request/delete', {userId: this.userId, id: id}).then((x) => {

      })



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
    handleInput: function({name, value}) {
       this.model = value
    },
    findByArt: function(cnt = false, rcnt = false, barcode = false) {
      this.$store.dispatch('request/get_findbyart', {article: this.art, userId: this.userId}).then((x) => {


        this.tHeaders = x.data.data.headers;
        if(cnt){
          x.data.data.products['count'] = cnt;
          x.data.data.products['rcount'] = rcnt;
          x.data.data.products['barcode'] = barcode;
        }
        this.tItems.push(x.data.data.products);

        console.log(x);
        if ( x.data.error ) {
          this.$toast.warning(x.data.msg);
        }

      })
      this.art = '';
      this.step = 1;
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

            this.$store.dispatch('request/bulk_buffer', this.bulk).then((x) => {
                if (this.tHeaders.length == 0 && x.data.headers.length > 0) {
                    this.tHeaders = x.data.headers
                }

                if (x.data.items.length > 0) {
                    for (var i = x.data.items.length - 1; i >= 0; i--) {
                        x.data.items[i]['can_be_edited'] = true
                        this.tItems.push(x.data.items[i])
                    }
                } else {
                    this.$toast.warning('Ничего не добавлено');
                }

                if ( x.data.msgs.length > 0 ) {
                    for (var i = x.data.msgs.length - 1; i >= 0; i--) {
                        this.$toast.warning(x.data.msgs[i]);
                    }
                }

                this.bulkAdd = false
            })
        }
        if ( this.bulk.type == 2) {

            let formData = new FormData()
            this.bulk.files.forEach((item, i) => {
                formData.append(i, item)
            })
            formData.append('type', this.bulk.type)

            this.$store.dispatch('request/bulk_files', formData).then((x) => {
                if (this.tHeaders.length == 0 && x.data.headers.length > 0) {
                    this.tHeaders = x.data.headers
                }

                if (x.data.items.length > 0) {
                    for (var i = x.data.items.length - 1; i >= 0; i--) {
                        x.data.items[i]['can_be_edited'] = true
                        this.tItems.push(x.data.items[i])
                    }
                } else {
                    this.$toast.warning('Ничего не добавлено');
                }

                if ( x.data.msgs.length > 0 ) {
                    for (var i = x.data.msgs.length - 1; i >= 0; i--) {
                        this.$toast.warning(x.data.msgs[i]);
                    }
                }

                this.bulkAdd = false
            }).catch((error) => {
                this.$toast.error('Что то пошло не так')
            })
        }
    },

    draftSave: function () {
      console.log(this.orderItems)
      this.$store.dispatch('request/draft_update', {items: this.orderItems, userId: this.userId, group: this.$route.params.group}).then((x) => {
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
    checkQueries: function() {
      let loadingResultsInSearch2 = false;
      for(let i in this.tItems){
        if(this.tItems[i]['barcode'].length < 2){
          this.$toast.warning('Поле баркод пусто');
          console.log(this.tItems[i]);
          this.tItems[i].class = 'new_req_err';
          loadingResultsInSearch2 = true;
        }
        if(this.tItems[i]['query'].length < 2){
          this.$toast.warning('Поле Запрос пусто пусто');
          this.tItems[i].class = 'new_req_err';
          loadingResultsInSearch2 = true;
        }
        console.log(this.tItems[i]);
        if(this.tItems[i]['sizes'].length > 0 && this.tItems[i]['size'] == 0){
          this.$toast.warning('Размер не выбран');
          this.tItems[i].class = 'new_req_err';
          loadingResultsInSearch2 = true;
        }
        if(+this.tItems[i]['rcount'] > +this.tItems[i]['count']){
          this.$toast.warning('Комментариев не должно быть больше чем выкупов');
          this.tItems[i].class = 'new_req_err';
          loadingResultsInSearch2 = true;
        }

      }
      if(loadingResultsInSearch2){
        return 0;
      }

      this.searchDialog = true;
      this.$store.dispatch('request/checkallquery', {userId: this.userId, items: this.tItems}).then((x) => {
        this.searchDialog = false;
        let isError = false;
        for (var i = x.data.data.length - 1; i >= 0; i--) {
          console.log(x.data.data);
          if(x.data.data[i].position < 0 || !x.data.data[i].position){
            this.tItems[ x.data.data[i].index ]['warn'] = 'status-warning';
            this.tItems[i].class = 'new_req_err';
            this.$toast.warning('Запрос не найден');
            isError = true;
          }
          this.tItems[ x.data.data[i].index ]['position'] = x.data.data[i].position
          this.tItems[ x.data.data[i].index ]['class'] = x.data.data[i].class
        }

        if ( !isError ) {
          ++this.step
        } else {
        }
      })
    },
    rowClasses(item) {
      console.log(item.class);
      if(item.class == "new_req_err"){
        console.log(item, 1);
        return 'new_req_err'
      }
    },
    splitByDate: function() {
      this.$store.dispatch('request/splitbydate', {userId: this.userId, items: this.tItems, date: this.selectedDate}).then((x) => {
        this.orderItems = x.data.data.items
        this.orderHeaders = x.data.data.headers
        this.step = 3;
      })
    },
    orderSave: function( type ) {
      console.log(this.orderItems)
      this.$store.dispatch('request/draft_update', {items: [], userId: this.userId, group: this.$route.params.group}).then((x) => {
      })
      this.$store.dispatch('request/order_save', {items: this.orderItems, userId: this.userId,}).then((x) => {
        if ( !x.data.error ) {

          this.$toast.success(x.data.msg);
          this.orderItems = [];
          this.tItems = [];
          this.items = [];
          this.step = 1;
        } else {
          this.$toast.error(x.data.msg);
        }
      })

    },
    findWb: function() {

        this.apiItemsLoading = true
        this.$store.dispatch('request/find_wb', {userId: this.userId, ...this.findWbParams}).then((x) => {
            this.apiItemsLoading = false
            if ( !x.data.error ) {
                this.apiItems  = x.data.items
                this.apiHeaders = x.data.headers
            } else {
                this.$toast.error(x.data.msg);
            }
        })
    },
    deleteDraft(){
      this.$store.dispatch('request/draft_update', {items: [], userId: this.userId, group: this.$route.params.group}).then((x) => {
        if ( !x.data.error ) {

          this.$toast.success('Товар Успешно Удален');
          this.orderItems = []
          this.tItems = []
          this.items = []
          this.step = 1;
          this.$router.push('/buyout')
        } else {
          this.$toast.error(x.data.msg);
        }
      })

    },
    getByGroup: function() {
      console.log(this.isDraft == 'true');
        this.tLoading = true
        if(this.isDraft == 'true'){
          this.$store.dispatch('request/draft_list', {userId: this.userId, group: this.$route.params.group}).then((x) => {
            if ( !x.data.data.error ) {
              //this.orderItems  = x.data.data.products
              //this.orderHeaders = x.data.data.headers
              for(let i of x.data.data.products){
                this.art = +i['art'];
                this.findByArt(i['count'], i['rcount'], i['barcode']);

              }
              this.tDate = x.data.date
              this.showActions = x.data.data.show_actions
            } else {
              this.$toast.error(x.data.msg);
            }
            this.tLoading = false
          })

        } else {
          this.$store.dispatch('request/buyout_list', {userId: this.userId, sort: this.sort, group: this.$route.params.group}).then((x) => {
            if ( !x.data.data.error ) {
              this.tItems  = x.data.data.products;
              this.tHeaders = x.data.data.headers

              if ( this.sort == 3 ) {
                this.bufferTHeaders = x.data.data.headers
                this.bufferTItems = x.data.data.products

              }

              this.tDate = x.data.date
              this.showActions = x.data.data.show_actions
            } else {
              this.$toast.error(x.data.msg);
            }
            this.tLoading = false
          })

        }
    },
    sortBy(name){

    },
    rmClass(item){
    },

  },
  mounted() {
    this.userId = +window.localStorage.getItem('id');
    this.getByGroup();
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

.w-52{
  width: 182px;
  position: relative;
  left: -20px;
}
</style>
