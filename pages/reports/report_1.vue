<template>
    <div class="md:container md:mx-auto">
        <div class="bg-white rounded-3xl mt-2.5 mx-2.5 p-7 pb-20">

          <div class=" flex gap-8 items-center">
            <Breadcrumbs :items="crumbs" :back="back"/>
          </div>

            <div class="mt-12">
                <div class="content-title">Отчет о выкупленных товарах</div>
            </div>

            <div class="flex gap-4 items-center">
              <div class="mt-12">
                <div style="display: flex; margin-bottom: 35px;">
                  <div>
                    <Button class="rounded-lg p-2.5 but-0" :class="{'but-0_active' : sw == 1}" @click="sw = 1, showDateSelector = false">Все</Button>
                  </div>
                  <div class="btn_rep_el">
                    <Button class="rounded-lg p-2.5 but-0" :class="{'but-0_active' : sw == 2}" @click="sw = 2, showDateSelector = false">Сегодня</Button>
                  </div>
                  <div class="btn_rep_el">
                    <Button class="rounded-lg p-2.5 but-0" :class="{'but-0_active' : sw == 3}" @click="sw = 3, showDateSelector = false">Неделя</Button>
                  </div>
                  <div class="btn_rep_el">
                    <Button class="rounded-lg p-2.5 but-0" :class="{'but-0_active' : sw == 4}" @click="sw = 4, showDateSelector = false">Месяц</Button>
                  </div>
                  <div class="btn_rep_el">
                    <Button class="rounded-lg p-2.5 but-0" :class="{'but-0_active' : sw == 5}" @click="sw = 5, showDateSelector = !showDateSelector" >Задать период</Button>
                  </div>
                </div>
                <div v-if="showDateSelector" class="w-96 flex gap-4 items-center">
                <v-dialog
                  ref="dialog"
                  v-model="dialogDate"
                  :return-value.sync="selectedDate"
                  persistent
                  width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="dateRangeText"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="selectedDate"
                    range
                    show-adjacent-months
                    locale="ru-RU"
                  >
                    <v-spacer></v-spacer>
                    <v-btn
                      text
                      color="primary"
                      @click="dialogDate = false"
                    >
                      Cancel
                    </v-btn>
                    <v-btn
                      text
                      color="primary"
                      @click="$refs.dialog.save(selectedDate)"
                    >
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-dialog>
                  <div class="btn_rep_el">
                    <Button class="rounded-lg p-2.5 but-1" @click="" >Получить</Button>
                  </div>
              </div>
              </div>
            </div>


            <div class="mt-12">
                <div class="content-title content-title_2">Раннее заказанные отчеты</div>
                <template v-if="tItems.length == 0">
                  <div class="result-empty">ЗДЕСЬ ПОКА НИЧЕГО</div>
                </template>
            </div>

        </div>
    </div>
</template>
<script>
  export default {
    components: { },
    data() {
      return {
        dialogDate: false,
        localeData: {
          firstDay: 1, format: 'dd-mm-yyyy',
          applyLabel: 'Принять',
          cancelLabel: 'Закрыть',
          daysOfWeek: ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'],
          monthNames: ['янв.', 'февр.', 'март', 'апр.', 'май', 'июнь', 'июль', 'авг.', 'сент.', 'окт.', 'нояб.', 'дек.'],
        },
        selectedDate: [
          new Date().toISOString().split("T")[0],
          new Date(new Date().getTime() + 9 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        ],
        tItems: [],
        tHeaders: [],
        crumbs: [
          {"name": 'Отчеты', "link" : "/reports", "type" : "link"},
          {"name": 'Отчеты по выкупам', "link" : "/report_1", "type" : "text"}
          ,
        ],
        sw: 0,
        showDateSelector: false,

        // selectedDate: {
        //       startDate: new Date(),
        //       endDate:
        //   },


      }
    },
    watch: {
    },
    computed: {


      dateRangeText: function() {
        let text = ''
        return this.selectedDate
        // return text
      },

    },
    methods: {
      getReport(){
        this.$store.dispatch('request/getReportBuyout', {task1: 5122022}).then((x) => {
          cosnole.log(x);
          this.resultsInSearch = x.data;
          this.loadingResultsInSearch = false
        })
      }
    },
    mounted() {
    }
  }
</script>
<style>
  .btn_rep_el{
    margin-left: 15px;
  }
</style>
