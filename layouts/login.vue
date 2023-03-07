<template>
  <v-app >

    <div class="rate-app2">
      <burger_login
        v-if="isVisible"
        @close_burger="close_login_burger"
      />
      <div class="bacc">
        <div class="heder">
          <div class="h_container">
            <div class="h_inner">
              <div class="f_bl_h" @click="showBurger">
                <img src="../assets/images/h_more.svg" alt="">
              </div>
              <div class="nav">
                <div class="nav_el"><a class="nav_el" target="_blank" href="https://rate-this.ru/#kejs">кейс</a></div>
                <div class="nav_el"><a class="nav_el" target="_blank" href="https://rate-this.ru/#kak-eto-rabotaet">как это работает</a></div>
                <div class="nav_el"><a class="nav_el" target="_blank" href="https://rate-this.ru/#ceny">цены</a></div>
                <div class="nav_el"><a class="nav_el" target="_blank" href="https://rate-this.ru/#kontakty">контакты</a></div>
                <div class="nav_el"><a class="nav_el" target="_blank" href="">блог</a></div>
                <div class="nav_el"><a class="nav_el" target="_blank" href="">faq</a></div>
              </div>
              <div class="s_bl_h">
                <img src="../assets/images/h_phone.svg" alt="">
              </div>
              <a class="h_tel" href="tel:89959002196">8 995 900 21 96</a>
            </div>
          </div>
        </div>
      </div>
      <Nuxt class="relative z-10"/>
    </div>
  </v-app>
</template>
<script>

  import burger_login from '../components/burger_login.vue'

  export default{
    name: "f_bl_h",
    components:{
      burger_login
    },
    props: {},
    data() {
      return{
        isVisible: false
      }
    },
    computed: {},
    methods: {
      showBurger(){
        this.isVisible = true;
      },
      close_login_burger(){
        this.isVisible = false;
      }
    }
  }
</script>

<style scoped>
  a{
    color: white;
  }
  .nav_el{
    color: white;
    font-size: 20px;
  }
</style>
