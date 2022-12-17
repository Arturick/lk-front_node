<template>
  <main class="main">
    <div class="main_authorize">
      <div class="ma_title">Авторизоваться</div>
      <div class="ma_btns">
        <NuxtLink  to="login" class="login_pass_btn" style="font-size: 28px;">Войти по телефону</NuxtLink>
      </div>
      <div class="reg_title">Регистрация</div>
      <div class="reg_block">
        <div class="reg_input reg_input_a">
          <input type="text" v-model="ln" placeholder="Введите ваш логин">
        </div>
        <div class="reg_input reg_input_a">
          <input type="text" v-model="password" placeholder="Введите ваш пароль">
        </div>
        <button type="button" class="reg_btn" @click="login">Далее</button>
      </div>
      <NuxtLink class="rePass" to=''>Забыли пароль</NuxtLink>
    </div>
    <img class="img_down" src="../../assets/images/RATE THIS.svg" alt="">
  </main>
</template>
<script>
  import { mapState } from "vuex";
  import Button from "../../components/Button";
  export default {
    components: {Button},
    layout: 'login',
    data() {
      return {
        user: {},
        mode: '',
        phone: '',
        step: 1,
        code: '',
        ln: '',
        password: '',
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
      login: () => {
        console.log('x');
        this.$store.dispatch('request/login_user', {login: this.ln, password: this.password}).then((x) => {
          console.log(x);
          if ( !x.data.error ) {
            this.step = 2
            if (x.data.data.access_token) {
              this.$auth.setUserToken('Bearer ' + x.data.data.access_token)
            }
          } else {
            //this.$toast.error(x.data.error)
          }
        })
      },
    },
    mounted() {
    }
  }
</script>
<style>
  .login_pass_btn{
    font-size: 28px;
  }
</style>
