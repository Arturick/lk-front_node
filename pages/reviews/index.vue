<template>
  <div class="md:container md:mx-auto">
    <div class="bg-white rounded-3xl mt-2.5 mx-2.5 p-2.5 md:p-7">
        <div class="md:grid md:grid-cols-2">
          <div class="">
              <div class="content-title">Отзывы ожидающие публикации</div>
          </div>
        </div>
          <div class="mt-12 md:w-3/5">
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

                  <template v-slot:item.action="{ item }">
                      <a :href="'/reviews/' + item.art" @click.prevent="showGroup( item.art )"><i class="icon icon_arrow_r"></i></a>
                  </template>
                  <template v-slot:item.status="{ item }">
                    <span :class="'status-' + item.status.split('|')[1]">{{item.status.split('|')[0]}}</span>
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
      tItems:[],
      tHeaders:[],
      tHeadersOther:[],
      tItemsOther:[],
      userId: 0,
    }
  },
  computed: {

  },

  watch: {



  },
  methods: {

    showGroup: function( group ) {
      this.$router.push('/reviews/' + group)
    },

    list: function( type ) {
        this.tItems = []
        this.$store.dispatch('request/reviews_list', {userId: this.userId}).then((x) => {
          console.log(x)
            if ( !x.data.error ) {
              if (this.tHeaders.length == 0 && x.data.data.headers.length > 0) {
                  this.tHeaders = x.data.data.headers
              }

              if (x.data.data.products.length > 0) {
                  for (var i = x.data.data.products.length - 1; i >= 0; i--) {
                      this.tItems.push(x.data.data.products[i])
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
    listOther: function( type ) {
        this.tItemsOther = []
        let statuses = {
            '4': 'Получен|succses',
            '5': 'Опубликовать|plan',
            '6': 'Модерация|process',
            '7': 'Опубликован|succses',
            '8': 'Удалён|dunger',
        }

        this.$store.dispatch('request/reviews_list', {userId: this.userId}).then((x) => {
            if ( !x.data.error ) {
              if (this.tHeadersOther.length == 0 && x.data.headers.length > 0) {
                  this.tHeadersOther = x.data.headers
              }

              if (x.data.items.length > 0) {
                  for (var i = x.data.items.length - 1; i >= 0; i--) {
                      x.data.items[i]['status'] = statuses[x.data.items[i]['status']]
                      this.tItemsOther.push(x.data.items[i])
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

  },
  mounted() {
    this.userId = +window.localStorage.getItem('id');
    this.list()

    //this.listOther()
  }
}
</script>
