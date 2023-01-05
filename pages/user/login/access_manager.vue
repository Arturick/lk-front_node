<template>
  <main class="main">
    <div class="rec_authorize">
      <div class="ma_title">Подтвердите доступ юзера</div>
      <div class="rec_title">
        Для Регистрации, заполните<br> пожалуйста данные
      </div>
      <div v-if="step == 1">
        <div class="reg_block">
          <div class="slf">
            <input type="text" class="bg-white p-4 text-black rounded text-lg w-full text-center md:text-left" placeholder="Введите Логин" v-model="login">
          </div>
          <div class="slf">
            <input type="password"  class="bg-white p-4 text-black rounded text-lg w-full text-center md:text-left" placeholder="Введите Пароль" v-model="password">
          </div>
          <button type="button" class="reg_btn" @click="loginUser" style="color: black">Войти</button>
        </div>
      </div>
      <div v-else>
        <div class="back_word">
          <div class="back_word_el">ФИО</div>
          <div class="back_word_el">Номер</div>
          <div class="back_word_el">Право Доступа</div>
        </div>
        <div class="back_gnd">
          <input type="text" class="input_mng" v-model="managerInfo.name">
          <input type="text" class="input_mng" v-model="managerInfo.userLogin">
          <Select class="input_mng" style="color: black; font-weight: bold" :items="managerList" label="Права: " v-model="manager"/>
        </div>
        <div class="btns">
        <button type="button" class="reg_btn" @click="addManager(true)" style="color: black">Подтвердить</button>
        <button type="button" class="reg_btn" @click="addManager(false)" style="color: #000000;background: #c65450">Отказать</button>
        </div>
        </div>
    </div>
    <img class="img_down" src="../../../assets/images/RATE THIS.svg" alt="">
  </main>

</template>
<script>
  import { mapState } from "vuex";
  export default {
    layout: 'login',
    data() {
      return {
        step: 1,
        managerList: [ {"value":"1", "name":"Только Чтение"},
          {"value":"2", "name":"Ограниченый доступ"},
          {"value":"3", "name":"Полный доступ"},
          {"value":"4", "name":"Владелец"},],
        manager: '',
        managerInfo: {},
        login: '',
        password: '',
        code: this.$route.query.code,

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
      setTimer() {
        this.timer = this.timeIsOut - Date.now()
        window.console.log(this.timer)
        if ( this.timer > 0 ) {
          clearInterval(this.timeInterval)
          this.timeInterval = setInterval( () => {
            this.timer = this.timer - 1
            if ( this.timer < 0 ) {
              clearInterval(this.timeInterval)
              this.sendCodeDisabled = false
            }
          }, 1000)
        }
      },

      getManagerLink(){
        this.$store.dispatch('request/getManagerLink', {code: this.code}).then((x) => {
          console.log(x);
          if(x.data.length < 1){
            this.$toast.error('Не верная ссылка попробуйте еще раз')
            return;
          }
          this.managerInfo = x.data[0];
        });
      },

      loginUser(){//getManagerLink
        this.$store.dispatch('request/login_user', {login: this.login, password: this.password}).then((x) => {
          console.log(x);
          this.login = '';
          this.password = '';
          if ( !x.data.error ) {
            console.log(this.managerInfo  );
            if(this.managerInfo.userId != x.data.id){
              this.$toast.error('Не верные данные')
              return;
            }
            this.managerInfo['task1'] = x.data.task1;
            this.step = 2
          } else {
            this.$toast.error(x.data.error)
          }
        })
      },

      addManager(access){
        this.$store.dispatch('request/add_manager', {phone: this.managerInfo.userLogin.replace('+', ''), access: access, name: this.managerInfo.name, surname: this.managerInfo.surname, role: this.manager, userId: this.managerInfo.userId, task1: this.managerInfo['task1']}).then((x) => {
          this.$router.push('')
        })

      }
    },
    mounted() {
      let timeIsOut = window.localStorage.getItem("timeIsOut")
      if (!timeIsOut) timeIsOut = 0
      this.$store.dispatch('request/set_timeisout', timeIsOut)
      this.getManagerLink();
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
  input{
    color: black;
  }

  .back_gnd{
    display: flex;
    width: 1100px;
    height: 80px;
    background: white;
    margin: 10px auto;
    border-radius: 20px;
  }
  .input_mng{
    margin-top: 25px;
    margin-left: 50px;
    width: 300px;
    position: relative;
    z-index: 2;
    font-size: 20px;
    font-weight: bold;
  }
  .back_word{
    display: flex;
    width: 1000px;
    margin: 0px auto;
    margin-top: 70px;
    border-radius: 20px;
  }

  .back_word_el{
    width: 100%;
    margin: 0 auto;
    padding: 5px;
    font-size: 20px;
    font-weight: bold;
  }


  .btns{
    display: flex;
    width: 500px;
    margin: 100px auto;
  }

  .reg_btn{

    padding: 20px;
    width: 250px;
    margin-left: 10px;
  }
</style>
