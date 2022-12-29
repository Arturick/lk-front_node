<template>
  <div>


    <div class="md:container md:mx-auto">
      <div class="flex gap-4 mt-4 flex-col md:flex-row">
        <div class="bg-white rounded-3xl flex-grow p-2.5 md:p-7">
          <MainStat />
        </div>
        <div class="bg-white rounded-3xl p-2.5 md:p-7 md:w-1/3 w-full ">
          <MainNotices />
        </div>
      </div>
    </div>

    <div class="md:container md:mx-auto">
      <div class="flex gap-4 mt-4 flex-col md:flex-row">
        <div class="bg-white rounded-3xl flex-grow p-2.5 md:p-7">
          <div class="content-title">Позиции товара в выдаче</div>
          <div class="mt-12">
            <CommonTable :headers="resultsInSearch.headers" :items="resultsInSearch.items" :loading="loadingResultsInSearch">
              <template v-slot:item.image="{ item }">
                  <img :src="item.image" alt="" class="img-table">
              </template>
            </CommonTable>
          </div>
        </div>
        <div class="bg-white rounded-3xl p-2.5  md:w-1/3 w-full mdSelf">
          <MainReports />
        </div>
      </div>
    </div>

  </div>
</template>

<script>

  export default {
    components: { },
    name: 'Push',
    middleware: 'auth',
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
