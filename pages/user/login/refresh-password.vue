<template>
  <main class="main">
    <div class="rec_authorize">
      <div class="ma_title">Восстановление пароля</div>
      <div class="rec_title">
        Для восстановления пароля, заполните<br> пожалуйста данные
      </div>
      <div>
        <div class="rec_inputs">
          <div class="reg_input reg_input_a">
            <input v-model="userData.name" type="text" placeholder="Имя">
          </div>
          <div class="reg_input reg_input_a">
            <input v-model="userData.surname" type="text" placeholder="Фамилия">
          </div>
          <div class="reg_input reg_input_a">
            <input v-model="userData.phone" type="text" placeholder="Номер телефона">
          </div>
        </div>
        <div class="reg_input reg_input_a inp_tel">
          <input v-model="userData.task1" type="text" placeholder="Номер договора">
        </div>
      </div>
      <div class="btn_container_r">

      <div v-if="isReg" class="reg_input reg_input_a inp_tel" style="margin-right: 55px">
        <input v-model="code" type="text" placeholder="Код из СМС">
      </div>

      <div v-if="!isReg">
        <div class="reg_btn" @click="sendCode" style="cursor: pointer">Далее</div>
      </div>
      <div v-else>
        <div class="reg_btn" @click="checkCode" style="cursor: pointer">Далее</div>
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
        user: {},
        mode: '',
        phone: '',
        step: 1,
        loadAuth: false,
        login: '',
        password: '',
        type: 1,
        code: '',
        isReg: false,
        sendCodeDisabled: false,
        timeInterval: false,
        timer: 0,
        userData: {
          name: '',
          username: '',
          phone: '',
          task1: ''
        },
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
      onTelegramAuth (user) {
        window.console.log(user)
      },
      sendCode() {
        if(this.userData.phone.length < 4){
          this.$toast.error('Не заполнен телефон');
          return
        }
        let phone = this.userData.phone.replaceAll(',', '').replaceAll('+', '').replaceAll('(', '').replaceAll(')', '').replaceAll(' ', '').replaceAll('-', '');
        this.$store.dispatch('request/sendResetCode', {phone: phone, name: this.userData.name, surname: this.userData.surname, task1: +this.userData.task1}).then((x) => {
          if ( !x.data.error ) {
            this.isReg = true;
            this.sendCodeDisabled = true;
            let timeIsOut = Date.now() + 60;
            this.$store.dispatch('request/set_timeisout', timeIsOut)
            window.localStorage.setItem("timeIsOut", timeIsOut)
          } else {
            if(x.data.error == 'Слишком много попыток входа\n Попробуйте еще раз через время'){
              this.$router.push('/user/login/spam')
            }
            this.$toast.error(x.data.error);
          }
        })
      },
      checkCode() {
        this.loadAuth = true;
        let phone = this.userData.phone.replaceAll(',', '').replaceAll('+', '').replaceAll('(', '').replaceAll(')', '').replaceAll(' ', '').replaceAll('-', '');
        this.$store.dispatch('request/refreshPassword', {phone: phone, code: this.code, task1: -1}).then((x) => {
          console.log(x);

          if ( !x.data.error ) {
            this.$router.push('/user/login/login');
          } else {
            console.log(x);
            this.$toast.error(x.data.error)
          }
        })
      },
      loginUser(){
        this.$store.dispatch('request/login_user', {login: this.login, password: this.password}).then((x) => {
          console.log(x);
          this.login = '';
          this.password = '';
          if ( !x.data.error ) {
            this.step = 2
            if (x.data.accessToken) {
              let id = x.data.id;
              window.localStorage.setItem('id', id);
              this.$auth.setUserToken('Bearer ' + x.data.accessToken)
              this.$store.dispatch('request/auth_user').then((resp) => {
                this.$router.push('')
              })
            }
          } else {
            this.$toast.error(x.data.error)
          }
        })
      }
    },
    mounted() {
      let timeIsOut = window.localStorage.getItem("timeIsOut")
      if (!timeIsOut) timeIsOut = 0
      this.$store.dispatch('request/set_timeisout', timeIsOut)
    }
  }
</script>
<style scoped>
  .reg_input_a{
    color: black;
  }
  .reg_input_a:active,  :focus {
    outline: 0;
    outline-offset: 0;
    border: none;
    box-shadow: none;
  }
  button{
    cursor: pointer;
  }
</style>
