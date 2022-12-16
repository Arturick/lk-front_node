<template>
    <div class="md:container md:mx-auto">
        <div class="bg-white rounded-3xl mt-2.5 mx-2.5 p-7 pb-20">
            <div class="">
                <div class="content-title">Лайки на товар / бренд</div>
                <div class="content-desc mt-3.5">Как только выкуп оплачен, он моментально появится в доставках. Дальше
                    мы отслеживаем его статус. "Доставлен" - можно забирать с пункта выдачи. Обновляется в 10:00 МСК.
                </div>
            </div>
            <div class="mt-7">
                <div class="flex items-center gap-4 flex-col md:flex-row">
                    <div class="input-block md:w-2/5">
                        <input type="text" name="name" class="input-block__input p-4"
                            placeholder="Введите ссылку на бренд или товар">
                    </div>
                    <div class="input-block md:w-1/5">
                        <input type="text" name="name" class="input-block__input p-4" placeholder="Количество">
                    </div>
                    <div class="select md:w-1/5">
                        <div class="select__name">Период: В течении 3 дней</div>
                    </div>

                    <div class="flex items-center gap-2 md:w-1/5 h-full">
                        <div class="counter">0 ₽</div>
                        <a href="#" class="but but_1 h-full p-1.5">Добавить</a>
                    </div>
                </div>
            </div>
            <div class="mt-12">
                <div class="positions-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Фото</th>
                                <th>Тип</th>
                                <th>Ссылка</th>
                                <th>Прогресс</th>
                                <th>Дата создания</th>
                                <th>Дата завершения</th>
                                <th>Статус</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><img :src="require(`assets/images/17849231-1.png`)" alt=""></td>
                                <td>Товар</td>
                                <td> https://www.wildberries.ru/brands/minelia</td>
                                <td>5 / 5 </td>
                                <td>5 июля 16:29 </td>
                                <td>5 июля 16:29 </td>
                                <td><span class="status-succses">Завершен</span></td>
                            </tr>
                            <tr>
                                <td><img :src="require(`assets/images/17849231-1.png`)" alt=""></td>
                                <td>Товар</td>
                                <td> https://www.wildberries.ru/brands/minelia</td>
                                <td>5 / 5 </td>
                                <td>5 июля 16:29 </td>
                                <td>5 июля 16:29 </td>
                                <td><span class="status-succses">Завершен</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>