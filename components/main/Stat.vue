,0,<template>
	<div>
      <div class="stat">
          <div class="stat__group stat__group_1 flex flex-col md:flex-row">
              <div class="content-title">Статистика</div>
              <div class="stat__buttons">
                  <el-select
                    v-model="arts"
                    multiple
                    collapse-tags
                    placeholder="Товары">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                  <Button class="rounded-lg p-2.5 but-0 stat__but" :class="{'but-0_active' : sw == 1}" @click="sw = 1">Заказали</Button>
                  <Button class="rounded-lg p-2.5 but-0 stat__but" :class="{'but-0_active' : sw == 2}" @click="sw = 2">Забрали</Button>
              </div>
          </div>
          <div class="stat__group stat__group_2">
              <div class="stat__info">
                  <div class="stat__row">
                      <div class="stat__label">Количество</div>
                      <div class="stat__value">{{weekData.count}} шт.</div>
                  </div>
                  <div class="stat__row">
                      <div class="stat__label">Сумма</div>
                      <div class="stat__value">{{weekData.sum}} ₽</div>
                  </div>
              </div>
              <div class="stat-area">
                  <div class="stat-area__chart">
                    <template v-if="toggle">
                  	 <MainWeekChart :weekData="weekData" />
                    </template>
                  </div>
                  <div class="stat-area__actions">
                      <a href="" class="stat-area__but stat-area__but_last">Прошлая неделя</a>
                      <a href="" class="stat-area__but stat-area__but_cur">Текщая неделя</a>
                      <a href="" class="stat-area__but stat-area__but_reset">Последние данные на {{weekData.update_date}} в {{weekData.update_time}}</a>
                  </div>
              </div>
          </div>
      </div>
	</div>
</template>

<script>
	export default {
	  name: 'Stat',
	  components: {  },
	  data() {
	    return {
	      sw: 1,
        toggle: false,
        weekData: {},

      options: [
      ],
        arts: []
	    }
	  },

    watch: {
      sw: function (val) {
        this.getStatInfo()
      },
      arts: function (val) {
        this.getStatInfo()
      }
    },
    methods: {
      getStatInfo() {
        this.$store.dispatch('request/get_statinfo', {type: this.sw}).then((x) => {
          console.log(x);
          this.weekData = x.data
          this.$nextTick(() => {
            this.toggle = true
          });
        })
      },
    },
    mounted() {
     this.getStatInfo()
    },
	}
</script>

<style scoped>


/* stat  */
.stat {

}
.stat__group {

}
.stat__group.stat__group_1 {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.stat__group.stat__group_2 {
  margin-top: 27px;
  display: flex;
}
.stat__buttons {
  display: flex;
  gap: 6px;
}
.stat__info {
    display: flex;
    flex-direction: column;
    gap: 26px;
		width: 150px;
}
.stat__row {
}

.stat__label {
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 18px;
  color: #989999;
}
.stat__value {
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 24px;
  color: #000000;
  margin-top: 8px;
}
.stat__but {
  width: 150px;
}
/* stat end */

/* stat-area  */
.stat-area {
  flex-grow: 2;
}
.stat-area__chart {
  width: 100%;
  height: auto;
}
.stat-area__actions {
  display: flex;
  justify-content: space-between;
}
.stat-area__but {
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  color: #76767D;
  display: flex;
  align-items: center;
}
.stat-area__but.stat-area__but_last:before {
  content: '';
  display: inline-block;
  width: 12px;
  height: 12px;
  background: #D9D9D9;
  border-radius: 12px;
  margin-right: 8px;
}
.stat-area__but.stat-area__but_cur:before {
  content: '';
  display: inline-block;
  width: 12px;
  height: 12px;
  background: #92E6D6;
  border-radius: 12px;
  margin-right: 8px;
}
.stat-area__but.stat-area__but_reset:before {
  content: '';
  display: inline-block;
  width: 21px;
  height: 21px;
  background: url("/images/reload.png") no-repeat top center;
  margin-right: 8px;
}
/*  stat-area end */
</style>
