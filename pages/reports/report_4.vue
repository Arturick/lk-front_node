<template>
    <div class="md:container md:mx-auto">
        <div class="bg-white rounded-3xl mt-2.5 mx-2.5 p-7 pb-20">
            <div class="line_1">
                <div class="button_inform">
                    <nuxt-link to="/" class="btn_back">
                        Назад
                    </nuxt-link>
                    <p><span class="black_l1">
                        <nuxt-link to="/">Главная</nuxt-link>
                        &ensp;/</span> &ensp;Позиции товара в выдаче</p>
                </div>
                <button class="btn_l1_right">Выгрузить отчет</button>
            </div>
            <h1 class="page_title">Калькулятор выкупов для Wildberries</h1>
            <div class="l3_right_1">
                <span class="l3_brand">Бренд</span>
                <span class="l3_brand">Фото</span>
                <span class="l3_brand">Артикул</span>
                <span class="l3_brand">Цена</span>
                <span class="l3_brand">Наименование</span>
            </div>
            <div class="product_info_rep">
                <div class="pr_inner">
                    <img class="logo_brand" src="../../assets/images/logo_brand.svg" alt="">
                    <img class="product_img" src="../../assets/images/pr_img.svg" alt="">
                    <span class="table_art">78858215</span>
                    <span class="table_price">271 ₽</span>
                    <p class="pr_title_info">Футболка женская оверсайз колор блок с длинным рукавом и надписью, в
                        подарок / майка летняя</p>
                </div>
            </div>
            <div class="rep_graf">
                <ChartReport :series="series" :categories="categories"></ChartReport>
            </div>
            <div class="table_exel_report"></div>
            <div class="info_p4_line">
                <div class="params_infoP4">
                    <span>Фото</span>
                    <span>Бренд</span>
                    <span>Артикул</span>
                    <span>Цена&ensp;WB</span>
                    <span>Выручка,&ensp;30&ensp;дн.</span>
                    <span>Топ</span>
                    <span>Запрос</span>
                    <span>Ср.&ensp;выручка&ensp;в&ensp;топ,&ensp;30&ensp;дн.</span>
                    <span>Мин.&ensp;выручка&ensp;в&ensp;топ,&ensp;30&ensp;дн.</span>
                </div>
                <div class="info_p4">
                    <img src="../../assets/images/pr_img.svg" alt="">
                    <span class="info_sp4_b">BRAND</span>
                    <span class="info_sp4_a">78858215</span>
                    <span class="info_sp4_p1">271 ₽</span>
                    <span class="info_sp4_p2">557 024 ₽</span>
                    <span class="info_sp4_t">5</span>
                    <span class="info_sp4_n">сумка женская</span>
                    <span class="info_sp4_p3">2 534 793 ₽</span>
                    <span class="info_sp4_p4">699 078 ₽</span>
                </div>
            </div>
            <div class="table_info_p4">
                <div class="fir_line_p4">
                    <div class="p4Title">Бренд</div>
                    <div class="p4Nums">
                        <span>1</span>
                        <span>2</span>
                        <span>3</span>
                        <span>4</span>
                        <span>5</span>
                        <span>6</span>
                        <span>7</span>
                        <span>8</span>
                        <span>9</span>
                        <span>10</span>
                        <span>11</span>
                        <span>12</span>
                        <span>13</span>
                        <span>14</span>
                        <span>15</span>
                        <span>16</span>
                        <span>17</span>
                        <span>18</span>
                        <span>19</span>
                        <span>20</span>
                        <span>21</span>
                        <span>22</span>
                        <span>23</span>
                        <span>24</span>
                        <span>25</span>
                        <span>26</span>
                        <span>27</span>
                        <span>28</span>
                        <span>29</span>
                        <span>30</span>
                    </div>
                </div>
                <div class="sec_line_p4">
                    <div class="p4Title">На 30 дней</div>
                    <div class="p4Nums">
                        <span>1</span>
                        <span>8</span>
                        <span>9</span>
                        <span>8</span>
                        <span>9</span>
                        <span>3</span>
                        <span>4</span>
                        <span>4</span>
                        <span>4</span>
                        <span>4</span>
                        <span>4</span>
                        <span>4</span>
                        <span>4</span>
                        <span>4</span>
                        <span>4</span>
                        <span>4</span>
                        <span>4</span>
                        <span>4</span>
                        <span>4</span>
                        <span>4</span>
                        <span>4</span>
                        <span>4</span>
                        <span>4</span>
                        <span>4</span>
                        <span>4</span>
                        <span>4</span>
                        <span>4</span>
                        <span>4</span>
                        <span>4</span>
                        <span>4</span>
                    </div>
                </div>
                <div class="th_line_p4">
                    <div class="p4Title">На 21 день</div>
                    <div class="p4Nums">
                        <span>3</span>
                        <span>4</span>
                        <span>4</span>
                        <span>2</span>
                        <span>4</span>
                        <span>7</span>
                        <span>3</span>
                        <span>3</span>
                        <span>3</span>
                        <span>3</span>
                        <span>3</span>
                        <span>3</span>
                        <span>3</span>
                        <span>3</span>
                        <span>3</span>
                        <span>3</span>
                        <span>3</span>
                        <span>3</span>
                        <span>3</span>
                        <span>3</span>
                        <span>3</span>
                    </div>
                </div>
                <div class="fiv_line_p4">
                    <div class="p4Title">На 14 дней</div>
                    <div class="p4Nums">
                        <span>3</span>
                        <span>4</span>
                        <span>4</span>
                        <span>2</span>
                        <span>4</span>
                        <span>7</span>
                        <span>3</span>
                        <span>3</span>
                        <span>3</span>
                        <span>3</span>
                        <span>3</span>
                        <span>3</span>
                        <span>3</span>
                        <span>3</span>
                    </div>
                </div>
                <div class="four_line_p4">
                    <div class="p4Title">Итого</div>
                    <div class="p4Nums">
                        <span>1</span>
                        <span>2</span>
                        <span>3</span>
                        <span>4</span>
                        <span>5</span>
                        <span>6</span>
                        <span>7</span>
                        <span>8</span>
                        <span>9</span>
                        <span>10</span>
                        <span>11</span>
                        <span>12</span>
                        <span>13</span>
                        <span>14</span>
                        <span>15</span>
                        <span>16</span>
                        <span>17</span>
                        <span>18</span>
                        <span>19</span>
                        <span>20</span>
                        <span>21</span>
                        <span>22</span>
                        <span>23</span>
                        <span>24</span>
                        <span>25</span>
                        <span>26</span>
                        <span>27</span>
                        <span>28</span>
                        <span>29</span>
                        <span>30</span>
                    </div>
                </div>
                <div class="start_p4">Начать движение в топ 5</div>
                <div class="start_p4_sup">График можно скорректировать на этапе<br> оформления заявки</div>
                <div class="sel_btn_inp_p4">
                    <div class="select_wrapper_1">
                        <select>
                            <option>---</option>
                            <option selected>Хочу в топ за 14 дней</option>
                            <option>Хочу в топ за 21 день</option>
                            <option>Хочу в топ за 7 дней</option>
                        </select>
                        <span>
                            <svg width="1.2rem" height="1rem" viewBox="0 0 15 9" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M14 1L7.5 7L1 0.999999" stroke="black" stroke-width="2" />
                            </svg>
                        </span>
                    </div>
                    <button class="btn_l2_add">Заказать</button>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            series: [
                {
                    name: "Продажи",
                    data: [1.4, 2, 2.5, 1.5, 2.5, 2.8, 3.8, 4.6]
                },
                {
                    name: "Выручка",
                    data: [20, 29, 37, 36, 44, 45, 50, 58]
                },
                {
                    name: "Товаров",
                    data: [6, 4, 63, 39, 3, 36, 45, 55]
                },
                {
                    name: "Товаров с продажами",
                    data: [18, 26.1, 33, 32.4, 39.6, 40.5, 45, 52.2]
                }
            ],
            categories: [
                "01 Jan",
                "02 Jan",
                "03 Jan",
                "04 Jan",
                "05 Jan",
                "06 Jan",
                "07 Jan",
                "08 Jan"
            ]
        }
    }
}
</script>

<style scoped>
.btn_back {
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>