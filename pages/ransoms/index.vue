<template>
    <div class="md:container md:mx-auto">
        <div class="bg-white rounded-3xl mt-2.5 mx-2.5 p-7">
            <div class="flex gap-2.5 items-center flex-col md:flex-row justify-between">
                <div class="">
                    <div class="content-title">Новая заявка на выкупы WILDBERRIES</div>
                    <div class="content-desc mt-3.5">Создайте новую группу выкупов. Введите артикулы товаров и заполните необходимые данные.</div>
                </div>
                <div class="mt-2.5 md:mt-0 w-full md:w-auto">
                    <nuxt-link to="ransoms//ransoms_p" class="but but_1 p-1.5">Добавить</nuxt-link>
                </div>
            </div>
        </div>

        <div class="bg-white rounded-3xl mt-2.5 mx-2.5 p-7">
            <div class="md:flex md:items-center md:justify-between">
                <div class="content-title">Автоматический рассчет выхода в топ WILDBERRIES</div>
                <div>
                    <nuxt-link to="ransoms/" class="but_2 p-1.5">Скоро</nuxt-link>
                </div>
            </div>
        </div>

        <div class="bg-white rounded-3xl mt-2.5 mx-2.5 p-7">
            <div class="md:flex md:items-center md:justify-between">
                <div class="content-title">Выкупы WILDBERRIES</div>
                <div class="md:mt-0 mt-2.5">
                    <div class="select">
                        <div class="select__name">Модель работы: Под ключ</div>
                    </div>
                </div>
            </div>
            <div class="mt-2.5 md:w-3/5">
                <div class="positions-table">
                    <table>
                        <thead>
                            <tr class="h-14">
                                <th>Заявка от</th>
                                <th>Заказов план</th>
                                <th>Заказов факт</th>
                                <th>Статус</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="h-14">
                                <td>05.07.2022</td>
                                <td>99</td>
                                <td>-</td>
                                <td><span class="status-plan">Черновик</span></td>
                                <td><nuxt-link to="ransoms/ransoms_1"><i class="icon icon_arrow_r"></i></nuxt-link></td>
                            </tr>
                            <tr class="h-14">
                                <td>04.07.2022</td>
                                <td>99</td>
                                <td>-</td>
                                <td><span class="status-plan">Черновик</span></td>
                                <td><nuxt-link to="ransoms/ransoms_1"><i class="icon icon_arrow_r"></i></nuxt-link></td>
                            </tr>
                            <tr class="h-14">
                                <td>05.07.2022</td>
                                <td>99</td>
                                <td>123</td>
                                <td><span class="status-process">В процессе</span></td>
                                <td><nuxt-link to="ransoms/ransoms_6"><i class="icon icon_arrow_r"></i></nuxt-link></td>
                            </tr>
                            <tr class="h-14">
                                <td>05.07.2022</td>
                                <td>99</td>
                                <td>66</td>
                                <td><span class="status-process">В процессе</span></td>
                                <td><nuxt-link to="ransoms/ransoms_6"><i class="icon icon_arrow_r"></i></nuxt-link></td>
                            </tr>
                            <tr class="h-14">
                                <td>05.07.2022</td>
                                <td>99</td>
                                <td>77</td>
                                <td><span class="status-succses">Готово</span></td>
                                <td><nuxt-link to="ransoms/ransoms_7"><i class="icon icon_arrow_r"></i></nuxt-link></td>
                            </tr>
                            <tr class="h-14">
                                <td>05.07.2022</td>
                                <td>99</td>
                                <td>-</td>
                                <td><span class="status-succses">Готово</span></td>
                                <td><nuxt-link to="ransoms/ransoms_7"><i class="icon icon_arrow_r"></i></nuxt-link></td>
                            </tr>
                            <tr class="h-14">
                                <td>05.07.2022</td>
                                <td>99</td>
                                <td>-</td>
                                <td><span class="status-succses">Готово</span></td>
                                <td><nuxt-link to="ransoms/ransoms_7"><i class="icon icon_arrow_r"></i></nuxt-link></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    </div>
</template>