<template>
  <main class="main">
    <div v-if="type==1" class="main_authorize">
      <div class="ma_title">Авторизоваться</div>

      <div  @click="type=2" class="ma_btns">
        <NuxtLink   to="" class="login_pass_btn" style="font-size: 28px;">Войти по паролю</NuxtLink>
      </div>
      <div class="reg_title">Регистрация</div>
      <div class="reg_block">
        <div class="reg_input">
          <input  v-if="step!=2" type="text" v-model="phone"  placeholder="Введите ваш телефон">
          <input  v-if="step==2" type="text" v-model="code"   placeholder="Введите код в СМС">
        </div>
        <div v-if="step!=2" class="reg_btn" @click="sendCode">Далее</div>
        <div v-if="step==2" class="reg_btn" @click="checkCode">Далее</div>
      </div>
      <div class="reg_count">Отправить ещё раз через: 01:59 </div>
    </div>
    <div v-else class="main_authorize">
      <div class="ma_title">Авторизоваться</div>
      <div  @click="type=1" class="ma_btns">
        <NuxtLink   to="" class="login_pass_btn" style="font-size: 28px;">Войти по Телефону</NuxtLink>
      </div>
      <div class="reg_title">Регистрация</div>
      <div class="reg_block">
        <div class="reg_input reg_input_a">
          <input type="text" v-model="login" placeholder="Введите ваш логин">
        </div>
        <div class="reg_input reg_input_a">
          <input type="text"  v-model="password" placeholder="Введите ваш пароль">
        </div>
        <button type="button" class="reg_btn" @click="loginUser" style="color: black">Войти</button>
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
        login: '',
        password: '',
        type: 1,
        code: '',
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
        this.$store.dispatch('request/sms_send', {phone: this.phone}).then((x) => {
          if ( !x.data.error ) {
            this.step = 2;
            this.sendCodeDisabled = true
            let timeIsOut = Date.now() + 60
            this.$store.dispatch('request/set_timeisout', timeIsOut)
            window.localStorage.setItem("timeIsOut", timeIsOut)
          } else {
            this.$toast.error(x.data.error)
          }
        })
      },
      checkCode() {
        this.$store.dispatch('request/sms_check', {action: 'check', phone: this.phone, code: this.code}).then((x) => {
          console.log(x);
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
<style>
  .login_pass_btn{
    font-size: 28px;
  }
</style>
