<template>
  <div class="md:container md:mx-auto">
      <div class="bg-white rounded-3xl mt-2.5 mx-2.5 p-2.5 md:p-7">
          <div class="flex gap-2.5 items-center flex-col md:flex-row justify-between">
              <div class="">
                  <div class="content-title">Новая заявка на выкупы WILDBERRIES</div>
                  <div class="content-desc mt-3.5">Создайте новую группу выкупов. Введите артикулы товаров и заполните необходимые данные.</div>
              </div>
              <div class="mt-2.5 md:mt-0 w-full md:w-44">
                  <NuxtLink to="/buyout/plan" class="rounded-lg p-2.5 but-1 w-full block">Добавить</NuxtLink>
              </div>
          </div>
      </div>

      <div class="bg-white rounded-3xl mt-2.5 mx-2.5 p-2.5 md:p-7">
          <div class="md:flex md:items-center md:justify-between">
              <div class="content-title">Автоматический рассчет выхода в топ WILDBERRIES</div>
              <div class="w-full md:w-44">
                <Button class="rounded-lg p-2.5 but-0 w-full">Скоро</Button>
              </div>
          </div>
      </div>

      <div class="bg-white rounded-3xl mt-2.5 mx-2.5 p-2.5 md:p-7">
          <div class="md:flex md:items-center md:justify-between">
              <div class="content-title">Выкупы WILDBERRIES</div>
            <div class="md:mt-0 mt-2.5">
              <Select :items="modelOptions" label="Модель работы: " v-model="model"/>
            </div>
          </div>
        <div class="mt-2.5 md:w-3/5">
          <div v-if="model == 'm1'">
            <template v-if="tItems.length == 0" >
            <div class="result-empty" style="margin-top: 24px">ЗДЕСЬ ПОКА НИЧЕГО</div>
          </template>
            <template v-else>
            <v-data-table
            :headers="tHeaders"
            :items="tItems"
            class="postable"
            :item-class= "rowClasses"
          >
            <template v-slot:item.status="{ item }">
              <span :class="'status-' + item.status.split('|')[1]">{{item.status.split('|')[0]}}</span>
            </template>
              <template v-slot:item.date="{ item }">
                <span >{{item.date}}</span>
              </template>
            <template v-slot:item.actions="{ item }">
              <div v-if="item.status == 'Черновик|plan'">
                <a :href="'/buyout/plan/' + item.group + '?draft=true'" @click.prevent="showGroup( item.group, true )"><i class="icon icon_arrow_r"></i></a>
              </div>
              <div v-else>
                <a :href="'/buyout/plan/' + item.group" @click.prevent="showGroup( item.group )"><i class="icon icon_arrow_r"></i></a>
              </div>
            </template>
          </v-data-table>
          </template>
          </div>
          <div v-else>
            <div class="result-empty" style="margin-top: 24px">ЗДЕСЬ ПОКА НИЧЕГО</div>
          </div>
        </div>
      </div>

  </div>
</template>

<script>
export default {
  components: { },
  data() {
    return {
      modelOptions: [
        {"value":"m1", "name":"Под ключ"},
        {"value":"m2", "name":"Самостоятельно"}
      ],
      model: "m1",
      tItems:[],
      tHeaders:[],
      userId: '',

    }
  },
  computed: {

  },

  watch: {
    model: function(val) {
      this.list()
    },
  },
  methods: {
    rowClasses(item) {
        if (item.class) {
          return item.class;
        }
    },
    showGroup: function( group, isDraft = false ) {
      this.$router.push('/buyout/plan/' + group + '?draft=' + isDraft)
    },

    list: function( type ) {

        this.tItems = []

        this.$store.dispatch('request/buyout_list', {userId: this.userId, sort: 3, group: false}).then((x) => {
          console.log(x.data.data);
          if ( !x.data.error ) {

                  this.tHeaders = x.data.data.headers



          for (let i of x.data.data.products) {
              this.tItems.push(i);
          }


              window.console.log(this.tHeaders)

              if ( x.data.error ) {
                  this.$toast.warning(x.data.msg);
              }

            } else {
                this.$toast.error(x.data.error)
            }
        })

        this.$store.dispatch('request/draft_list', {userId: this.userId, group: false}).then((x) => {
        console.log(x.data.data);
        if ( !x.data.error ) {
          for (let i of x.data.data.products) {
            this.tItems.push(i);
          }


          window.console.log(this.tHeaders)

          if ( x.data.error ) {
            this.$toast.warning(x.data.msg);
          }

        } else {
          this.$toast.error(x.data.error)
        }
      })

    }

  },
  mounted() {
    this.userId = +window.localStorage.getItem('id');
    this.list()
  }
}
</script>
