<template>
  <div class="md:container md:mx-auto">
    <div class="bg-white rounded-3xl mt-2.5 mx-2.5 p-2.5 md:p-7">

          <div class=" flex gap-8 items-center justify-between ">
              <div>
                  <Breadcrumbs :items="crumbs" :back="back"/>
              </div>
              <div>
                  <div  class="h-full flex gap-8 items-center">
                      <div>
                          <Button class="rounded-lg p-2.5 but-1">Выгрузить отчет</Button>
                      </div>
                  </div>
              </div>
          </div>

        <div class="md:grid md:grid-cols-2">
          <div class="">
              <div class="content-title">Публикуемые отзывы на 78858215 </div>
              <div class="mt-8">
                  <div>В данном разделе вы можете согласовать отзывы, заказать фото к отзывам или докупить отзывы. Вы можете бесплатно прикрепить свои фотографии</div>
                  <div>Все расчеты производятся согласно тарифам или списываются с вашего баланса.</div>
                  <div class="text-red-400">После согласования, внести изменения корректировки нельзя!</div>
              </div>
          </div>
        </div>
          <div class="mt-12 ">
              <template v-if="tItems.length == 0">
                  <div class="result-empty">ЗДЕСЬ ПОКА НИЧЕГО</div>
              </template>
              <template v-else>

                <v-data-table
                  :headers="tHeaders"
                  :items="tItems"
                  class="postable"
                >
                  <template v-slot:item.image="{ item }">
                      <img :src="item.image" alt="" class="img-table">
                  </template>
                  <template v-slot:item.status="{ item }">
                      <template v-if="item.status && item.status.split('|').length > 1">
                          <span :class="'status-' + item.status.split('|')[1]">{{item.status.split('|')[0]}}</span>
                      </template>
                      <template v-else>{{item.status}}</template>
                  </template>
                  <template v-slot:item.review="{ item }">
                    <div class="flex gap-1">
                      <div>
                        <template v-if="item.review_editable">
                          <template v-if="item.status=='Согласовать|plan' ">
                            <v-textarea
                              solo
                              dense
                              v-model="item.review"
                              rows="2"
                            ></v-textarea>
                          </template>
                          <template v-else>
                            <v-textarea
                              solo
                              dense
                              v-model="item.review"
                              rows="2"
                              disabled
                            ></v-textarea>
                          </template>

                        </template>
                        <template v-else>{{item.review}}</template>


                      </div>
                      <template v-if="item.status=='Согласовать|plan' ">
                      <a href="#" @click.prevent="item.review_editable = !item.review_editable"><i class="icon icon_edit"></i></a>
                      </template>
                    </div>


                  </template>
                  <template v-slot:item.rating="{ item }">
                    <template v-if="item.status=='Согласовать|plan'">
                      <v-rating
                        dense
                        color="warning"
                        empty-icon="mdi-star-outline"
                        full-icon="mdi-star"
                        half-icon="mdi-star-half"
                        hover
                        length="5"
                        size="25"
                        v-model="item.rating"
                      ></v-rating>
                    </template>
                    <template v-else>
                      <v-rating

                        dense
                        color="warning"
                        empty-icon="mdi-star-outline"
                        full-icon="mdi-star"
                        half-icon="mdi-star-half"
                        length="5"
                        size="25"
                        disabled="true"
                        type="disable"
                        readonly
                        :value="item.rating"
                      ></v-rating>
                    </template>
                  </template>

                  <template v-slot:item.photos="{ item, index }">

                    <template v-if="item.status=='Согласовать|plan'">
                      <a href="#" @click.prevent="showPhotoAdd(index)"><v-icon dense>mdi-paperclip</v-icon>{{ item.photos.length}} шт.</a>
                    </template>

                    <template v-else>
                      <a><v-icon dense>mdi-paperclip</v-icon>{{ item.photos.length}} шт.</a>

                    </template>
                    </template>


                  <template v-slot:item.agreed="{ item }">
                    <template v-if="item.status=='Согласовать|plan'">

                      <Checkbox v-model="item.agreed"/>
                    </template>
                    <template v-else>
                      <label class="input-checkbox" value="true">
                        <input type="checkbox" name="" value="true" checked class="input-checkbox__input" disabled>
                        <span class="input-checkbox__active">✔</span>
                      </label>
                    </template>
                  </template>

                  <template v-slot:item.action="{ item, index }">
                      <template v-if="item.need_save">
                        <v-btn
                          elevation="1"
                          x-small
                          color="blue white--text"
                          rounded
                          @click="save(index)"
                        >Save</v-btn>
                      </template>
                  </template>

                </v-data-table>
              </template>
          </div>

    </div>

      <v-dialog
          v-model="photoAdd"
          transition="dialog-bottom-transition"
          max-width="800"
      >
        <v-card>
          <div class="bg-white rounded-3xl p-2.5 md:p-7">
              <div class="flex items-center justify-between">
                <div class="content-title">Фото</div>

                <div class="">
                  <div class="flex gap-4">
                  <div class="">
                    <div class="rounded-lg p-2.5 but-1 relative flex items-center justify-center rounded cursor-pointer ">
                        Добавить фото
                        <v-file-input
                                multiple
                                truncate-length="6"
                                @change="saveFiles(indexAdd, $event)"
                                class="w-full h-full absolute left-0 top-0 m-0 pt-0  mt-0 opacity-0"
                              ></v-file-input>
                      </div>
                  </div>
                  <Button class="rounded-lg p-2.5 but-1 " @click="photoAdd=false">Закрыть</Button>
                  </div>
                </div>

              </div>
              <div class="flex gap-4 my-8 flex-wrap justify-center">
                  <template v-if="tItems[indexAdd] && tItems[indexAdd]['photos'].length > 0">
                    <div v-for="(photo, i) in tItems[indexAdd]['photos']" class="relative">
                      <img :src="photo" alt="" class="w-52">
                      <a href="#" @click.prevent="tItems[indexAdd]['photos'].splice(i, 1)" class="absolute -right-3 -top-3 rounded-3xl bg-white">
                        <v-icon class="">mdi-close-circle-outline</v-icon>
                      </a>
                    </div>
                  </template>
                  <template v-else>
                    <div class="result-empty">ЗДЕСЬ ПОКА НИЧЕГО</div>
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
      tItems:[],
      tItemsCache:[],
      tHeaders:[],
      art:null,
      userId: 0,
      crumbs: [
          {"name": 'Отзывы', "link" : "/reviews", "type" : "link"},
          {"name": 'Артикул', "link" : "", "type" : "text"},
      ],
      photoAdd: false,
      indexAdd: null
    }
  },
  computed: {

  },

  watch: {
    tItems: {
      handler: function (val) {
        for (var i = 0; i < this.tItems.length; i++) {

          if (
            this.tItems[i]['review'] != this.tItemsCache[i]['review']
            || this.tItems[i]['rating'] != this.tItemsCache[i]['rating']
            || this.tItems[i]['agreed'] != this.tItemsCache[i]['agreed']
            || this.tItems[i]['photos'].length != this.tItemsCache[i]['photos'].length
          ) {
            this.tItems[i]['need_save'] = true
          }

          if (
            _.difference(this.tItems[i]['photos'], this.tItemsCache[i]['photos']).length > 0
            || _.difference(this.tItemsCache[i]['photos'], this.tItems[i]['photos']).length > 0
          ) {
            this.tItems[i]['need_save'] = true
          }

        }
      },
      deep: true
    }

  },
  methods: {


    showPhotoAdd: function(index) {
      this.indexAdd = index
      this.photoAdd = true
    },
    save: function(index) {


      this.$store.dispatch('request/reviews_save', {userId: this.userId, item: this.tItems[index]}).then((x) => {
          if ( !x.data.error ) {
              this.tItems[index]['need_save'] = false
              this.getByGroup()
          } else {
              this.$toast.error(x.data.msg);
          }
          this.tLoading = false
      })

    },

    saveFiles: function(index, files) {

      if (!files) {
        return
      }

      for (var i = files.length - 1; i >= 0; i--) {
        this.saveFile( index, files[i] )
      }
    },

    saveFile( index, file ) {
      if (!file) {
        return
      }
      const reader = new FileReader();
      reader.onload = e => {
        this.tItems[index]['photos'].push(e.target.result)
      };
      reader.readAsDataURL(file);
    },

    back: function() {
        this.$router.push('/reviews')
    },

    getByGroup: function() {
        this.tLoading = true
        this.$store.dispatch('request/reviews_list', {article: this.$route.params.group, userId: this.userId}).then((x) => {
          console.log(x);
          if ( !x.data.data.error ) {
                this.tItems  = x.data.data.products;
                this.tItemsCache  = _.cloneDeep(x.data.data.products);
                this.tHeaders = x.data.data.headers;
                this.art = this.$route.params.group;
            } else {
                this.$toast.error(x.data.msg);
            }
            this.tLoading = false
        })
    }

  },
  mounted() {
    this.userId = +window.localStorage.getItem('id');
    this.getByGroup()

  }
}
</script>



<style scoped>
  .input-checkbox {
    display: inline-block;
    width: 22px;
    height: 22px;
    background: #D9D9D9;
    border-radius: 4px;
    position: relative;
    overflow: hidden;
    cursor: pointer;
    outline: none;
  }

  .input-checkbox__input:checked ~ .input-checkbox__active {
    display: block;
  }

  .input-checkbox__active {
    color: #fff;
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    background: #92E6D6;
    text-align: center;
    line-height: 22px;
    display: none;
    outline: none;
  }
  .input-checkbox__input {
    height: 0px;
    width: 0px;
  }
</style>
