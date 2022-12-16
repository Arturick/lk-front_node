<template>
    <div class="md:container md:mx-auto">
        <div class="bg-white rounded-3xl mt-2.5 mx-2.5 p-7 pb-20">

            <div class=" flex gap-8 items-center">
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
            </div>

            <div class="mt-12">
                <div class="content-title">Заявка от 02.07.2022</div>
            </div>

            <div class="mt-14">
                <div class="flex gap-4 items-center flex-col md:flex-row">
                    <div class="w-full md:w-auto">
                        <div class="input-block">
                            <input type="text" name="name" class="input-block__input input-block__input_w py-4 px-7" placeholder="Введите артикул">
                        </div>
                    </div>

                    <div class="w-full md:w-auto">
                        <a href="#" class="but but_3 py-4 px-7">По API</a>
                    </div>
                    <div class="w-full md:w-auto">
                        <a href="#" class="but but_3 py-4 px-7">Массовое добавление</a>
                    </div>
                    <div class="w-full md:w-auto">
                        <nuxt-link to="/ransoms/ransoms_4" class="but but_1 py-4 px-7">Заказать</nuxt-link>
                    </div>
                    <div class="w-full md:w-auto">
                        <a href="#" class="but but_4 py-4 px-7">В черновики</a>
                    </div>
                </div>
            </div>

            <div class="mt-12">
                <div class="positions-table">
                    <table class="positions-table__max">
                        <thead>
                            <tr>
                                <th>Фото</th>
                                <th>Бренд</th>
                                <th>Артикул</th>
                                <th>Цена WB</th>
                                <th>Размер</th>
                                <th>Баркод</th>
                                <th>Кол-во</th>
                                <th>Кол-во отзывов</th>
                                <th>Запрос</th>
                                <th>Пол</th>
                                <th>Статус</th>
                                <th></th>
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
                                    <div class="select">
                                        <div class="select__name">S</div>
                                    </div>
                                </td>
                                <td>
                                    <div class="input-block" style="width: 150px;">
                                        <input type="text" name="name" class="input-block__input input-block__input_w_1 py-2 px-4" value="7885821511582">
                                    </div>
                                </td>
                                <td>
                                    <div class="switcher switcher_w">
                                        <a href="" class="switcher__but">-</a>
                                        <span class="switcher__value">15</span>
                                        <a href="" class="switcher__but">+</a>
                                    </div>
                                </td>
                                <td>
                                    <div class="switcher switcher_w">
                                        <a href="" class="switcher__but">-</a>
                                        <span class="switcher__value">15</span>
                                        <a href="" class="switcher__but">+</a>
                                    </div>
                                </td>
                                <td>
                                    <div class="input-block" style="width: 150px;">
                                        <input type="text" name="name" class="input-block__input input-block__input_w_1 py-2 px-4" value="">
                                    </div>
                                </td>
                                <td>
                                    <div class="select">
                                        <div class="select__name">Нет</div>
                                    </div>
                                </td>
                                <td>
                                    <span class="status-warning">Черновик</span>
                                </td>
                                <td>
                                    <a href="#"><i class="icon icon_copy"></i></a>
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
                                        <div class="select__name">S</div>
                                    </div>
                                </td>
                                <td>
                                    <div class="input-block">
                                        <input type="text" name="name" class="input-block__input input-block__input_w_1 py-2 px-4" value="7885821511582">
                                    </div>
                                </td>
                                <td>
                                    <div class="switcher switcher_w">
                                        <a href="" class="switcher__but">-</a>
                                        <span class="switcher__value">154</span>
                                        <a href="" class="switcher__but">+</a>
                                    </div>
                                </td>
                                <td>
                                    <div class="switcher switcher_w">
                                        <a href="" class="switcher__but">-</a>
                                        <span class="switcher__value">154</span>
                                        <a href="" class="switcher__but">+</a>
                                    </div>
                                </td>
                                <td>
                                    <div class="input-block">
                                        <input type="text" name="name" class="input-block__input input-block__input_w_1 py-2 px-4" value="">
                                    </div>
                                </td>
                                <td>
                                    <div class="select">
                                        <div class="select__name">Ж</div>
                                    </div>
                                </td>
                                <td>
                                    <span class="status-warning">Черновик</span>
                                </td>
                                <td>
                                    <a href="#"><i class="icon icon_copy"></i></a>
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
                                        <div class="select__name">XS</div>
                                    </div>
                                </td>
                                <td>
                                    <div class="input-block">
                                        <input type="text" name="name" class="input-block__input input-block__input_w_1 py-2 px-4" value="7885821511582">
                                    </div>
                                </td>
                                <td>
                                    <div class="switcher switcher_w">
                                        <a href="" class="switcher__but">-</a>
                                        <span class="switcher__value">1100</span>
                                        <a href="" class="switcher__but">+</a>
                                    </div>
                                </td>
                                <td>
                                    <div class="switcher switcher_w">
                                        <a href="" class="switcher__but">-</a>
                                        <span class="switcher__value">1100</span>
                                        <a href="" class="switcher__but">+</a>
                                    </div>
                                </td>
                                <td>
                                    <div class="input-block">
                                        <input type="text" name="name" class="input-block__input input-block__input_w_1 py-2 px-4" value="">
                                    </div>
                                </td>
                                <td>
                                    <div class="select">
                                        <div class="select__name">L</div>
                                    </div>
                                </td>
                                <td>
                                    <span class="status-warning">Черновик</span>
                                </td>
                                <td>
                                    <a href="#"><i class="icon icon_copy"></i></a>
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
                                    <div class="switcher switcher_w">
                                        <a href="" class="switcher__but">-</a>
                                        <span class="switcher__value">1</span>
                                        <a href="" class="switcher__but">+</a>
                                    </div>
                                </td>
                                <td>
                                    <div class="switcher switcher_w">
                                        <a href="" class="switcher__but">-</a>
                                        <span class="switcher__value">1</span>
                                        <a href="" class="switcher__but">+</a>
                                    </div>
                                </td>
                                <td>
                                    <div class="input-block">
                                        <input type="text" name="name" class="input-block__input input-block__input_w_1 py-2 px-4" value="">
                                    </div>
                                </td>
                                <td>
                                    <div class="select">
                                        <div class="select__name">Ж</div>
                                    </div>
                                </td>
                                <td>
                                    <span class="status-warning">Черновик</span>
                                </td>
                                <td>
                                    <a href="#"><i class="icon icon_copy"></i></a>
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
                                        <div class="select__name">S</div>
                                    </div>
                                </td>
                                <td>
                                    <div class="input-block">
                                        <input type="text" name="name" class="input-block__input input-block__input_w_1 py-2 px-4" value="7885821511582">
                                    </div>
                                </td>
                                <td>
                                    <div class="switcher switcher_w">
                                        <a href="" class="switcher__but">-</a>
                                        <span class="switcher__value">1</span>
                                        <a href="" class="switcher__but">+</a>
                                    </div>
                                </td>
                                <td>
                                    <div class="switcher switcher_w">
                                        <a href="" class="switcher__but">-</a>
                                        <span class="switcher__value">1</span>
                                        <a href="" class="switcher__but">+</a>
                                    </div>
                                </td>
                                <td>
                                    <div class="input-block">
                                        <input type="text" name="name" class="input-block__input input-block__input_w_1 py-2 px-4" value="">
                                    </div>
                                </td>
                                <td>
                                    <div class="select">
                                        <div class="select__name">Ж</div>
                                    </div>
                                </td>
                                <td>
                                    <span class="status-warning">Черновик</span>
                                </td>
                                <td>
                                    <a href="#"><i class="icon icon_copy"></i></a>
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
                                    <div class="switcher switcher_w">
                                        <a href="" class="switcher__but">-</a>
                                        <span class="switcher__value">1</span>
                                        <a href="" class="switcher__but">+</a>
                                    </div>
                                </td>
                                <td>
                                    <div class="switcher switcher_w">
                                        <a href="" class="switcher__but">-</a>
                                        <span class="switcher__value">1</span>
                                        <a href="" class="switcher__but">+</a>
                                    </div>
                                </td>
                                <td>
                                    <div class="input-block">
                                        <input type="text" name="name" class="input-block__input input-block__input_w_1 py-2 px-4" value="">
                                    </div>
                                </td>
                                <td>
                                    <div class="select">
                                        <div class="select__name">М</div>
                                    </div>
                                </td>
                                <td>
                                    <span class="status-warning">Черновик</span>
                                </td>
                                <td>
                                    <a href="#"><i class="icon icon_copy"></i></a>
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