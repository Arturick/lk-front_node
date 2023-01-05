<template>
    <section class="content">
        <div class="wrap content__wrap">
            <div class="content__group content__group_1">
                <div class="reports content-box">
                  <div class=" flex gap-8 items-center" style="margin-bottom: 50px; margin-top: 5px;">
                    <div>
                      <Breadcrumbs :items="crumbs" :back="back"/>
                    </div>
                  </div>
                    <div class="reports__group reports__group_1">
                        <ul class="reports__items reports__items_content">
                            <li class="report-box report-box_content report-box_color_1">
                                <nuxt-link to="reports/report_1?type=buyout" class="report-box__link" style="font-size: 22px; font-weight: bold;">Отчет о выкупленных товарах ></nuxt-link>
                                <span class="report-box__desc">ВЫКУПЫ</span>
                            </li>
                            <li class="report-box report-box_content report-box_color_2">
                                <nuxt-link to="reports/report_1?type=delivery" class="report-box__link" style="font-size: 22px; font-weight: bold;">Отчет о забраных товарах ></nuxt-link>
                                <span class="report-box__desc">ОТЗЫВЫ</span>
                            </li>
                            <li class="report-box report-box_content report-box_color_3">
                                <nuxt-link to="reports/report_1?type=review" class="report-box__link" style="font-size: 22px; font-weight: bold;">Отчет об опубликованных отзывах ></nuxt-link>
                                <span class="report-box__desc">ЗАКАЗЫ</span>
                            </li>
                            <li class="report-box report-box_content report-box_color_4">
                                <nuxt-link to="reports/report_1" class="report-box__link" style="font-size: 22px; font-weight: bold;">Товары на нашем складе ></nuxt-link>
                                <span class="report-box__desc">СКЛАД</span>
                            </li>
                        </ul>

                    </div>
                </div>
            </div>
        </div>
    </section>
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
      back: function() {
        this.$router.push('/');
      },
    },
    mounted() {
    }
  }
</script>
