<template>
  <main class="main">

    <div v-if="loadAuth==false">
      <div v-if="type==1" class="main_authorize">

        <div v-if="isReg == false && step < 3" class="ma_title">Авторизоваться</div>
        <div v-else class="ma_title">Добро Пожалговать!<br>Вас приветствует Компания RATE-THIS</div>
         <div   v-if="step < 3" class="ma_btns">
          <div @click="type=2">
            <NuxtLink   to="" class="login_pass_btn" style="font-size: 28px;">Войти по паролю</NuxtLink>

          </div>
        <div @click="onTelegramAuth">
          <NuxtLink   to="" class="login_tg_btn" style="font-size: 28px; color: white"><img src="../../../assets/images/telegram_img.png" alt="">Telegram</NuxtLink>

        </div>
        </div>
        <div v-else>
          <div class="rec_title" style="text-align: center; margin: 30px auto; width: 100%">
            Мы заметили что у вас доступ в несколько личных кабинетов, выберите в какой вы хотите зайти
          </div>
        </div>
        <div  class="ma_btns">
          <NuxtLink  v-if="isReg == false && step < 3"  to="./register" class="auth_link" style="font-size: 28px;">Регистрация</NuxtLink>
        </div>
        <div class="reg_block">
        <div>

          <input type="text" v-if="step<3" class="bg-white p-4 text-black rounded text-lg w-full text-center md:text-left" placeholder="Введите телефон" v-mask="'+# (###) ###-##-################'" v-model="phone"   style="width: 400px;" inputmode="numeric">
          <div v-if="step==3" class="select_back">
            <div class="md:mt-0 mt-2.5 self_mt" style="">
              <Select :items="managerList" label="Client Id: " v-model="manager"/>
            </div>

          </div>
        </div>
        <div v-if="step==1" class="reg_btn" @click="sendCode">Далее</div>
          <input type="text" v-if="step==2" @input="checkCode" class="bg-white p-4 text-black rounded text-lg w-full text-center md:text-left" placeholder="Введите код" v-mask="'####'" v-model="code"  inputmode="numeric" style="width: 200px; margin-left: 5px">
          <div v-if="step==3" class="reg_btn" @click="authManager">Далее</div>
        </div>
        <template v-if="step == 2" style="display: flex">
          <div class="flex gap-4 mt-5 justify-center" style="width: 500px; margin: 0 auto">
            <div v-if="timer > 0" style="margin-top: 34px">
              Не приходит смс. Повторная отправка через {{timer}} сек
            </div>
            <div v-if="timer <= 0" style="margin-top: 34px">
              <span class="againSend" @click="sendCode">Отправить</span>
            </div>
          </div>
        </template>

        </div>
      <div v-else class="main_authorize">
      <div class="ma_title">Авторизоваться</div>
      <div  @click="type=1" class="ma_btns">
        <NuxtLink   to="" class="login_pass_btn" style="font-size: 28px;">Войти по Телефону</NuxtLink>
        <div @click="onTelegramAuth">
          <NuxtLink   to="" class="login_tg_btn" style="font-size: 28px; color: white"><img src="../../../assets/images/telegram_img.png" alt="">Telegram</NuxtLink>

        </div>
      </div>
        <div  class="ma_btns">
          <NuxtLink  v-if="isReg == false && step < 3"  to="./register" class="auth_link" style="font-size: 28px;">Регистрация</NuxtLink>
        </div>
      <div class="reg_block">
        <div class="slf">
          <input type="text" class="bg-white p-4 text-black rounded text-lg w-full text-center md:text-left" :class="[isErrorInput ? 'back_input' : '']" @input="isErrorInput=false" @click="isErrorInput=false" placeholder="Введите Логин" v-model="login" style="width: 334px">
        </div>
        <div class="slf">
          <input type="password"  class="bg-white p-4 text-black rounded text-lg w-full text-center md:text-left" :class="[isErrorInput ? 'back_input' : '']" @input="isErrorInput=false" @click="isErrorInput=false" placeholder="Введите Пароль" style="width: 300px" v-model="password">
        </div>
        <button type="button" class="reg_btn" @click="loginUser" style="color: black">Войти</button>
      </div>
        <div style="width: 65%;margin: 20px auto; font-size: 24px; color: #31B6EC">
          <NuxtLink  v-if="isReg == false"  to="./refresh-password" class="auth_link" style=" font-size: 24px; color: #31B6EC">Забыл пароль</NuxtLink>
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
        isErrorInput: false,
        code: '',
        isReg: false,
        sendCodeDisabled: false,
        timeInterval: false,
        timer: 0,
        managerList: [],
        manager: {},
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
      onTelegramAuth () {
        this.$toast.info('Данная функция находится в разработке и пока не находится в продакшене')
      },
      sendCode() {
        if(this.phone.length < 4){
          this.$toast.error('Не заполнен телефон');
          return
        }
        this.$store.dispatch('request/sms_send', {phone: this.phone.replaceAll(' ', '').replaceAll('(', '').replaceAll(')', '').replaceAll('-', '').replaceAll('+', ''), reg: this.isReg}).then((x) => {
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
            if(x.data.error = 'Слишком много попыток входа\n Попробуйте еще раз через время'){
              this.$router.push('/user/login/spam')
            }
            this.$toast.error(x.data.error)
          }
        })
      },
      checkCode() {
        if(this.code.length < 4){
          return;
        }
        this.$store.dispatch('request/sms_check', {action: 'check', phone: this.phone.replaceAll(' ', '').replaceAll('(', '').replaceAll(')', '').replaceAll('-', '').replaceAll('+', ''), code: this.code}).then((x) => {
          console.log(x);
          if ( !x.data.error ) {

            if (x.data.accessToken) {
              if(x.data.userId.length < 2){
                this.loadAuth = true;
                let id = x.data.userId[0]['id'];
                window.localStorage.setItem('id', id);
                this.$auth.setUserToken('Bearer ' + x.data.accessToken)
                this.$store.dispatch('request/auth_user').then((resp) => {
                  this.$router.push('')
                  this.loadAuth = false;
                })
              } else {
                for(let i of x.data.userId){
                  this.managerList.push({});
                  this.managerList[this.managerList.length - 1]['value'] = i;
                  this.managerList[this.managerList.length - 1]['name'] = i['task1'];
                }
                console.log(this.managerList);
                this.step = 3;
              }

            }
          } else {
            this.loadAuth = false;
            this.$toast.error('Не верный код');
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
              this.$router.push('/');
            }
          } else {
            this.isErrorInput = true;
            if(x.data.error == 'wrong password'){
              this.$toast.error(`Не верный логин или ключ авторизации\n Попытак осталось  ${3 - (+x.data.count)}`);
            } else {
              this.$router.push('/user/login/password-spam');
              this.$toast.error('Вы исчерпали лимит попыток входа по паролю, в ближайшее время наш менеджер свяжется с вами и поможе трешить проблему');
            }

          }
        })
      },
      authManager(){
        this.loadAuth = true;
        this.$store.dispatch('request/login_user', {login: this.manager.login, password: this.manager.password}).then((x) => {

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
                this.$router.push('/');
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
  .back_input{
    background: #F2A7A7;
  }
</style>
