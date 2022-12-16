<template>
    <div class="md:container md:mx-auto">
        <div class="bg-white rounded-3xl mt-2.5 mx-2.5 p-7 pb-20">

            <div class="md:flex md:items-center md:justify-between">
                <ul class="breadcrumbs">
                    <li class="breadcrumbs__item">
                        <nuxt-link to="/ransoms" class="but but_3 p-2.5">Назад</nuxt-link>
                    </li>
                    <li class="breadcrumbs__item">
                        <nuxt-link to="/" class="breadcrumbs__link">Главная</nuxt-link>
                    </li>
                    <li class="breadcrumbs__item">
                        <nuxt-link to="/ransoms" class="breadcrumbs__link">Выкупы</nuxt-link>
                    </li>
                    <li class="breadcrumbs__item">
                        Планирование
                    </li>
                </ul>

                <div class="md:mt-0 mt-8 grid md:grid-cols-2 grid-cols-1 gap-4 ">
                    <div>
                        <div class="select">
                            <div class="select__name">Сгруппровать: По артикулам</div>
                        </div>
                    </div>
                    <div>
                        <a href="" class="but but_1 p-1.5">Выгрузить отчёт</a>
                    </div>
                </div>
            </div>

            <div class="mt-12">
                <div class="content-title">Заявка от 02.07.2022</div>
            </div>

            <div class="mt-12">
                <div class="positions-table">
                    <table class="">
                        <thead>
                            <tr>
                                <th>Фото</th>
                                <th>Бренд</th>
                                <th>Артикул</th>
                                <th>Цена WB</th>
                                <th>Размер</th>
                                <th>Баркод</th>
                                <th>Кол-во план</th>
                                <th>Кол-во факт</th>
                                <th>Сумма выкупа</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><img :src="require(`assets/images/17849231-1.png`)" alt=""></td>
                                <td>BRAND</td>
                                <td>78858215</td>
                                <td>271 ₽</td>
                                <td>
                                    S
                                </td>
                                <td>
                                    7885821511582
                                </td>
                                <td>
                                    15
                                </td>
                                <td>
                                    15
                                </td>
                                <td>
                                    2349 ₽
                                </td>
                                <td><a href="#"><i class="icon icon_arrow_r"></i></a></td>
                            </tr>
                            <tr>
                                <td><img :src="require(`assets/images/17849231-1.png`)" alt=""></td>
                                <td>BRAND</td>
                                <td>78858215</td>
                                <td>271 ₽</td>
                                <td>
                                    XS
                                </td>
                                <td>
                                    7885821511582
                                </td>
                                <td>
                                    154
                                </td>
                                <td>
                                    154
                                </td>
                                <td>
                                    2349 ₽
                                </td>
                                <td><a href="#"><i class="icon icon_arrow_r"></i></a></td>
                            </tr>
                            <tr>
                                <td><img :src="require(`assets/images/17849231-1.png`)" alt=""></td>
                                <td>BRAND</td>
                                <td>78858215</td>
                                <td>271 ₽</td>
                                <td>
                                    L
                                </td>
                                <td>
                                    7885821511582
                                </td>
                                <td>
                                    1100
                                </td>
                                <td>
                                    1100
                                </td>
                                <td>
                                    2349 ₽
                                </td>
                                <td><a href="#"><i class="icon icon_arrow_r"></i></a></td>
                            </tr>
                            <tr>
                                <td><img :src="require(`assets/images/17849231-1.png`)" alt=""></td>
                                <td>BRAND</td>
                                <td>78858215</td>
                                <td>271 ₽</td>
                                <td>
                                    M
                                </td>
                                <td>
                                    7885821511582
                                </td>
                                <td>
                                    1
                                </td>
                                <td>
                                    1
                                </td>
                                <td>
                                    2349 ₽
                                </td>
                                <td><a href="#"><i class="icon icon_arrow_r"></i></a></td>
                            </tr>
                            <tr>
                                <td><img :src="require(`assets/images/17849231-1.png`)" alt=""></td>
                                <td>BRAND</td>
                                <td>78858215</td>
                                <td>271 ₽</td>
                                <td>
                                    S
                                </td>
                                <td>
                                    7885821511582
                                </td>
                                <td>
                                    1
                                </td>
                                <td>
                                    1
                                </td>
                                <td>
                                    2349 ₽
                                </td>
                                <td><a href="#"><i class="icon icon_arrow_r"></i></a></td>
                            </tr>
                            <tr>
                                <td><img :src="require(`assets/images/17849231-1.png`)" alt=""></td>
                                <td>BRAND</td>
                                <td>78858215</td>
                                <td>271 ₽</td>
                                <td>
                                    M
                                </td>
                                <td>
                                    7885821511582
                                </td>
                                <td>
                                    1
                                </td>
                                <td>
                                    1
                                </td>
                                <td>
                                    2349 ₽
                                </td>
                                <td><a href="#"><i class="icon icon_arrow_r"></i></a></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div class="mt-12">
                <div>Общее количество: <strong>3 артикула, 790 шт</strong> </div>
                <div>Сумма выкупа: <strong>214 090₽</strong></div>
                <div>Услуги: <strong>79 000₽</strong></div>
            </div>
        </div>
    </div>
</template>