<template>
	<div>

		<div class="content-title">Отчеты</div>

		<div class="grid grid-cols-2 gap-4 mt-12">
        <div class="report-box report-box_color_1">
            <nuxt-link to="/reports" class="report-box__link">Отчет о выкупленных товарах ></nuxt-link>
        </div>
        <div class="report-box report-box_color_2">
          <nuxt-link to="/reports" class="report-box__link">Отчет о забраных товарах ></nuxt-link>
        </div>
        <div class="report-box report-box_color_3">
            <nuxt-link to="/reports" class="report-box__link">Отчет об опубликованных отзывах ></nuxt-link>
        </div>
        <div class="report-box report-box_color_4">
            <nuxt-link to="/reports"class="report-box__link">Товары на нашем складе ></nuxt-link>
        </div>
		</div>

		<div class="mt-7">

		</div>

	</div>
</template>

<script>
  export default {
    components: { },
    data() {
      return {

        crumbs: [
          {"name": 'Отчеты', "link": "/reports", "type": "link"},
        ],

      }
    },
    watch: {
    },
    computed: {

    },
    methods: {

    },
    mounted() {
    }
  }
</script>

<style scoped>
/* report-box  */
.report-box {
  width: 100%;
  height: 156px;

  border-radius: 25px;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  align-items: flex-end;
  position: relative;
}

.report-box__desc {
  font-family: 'Montserrat';
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

.report-box.report-box_content {
  max-width: 354px;
  height: 251px;
  align-items: flex-start;
}

.report-box.report-box_color_1 {
  background: #F9E1E1;
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
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  color: #000000;
}
/*  report-box end */
</style>
