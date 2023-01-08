<template>
  <main class="main">
    <div  class="ma_title">Добро Пожалговать!<br>Вас приветствует Компания RATE-THIS</div>
    <div class="rec_title" style="text-align: center; margin: 30px auto; width: 100%">
      С целью безопасности, мы заблокировали данный логин, наш менеджер с вами свяжется для индитефикации вашей личности, в близжайшее время. Извиняемся что доставили вам не удобства.
    </div>
  </main>
</template>
<script>
  import { mapState } from "vuex";
  export default {
    layout: 'login',
    data() {
      return {
      }
    },
    computed: {
      ...mapState('request', [
        'timeIsOut'
      ]),
    },
    watch: {
      user: function(val) {
      },
      code: function(val) {
        if ( val.length == 5 ) {
          this.checkCode(val)
        }
      },
      timeIsOut: function(val){
        window.console.log(val)
        if ( val > 0 ) {
          this.setTimer()
        }
      }
    },
    methods: {

    },
    mounted() {
    }
  }
</script>
<style scoped>
  input:active, :focus {
    outline: 0;
    outline-offset: 0;
    border: none;
    box-shadow: none;
  }
  .login_pass_btn{
    font-size: 28px;
  }
  .slf{
    margin: 0 15px;
  }
  .v-application .mt-5 {
    margin-top: -24px !important;
  }

  .reg_btn:hover{
    cursor: pointer;
  }
  .againSend{
    color: #92E6D6;
    transition: 0.3s;
  }

  .againSend:hover{
    border-bottom: 1px solid #92E6D6;
  }
  .slfInpt{
    width: 300px;
  }


  .auth_link{
    color: white;
    transition: 0.3s;
  }

  .auth_link:hover{
    border-bottom: 1px solid #92E6D6;
  }
  .select_back{
    width: 500px;
    background: white;
    height: 62px;
    border-radius: 15px;
  }
  .self_mt{
    width: 300px;
    margin-left: 100px;
    font-weight: bold;
    font-size: 30px;
    color: black;
  }
</style>
