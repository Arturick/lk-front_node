<template>
  <div class="md:container md:mx-auto">
    <div class="bg-white rounded-3xl mt-2.5 mx-2.5 p-2.5 md:p-7">
        <div class="md:grid md:grid-cols-2">
            <div class="">
                <div class="content-title">Доставки (забираю я)</div>
                <div class="content-desc mt-3.5">Как только выкуп оплачен, он моментально появится в доставках. Дальше мы отслеживаем его статус. "Доставлен" - можно забирать с пункта выдачи. Обновляется в 10:00 МСК.</div>
            </div>
            <div class="flex gap-2.5 items-center justify-end flex-col md:flex-row mt-4">
              <div>
                  <v-select :items="[{value: 1, text: 'Активные'}]" label="Статус" v-model="filter.status" dense outlined hide-details="auto" class="rounded-lg bg-white w-full md:w-44"/></v-select>
              </div>
              <div>
                  <v-select :items="pvz_opt" label="ПВЗ" v-model="filter.pvz" dense outlined hide-details="auto" class="rounded-lg bg-white w-full md:w-44"/></v-select>
              </div>
              <div class="w-full md:w-44">
                  <Button class="rounded-lg p-2.5 but-1 w-full ">Скачать Excel</Button>
              </div>
            </div>
        </div>
          <div class="mt-12">
              <template v-if="tItemsImFiltered.length == 0">
                  <div class="result-empty">ЗДЕСЬ ПОКА НИЧЕГО</div>
              </template>
              <template v-else>

                <v-data-table
                  :headers="tHeadersIm"
                  :items="tItemsImFiltered"
                  class="postable"
                >
                  <template v-slot:item.image="{ item }">
                      <img :src="item.image" alt="" class="img-table">
                  </template>
                </v-data-table>
              </template>
          </div>
    </div>
    <div class="bg-white rounded-3xl mt-2.5 mx-2.5 p-2.5 md:p-7">
        <div class="md:grid md:grid-cols-2">
            <div class="">
                <div class="content-title">Получение товаров с ПВЗ (Забирают за меня)</div>
            </div>
            <div class="flex gap-2.5 items-center justify-end flex-col md:flex-row">
              <div class="w-full md:w-44">
                  <Button class="rounded-lg p-2.5 but-1 w-full">Скачать Excel</Button>
              </div>
            </div>
        </div>
          <div class="mt-12 md:w-3/5">
              <template v-if="tItemsForMe.length == 0">
                  <div class="result-empty">ЗДЕСЬ ПОКА НИЧЕГО</div>
              </template>
              <template v-else>

                <v-data-table
                  :headers="tHeadersForMe"
                  :items="tItemsForMe"
                  class="postable"
                >
                  <template v-slot:item.date="{ item }">{{item.date?.split('T')[0]}}</template>
                  <template v-slot:item.image="{ item }">
                      <img :src="item.image" alt="" class="img-table">
                  </template>
                 <template v-slot:item.status="{ item }">
                    <span :class="'status-' + item.status.split('|')[1]">{{item.status.split('|')[0]}}</span>
                </template>
                  <template v-slot:item.count="{ item }">
                    <span >{{ item.count  }}</span>
                  </template>
                <template v-slot:item.action="{ item }">
                    <a :href="'/delivery/' + item?.date?.split('T')[0]" @click.prevent="showGroup(item.date?.split('T')[0])"><i class="icon icon_arrow_r"></i></a>
                </template>
                </v-data-table>
              </template>
          </div>
    </div>
  </div>
</template>

<script>
export default {
  components: { },
  data() {
    return {
      filter: {
        status: 1,
        pvz: ''
      },
      tItemsIm:[],
      tHeadersIm:[],
      tHeadersForMe:[],
      tItemsForMe:[],
      pvz_opt: [],
      userId: '',
    }
  },
  computed: {
    tItemsImFiltered : function() {
        if ( this.filter.pvz ) {
          return this.tItemsIm.filter( x => (x.pvz == this.filter.pvz) )
        }
        return this.tItemsIm
    },
  },

  watch: {



  },
  methods: {

    showGroup: function( group ) {
      this.$router.push('/delivery/' + group)
    },

    listIm: function( type ) {
        this.tItemsIm = []
        this.$store.dispatch('request/delivery_list', {userId: this.userId}).then((x) => {
            console.log(x);
            if ( !x.data.data.error ) {
              if (this.tHeadersIm.length == 0 && x.data.data.headers.length > 0) {
                  this.tHeadersIm = x.data.data.headers
              }

              if (x.data.data.products.length > 0) {
                  for (var i = x.data.data.products.length - 1; i >= 0; i--) {
                      this.tItemsIm.push(x.data.data.products[i])
                  }
              }


              if ( x.data.error ) {
                  this.$toast.warning(x.data.msg);
              }

            } else {
                this.$toast.error(x.data.error)
            }
        })
    },
    listForMe: function( type ) {
        this.tItemsForMe = []
        this.$store.dispatch('request/delivery_list', {userId: this.userId}).then((x) => {
          console.log(x)
            if ( !x.data.error ) {
              if (this.tHeadersForMe.length == 0 && x.data.data.headers.length > 0) {
                  this.tHeadersForMe = x.data.data.headers
              }

              if (x.data.data.products.length > 0) {
                  for (var i = x.data.data.products.length - 1; i >= 0; i--) {
                      this.tItemsForMe.push(x.data.data.products[i])
                  }
              }




            } else {
                this.$toast.error(x.data.error)
            }
        })
    },

  },
  mounted() {
    //this.listIm()
    this.userId = +window.localStorage.getItem('id');
    this.listForMe()

  }
}
</script>

<style>
  @media only screen and (max-width : 600px) {
    .v-data-table__mobile-table-row{
      display: flex;
    }

  }

</style>
