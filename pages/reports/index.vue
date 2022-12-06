<template>
  <section class="content">
    <div class="wrap content__wrap">
      <div class="content__group content__group_1">
        <div class="reports content-box">
          <div class="reports__group reports__group_0">
            <div class="content-action">
              <ul class="breadcrumbs">
                <li class="breadcrumbs__item">
                  <a href="/" class="but but_3">Назад</a>
                </li>
                <li class="breadcrumbs__item">
                  <a href="/" class="breadcrumbs__link">Главная</a>
                </li>
                <li class="breadcrumbs__item">
                  Отчёты
                </li>
              </ul>
            </div>
          </div>
          <div class="reports__group reports__group_1">
            <ul class="reports__items reports__items_content">
              <li class="report-box report-box_content report-box_color_1">
                <a href="/reports/buyout" class="report-box__link">Отчет о выкупленных товарах &gt;</a>
                <span class="report-box__desc">ВЫКУПЫ</span>
              </li>
              <li class="report-box report-box_content report-box_color_2">
                <a href="/reports/comment" class="report-box__link">Отчет о забраных товарах &gt;</a>
                <span class="report-box__desc">ОТЗЫВЫ</span>
              </li>
              <li class="report-box report-box_content report-box_color_3">
                <a href="/" class="report-box__link">Отчет об опубликованных отзывах &gt;</a>
                <span class="report-box__desc">ЗАКАЗЫ</span>
              </li>
              <li class="report-box report-box_content report-box_color_4">
                <a href="/" class="report-box__link">Товары на нашем складе &gt;</a>
                <span class="report-box__desc">СКЛАД</span>
              </li>
            </ul>

          </div>
        </div>
      </div>
    </div>
  </section>

</template>
<style>

  .content {
    margin-top: 10px;
  }
  .content__wrap {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }
  .wrap {
    width: 100%;
    max-width: 1240px;
    margin: 0 auto;
    position: relative;
    box-sizing: border-box;
  }
  .content__group.content__group_1 {
    flex-grow: 2;
  }
  .content-box {
    background: #FFFFFF;
    border-radius: 25px;
    padding: 30px 15px 30px 30px;
    box-sizing: border-box;
    height: 100%;
  }
  .reports__group.reports__group_0 {
    margin-bottom: 50px;
    margin-top: 30px;
  }
  .content-action {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .breadcrumbs {
    list-style-type: none;
    padding: 0px;
    margin: 0px;
    display: flex;
    align-items: center;
    grid-gap: 10px;
  }
  .breadcrumbs__item {
    font-family: 'Montserrat', sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 15px;
    line-height: 18px;
    color: #76767D;
  }
  .but.but_3 {
    background: #F7F7FA;
    display: inline-block;
    border-radius: 10px;
    font-family: 'Montserrat', sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    color: #000000;
    /* padding: 10px; */
  }

  .breadcrumbs__link {
    font-family: 'Montserrat', sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 15px;
    line-height: 18px;
    color: #000000;
  }
  .reports__items.reports__items_content {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .report-box.report-box_color_1 {
    background: #F9E1E1;
  }
  .report-box.report-box_content {
    max-width: 354px;
    height: 251px;
    align-items: flex-start;
  }
  .report-box {
    width: 100%;
    max-width: 220px;
    height: 156px;
    border-radius: 25px;
    padding: 20px;
    box-sizing: border-box;
    display: flex;
    align-items: end;
    position: relative;
  }


  .report-box.report-box_color_2 {
    background: #E6F2E3;
  }
  .report-box.report-box_color_3 {
    background: #E5EAFD;
  }
  .report-box.report-box_color_4 {
    background: #FCEDCB;
  }
  .report-box__link {
    font-family: 'Montserrat', sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    color: #000000;
  }
  .report-box__desc {
    font-family: 'Montserrat', sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 55px;
    color: #FFFFFF;
    position: absolute;
    left: 0px;
    bottom: -13px;
    width: 100%;
    display: block;
    text-align: center;
  }
</style>






















<script>

  export default {
    components: { },
    name: 'Push',
    data() {
      return {
        modalByApiShow: false,
        msg: 'Push',
        tItems:[],
        tHeaders:[],
        resultsInSearch: {},
        loadingResultsInSearch: true,
      }
    },
    methods: {
      getPositions() {
        this.loadingResultsInSearch = true
        this.$store.dispatch('request/get_positions').then((x) => {
          this.resultsInSearch = x.data
          this.loadingResultsInSearch = false
        })
      },
      getAccounts() {
        this.loadingResultsInSearch = true
        this.$store.dispatch('request/get_account').then((x) => {
          this.resultsInSearch = x.data
          this.loadingResultsInSearch = false
        })
      },

      getNotification() {
        this.loadingResultsInSearch = true
        this.$store.dispatch('request/get_notification').then((x) => {
          console.log(x)
        })
        this.$store.dispatch('request/dbupdate').then((x) => {
          console.log(x)
        })

        Notification.requestPermission(function (status) {
          console.log('Notification permission status:', status);
        });
        if (Notification.permission === 'granted') {
          navigator.serviceWorker.getRegistration()
            .then(function (reg) {
                if (reg == undefined) {
                  console.log("only works online")
                  return
                }
                var options = {
                  body: 'First notification!',
                  icon: '../static/images/close.png',
                  vibrate: [100, 50, 100],
                  data: {
                    dateOfArrival: Date.now(),
                    primaryKey: 1
                  },
                  actions: [
                    {
                      action: 'explore',
                      title: 'Go to the site',
                      icon: '../static/images/close.png'
                    },
                    {
                      action: 'close',
                      title: 'Close the notification',
                      icon: '../static/images/close.png'
                    }
                  ]
                }
                reg.showNotification('Your Message Here!', options)
              }
            )
        }




        //setTimeout(this.getNotification, 3000)
      }
    },
    mounted() {
      this.getPositions()
      //this.getNotification()

    },
  }
</script>


<style>
  .modal-block{
    background: white;
    position: relative;
    width: 600px;
    max-height: 700px;
    height: 300px;
    box-shadow: 0 0 5px #3ee579;
    margin: 80px auto;
    border-radius: 15px;
    padding: 13px 0;
  }
  .modal-title{
    position: relative;
    width: 90%;
    margin: 10px auto;
    font-weight: 900;
    font-size: 35px;
    text-align: center;
    font-family: 'Montserrat', sans-serif;
  }
  .modal-content{
    position: relative;
    width: 98%;
    padding: 10px;
    margin: 5px auto;
    text-align: center;
    font-size: 19px;
    font-family: 'Montserrat', sans-serif;
  }
</style>
