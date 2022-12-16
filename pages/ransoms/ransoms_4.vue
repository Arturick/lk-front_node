<template>
    <div class="md:container md:mx-auto">
        <div class="bg-white rounded-3xl mt-2.5 mx-2.5 p-7 pb-20">

            <div class=" flex gap-8 items-center">
                <ul class="breadcrumbs">
                    <li class="breadcrumbs__item">
                        <nuxt-link to="/ransoms/ransoms_3" class="but but_3 p-2.5">Назад</nuxt-link>
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
                <div class="progress">
                    <div class="progress__item progress__item_check">
                        <div class="progress__wrap">
                            <div class="progress__num">1</div>
                        </div>
                        <div class="progress__name">Модель работы</div>
                    </div>
                    <div class="progress__item progress__item_check">
                        <div class="progress__wrap">
                            <div class="progress__num">2</div>
                        </div>
                        <div class="progress__name">Добавить выкупы</div>
                    </div>
                    <div class="progress__item progress__item_check">
                        <div class="progress__wrap">
                            <div class="progress__num">3</div>
                        </div>
                        <div class="progress__name">График</div>
                    </div>
                </div>
            </div>
            <div class="mt-12">
                <div class="content-title">Период реализации</div>
            </div>

            <div class="mt-12">
                <div class="flex gap-4 items-center">
                    <div>
                        <div class="input-block">
                            <input type="text" name="name" class="input-block__input input-block__input_w py-4 px-7" placeholder="__.__.____ - __.__.____">
                        </div>
                    </div>
                    <div>
                        <nuxt-link to="/ransoms/ransoms_5" class="but but_1 py-4 px-7">Далее</nuxt-link>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>