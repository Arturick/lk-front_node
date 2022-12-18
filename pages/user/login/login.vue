<template>
  <main class="main">

    <div v-if="loadAuth==false">
      <div v-if="type==1" class="main_authorize">

        <div v-if="isReg == false" class="ma_title">Авторизоваться</div>
      <div  @click="type=2" class="ma_btns">
        <NuxtLink   to="" class="login_pass_btn" style="font-size: 28px;">Войти по паролю</NuxtLink>
      </div>
        <div  @click="isReg=!isReg" class="ma_btns">
          <NuxtLink  v-if="isReg == false"  to="./register" class="login_pass_btn" style="font-size: 28px;">Регистрация</NuxtLink>
        </div>
        <div class="reg_block">
        <div>
          <template v-if="step == 2">
            <div class="flex gap-4 mt-5 justify-center">
              <div v-if="timer > 0">
                Не приходит смс. Повторная отправка через {{timer}} сек
              </div>
              <div v-if="timer <= 0">
                <span class="againSend" @click="sendCode">Отправить</span>
              </div>
            </div>
          </template>
          <input type="text" v-if="step!=2" class="bg-white p-4 text-black rounded text-lg w-full text-center md:text-left" placeholder="Введите телефон" v-mask="'+7 (###) ###-##-##'" v-model="phone"   style="width: 400px;" inputmode="numeric">
          <input type="text" v-if="step==2" class="bg-white p-4 text-black rounded text-lg w-full text-center md:text-left" placeholder="Введите код" v-mask="'####'" v-model="code"  inputmode="numeric" style="width: 400px;">
        </div>
        <div v-if="step!=2" class="reg_btn" @click="sendCode">Далее</div>
        <div v-if="step==2" class="reg_btn" @click="checkCode">Далее</div>
        </div>


        </div>
      <div v-else class="main_authorize">
      <div class="ma_title">Авторизоваться</div>
      <div  @click="type=1" class="ma_btns">
        <NuxtLink   to="" class="login_pass_btn" style="font-size: 28px;">Войти по Телефону</NuxtLink>
      </div>
        <div  @click="type=1, isReg=true" class="ma_btns">
          <NuxtLink   to="" class="login_pass_btn" style="font-size: 28px;">Регистрация</NuxtLink>
        </div>
      <div class="reg_block">
        <div class="slf">
          <input type="text" class="bg-white p-4 text-black rounded text-lg w-full text-center md:text-left" placeholder="Введите Логин" v-model="login">
        </div>
        <div class="slf">
          <input type="text"  class="bg-white p-4 text-black rounded text-lg w-full text-center md:text-left" placeholder="Введите Пароль" v-model="password">
        </div>
        <button type="button" class="reg_btn" @click="loginUser" style="color: black">Войти</button>
      </div>
    </div>
      <img class="img_down" src="../../../assets/images/RATE THIS.svg" alt="">
    </div>
    <div v-else style="margin: 200px auto; width: 150px">
      <v-progress-circular
        :size="150"
        color="#93e4d5"
        indeterminate
      ></v-progress-circular>
    </div>
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
<style>
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
</style>
