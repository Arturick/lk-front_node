<template>
  <main class="main">
    <div class="rec_authorize">
      <div class="ma_title">Восстановление пароля</div>
      <div class="rec_title">
        Для восстановления пароля, заполните<br> пожалуйста данные
      </div>
      <div class="rec_inputs">
        <div class="reg_input reg_input_a">
          <input type="text" placeholder="Имя">
        </div>
        <div class="reg_input reg_input_a">
          <input type="text" placeholder="Фамилия">
        </div>
        <div class="reg_input reg_input_a">
          <input type="text" placeholder="Номер телефона">
        </div>
      </div>
      <div class="reg_input reg_input_a inp_tel">
        <input type="text" placeholder="Номер договора">
      </div>
      <div class="btn_container_r">
        <div class="reg_btn">Далее</div>
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
        timer: 0
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
        if(this.phone.length < 4){
          this.$toast.error('Не заполнен телефон');
          return
        }
        this.$store.dispatch('request/sms_send', {phone: this.phone.replace('+', '').replace('(', '').replace(')', '').replace('-', '').replace(' ', ''), reg: this.isReg}).then((x) => {
          if ( !x.data.error ) {
            this.step = 2;
            this.sendCodeDisabled = true;
            let timeIsOut = Date.now() + 60;
            this.$store.dispatch('request/set_timeisout', timeIsOut)
            window.localStorage.setItem("timeIsOut", timeIsOut)
            if(this.isReg){
              console.log('');
              this.$toast.success('Аккаунт успешно создан');
            }
          } else {
            this.$toast.error(x.data.error)
          }
        })
      },
      checkCode() {
        this.loadAuth = true;
        this.$store.dispatch('request/sms_check', {action: 'check', phone: this.phone.replace('+', '').replace('(', '').replace(')', '').replace('-', '').replace(' ', ''), code: this.code}).then((x) => {
          console.log(x);
          if ( !x.data.error ) {
            this.step = 2
            if (x.data.accessToken) {
              let id = x.data.id;
              window.localStorage.setItem('id', id);
              this.$auth.setUserToken('Bearer ' + x.data.accessToken)
              this.$store.dispatch('request/auth_user').then((resp) => {
                this.$router.push('')
                this.loadAuth = false;
              })
            }
          } else {
            this.loadAuth = false;
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
</style>
