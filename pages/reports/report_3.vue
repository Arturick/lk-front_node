<template>
    <div class="md:container md:mx-auto">
        <div class="bg-white rounded-3xl mt-2.5 mx-2.5 p-7 pb-20">
            <div class="line_1">
                <div class="button_inform">
                    <button class="btn_back">Назад</button>
                    <p>
                        <nuxt-link to="/" class="black_l1">Главная&ensp;/</nuxt-link> &ensp;Позиции товара в выдаче
                    </p>
                </div>
                <button class="btn_l1_right">Выгрузить отчет</button>
            </div>
            <h1 class="page_title">Позиция товара в выдаче</h1>
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
            <div class="graff">
                <ChartReportShort :series="series"></ChartReportShort>
            </div>
            <div class="lower_tables">
                <div class="newTable">
                    <div class="menu_table">
                        <div class="l3_left">
                            <span class="l3_brand">Запрос</span>
                            <span class="l3_ch">Частотность WB</span>
                            <span class="l3_pr">Товаров на WB</span>
                            <span class="l3_5">5.07</span>
                            <span class="l3_6">6.07</span>
                            <span class="l3_5_1">5.07</span>
                            <span class="l3_6_1">6.07</span>
                            <span class="l3_5_2">5.07</span>
                            <span class="l3_6_2">6.07</span>
                        </div>
                    </div>
                    <div class="table_form">
                        <div class="table_req1">
                            <div class="req">Футболка женская</div>
                            <div class="req">Футболка оверсайз</div>
                            <div class="req">Футболка</div>
                            <div class="req"><span class="req_p">Футболка женская оверсайз</span></div>
                            <div class="req">Футболка женская</div>
                        </div>
                        <div class="stattt">
                            <div class="col_stat">
                                <span class="stat">150</span>
                                <span class="stat">150</span>
                                <span class="stat">150</span>
                                <span class="stat">150</span>
                                <span class="stat">150</span>
                            </div>
                            <div class="col_stat1">
                                <span class="stat">150</span>
                                <span class="stat">150</span>
                                <span class="stat">150</span>
                                <span class="stat">150</span>
                                <span class="stat">150</span>
                            </div>
                            <div class="col_stat2">
                                <span class="stat">150</span>
                                <span class="stat">150</span>
                                <span class="stat">150</span>
                                <span class="stat">150</span>
                                <span class="stat">150</span>
                            </div>
                            <div class="col_stat3">
                                <span class="stat">78</span>
                                <span class="stat">78</span>
                                <span class="stat">78</span>
                                <span class="stat">78</span>
                                <span class="stat">78</span>
                            </div>
                            <div class="col_stat4">
                                <span class="stat">77</span>
                                <span class="stat">77</span>
                                <span class="stat">77</span>
                                <span class="stat">77</span>
                                <span class="stat">77</span>
                            </div>
                            <div class="col_stat5">
                                <span class="stat">78</span>
                                <span class="stat">78</span>
                                <span class="stat">78</span>
                                <span class="stat">78</span>
                                <span class="stat">78</span>
                            </div>
                            <div class="col_stat6">
                                <span class="stat">77</span>
                                <span class="stat">77</span>
                                <span class="stat">77</span>
                                <span class="stat">77</span>
                                <span class="stat">77</span>
                            </div>
                            <div class="col_stat7">
                                <span class="stat">78</span>
                                <span class="stat">78</span>
                                <span class="stat">78</span>
                                <span class="stat">78</span>
                                <span class="stat">78</span>
                            </div>
                            <div class="del_stat">
                                <img src="../../assets/images/closs.svg" alt="">
                                <img src="../../assets/images/closs.svg" alt="">
                                <img src="../../assets/images/closs.svg" alt="">
                                <img src="../../assets/images/closs.svg" alt="">
                                <img src="../../assets/images/closs.svg" alt="">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="add_req">
                    <div class="menu_add">
                        <h3 class="add_title">Добавьте запросы</h3>
                    </div>
                    <div class="add_form">
                        <input type="text" placeholder="Введите запрос" class="addReq_inp">
                        <div class="add_checkbox">
                            <div class="first_check">
                                <input type="checkbox" id="inp_tshirt_fe" />
                                <label class="ll_check" for="inp_tshirt_fe">Футболка женская</label>
                            </div>
                            <div class="second_check">
                                <input type="checkbox" id="ll_check1" />
                                <label class="ll_check1" for="ll_check1">Футболка оверсайз</label>
                            </div>
                            <div class="thr_check">
                                <input type="checkbox" id="ll_check2" />
                                <label class="ll_check2" for="ll_check2">Футболка женская овер</label>
                            </div>
                        </div>
                    </div>
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
                    data: [1.4, 2, 2.5, 1.5, 2.5, 2.8, 3.8, 4.6]
                },
                {
                    data: [20, 29, 37, 36, 44, 45, 50, 58]
                }
            ]
        }
    },
    components: {
        // Bar
        // LineChart
    }
}
</script>