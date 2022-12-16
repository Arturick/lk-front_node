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
                        <nuxt-link to="/ransoms/ransoms" class="breadcrumbs__link">Выкупы</nuxt-link>
                    </li>
                    <li class="breadcrumbs__item">
                        Планирование
                    </li>
                </ul>

                <div class="md:mt-0 mt-8 grid md:grid-cols-2 grid-cols-1 gap-4 ">
                    <div>
                        <div class="select">
                            <div class="select__name">Сгруппровать: Все</div>
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
                                <th>Запрос</th>
                                <th>Пол</th>
                                <th>Дата выкупа</th>
                                <th>Статус</th>
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
                                    Пример запроса
                                </td>
                                <td>
                                    Нет
                                </td>
                                <td>
                                    21.08.2022
                                </td>
                                <td>
                                    <span class="status-succses">Оплачено</span>
                                </td>
                                <td>
                                </td>
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
                                    Пример запроса
                                </td>
                                <td>
                                    Ж
                                </td>
                                <td>
                                    21.08.2022
                                </td>
                                <td>
                                    <span class="status-dunger">Не оплачен</span>
                                </td>
                                <td>
                                </td>
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
                                    Пример запроса
                                </td>
                                <td>
                                    L
                                </td>
                                <td>
                                    21.08.2022
                                </td>
                                <td>
                                    <span class="status-succses">Оплачено</span>
                                </td>
                                <td>
                                </td>
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
                                    Пример запроса
                                </td>
                                <td>
                                    Ж
                                </td>
                                <td>
                                    21.08.2022
                                </td>
                                <td>
                                    <span class="status-succses">Оплачено</span>
                                </td>
                                <td>
                                </td>
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
                                    Пример запроса
                                </td>
                                <td>
                                    Ж
                                </td>
                                <td>
                                    21.08.2022
                                </td>
                                <td>
                                    <span class="status-succses">Оплачено</span>
                                </td>
                                <td>
                                </td>
                            </tr>
                            <tr>
                                <td><img :src="require(`assets/images/17849231-1.png`)" alt=""></td>
                                <td>BRAND</td>
                                <td>78858215</td>
                                <td>271 ₽</td>
                                <td>
                                    <div class="select">
                                        <div class="select__name">M</div>
                                    </div>
                                </td>
                                <td>
                                    <div class="input-block">
                                        <input type="text" name="name" class="input-block__input input-block__input_w_1 py-2 px-4" value="7885821511582">
                                    </div>
                                </td>
                                <td>
                                    <div class="input-block">
                                        <input type="text" name="name" class="input-block__input input-block__input_w_1 py-2 px-4" value="Пример запроса">
                                    </div>
                                </td>
                                <td>
                                    <div class="select">
                                        <div class="select__name">Нет</div>
                                    </div>
                                </td>
                                <td>
                                    <div class="input-block">
                                        <input type="text" name="name" class="input-block__input input-block__input_w_1 py-2 px-4" value="24.08.2022">
                                    </div>
                                </td>
                                <td>
                                    <span class="status-warning">Запланировано</span>
                                </td>
                                <td>
                                    <a href="#"><i class="icon icon_close_g"></i></a>
                                </td>
                            </tr>
                            <tr>
                                <td><img :src="require(`assets/images/17849231-1.png`)" alt=""></td>
                                <td>BRAND</td>
                                <td>78858215</td>
                                <td>271 ₽</td>
                                <td>
                                    <div class="select">
                                        <div class="select__name">M</div>
                                    </div>
                                </td>
                                <td>
                                    <div class="input-block">
                                        <input type="text" name="name" class="input-block__input input-block__input_w_1 py-2 px-4" value="7885821511582">
                                    </div>
                                </td>
                                <td>
                                    <div class="input-block">
                                        <input type="text" name="name" class="input-block__input input-block__input_w_1 py-2 px-4" value="Пример запроса">
                                    </div>
                                </td>
                                <td>
                                    <div class="select">
                                        <div class="select__name">М</div>
                                    </div>
                                </td>
                                <td>
                                    <div class="input-block">
                                        <input type="text" name="name" class="input-block__input input-block__input_w_1 py-2 px-4" value="24.08.2022">
                                    </div>
                                </td>
                                <td>
                                    <span class="status-warning">Запланировано</span>
                                </td>
                                <td>
                                    <a href="#"><i class="icon icon_close_g"></i></a>
                                </td>
                            </tr>
                            <tr>
                                <td><img :src="require(`assets/images/17849231-1.png`)" alt=""></td>
                                <td>BRAND</td>
                                <td>78858215</td>
                                <td>271 ₽</td>
                                <td>
                                    <div class="select">
                                        <div class="select__name">M</div>
                                    </div>
                                </td>
                                <td>
                                    <div class="input-block">
                                        <input type="text" name="name" class="input-block__input input-block__input_w_1 py-2 px-4" value="7885821511582">
                                    </div>
                                </td>
                                <td>
                                    <div class="input-block">
                                        <input type="text" name="name" class="input-block__input input-block__input_w_1 py-2 px-4" value="Пример запроса">
                                    </div>
                                </td>
                                <td>
                                    <div class="select">
                                        <div class="select__name">М</div>
                                    </div>
                                </td>
                                <td>
                                    <div class="input-block">
                                        <input type="text" name="name" class="input-block__input input-block__input_w_1 py-2 px-4" value="24.08.2022">
                                    </div>
                                </td>
                                <td>
                                    <span class="status-warning">Запланировано</span>
                                </td>
                                <td>
                                    <a href="#"><i class="icon icon_close_g"></i></a>
                                </td>
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