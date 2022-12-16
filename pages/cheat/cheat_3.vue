<template>
    <div class="md:container md:mx-auto">
        <div class="bg-white rounded-3xl mt-2.5 mx-2.5 p-7 pb-20">
            <div class="">
                <div class="content-title">Вопросы</div>
                <div class="content-desc mt-3.5">Выберете товар или бренд, чтобы добавить конкретные вопросы к нему
                </div>
            </div>
            <div class="mt-7">
                <div class="flex items-center gap-4 flex-col md:flex-row">
                    <div class="input-block md:w-2/6">
                        <input type="text" name="name" class="input-block__input p-2.5" placeholder="Артикул">
                    </div>
                    <div class="input-block md:w-1/5">
                        <input type="text" name="name" class="input-block__input p-2.5" placeholder="Количество">
                    </div>
                    <div class="select md:w-1/5">
                        <div class="select__name">Сортировка: По дате</div>
                    </div>
                    <div class="flex items-center gap-2 md:w-1/5 h-full">
                        <div class="counter">8 ₽ / шт.</div>
                        <a href="#" class="but but_1 h-full p-1.5">Добавить</a>
                    </div>
                </div>
            </div>
            <div class="mt-12">
                <div class="result-empty">ЗДЕСЬ ПОКА НИЧЕГО</div>
            </div>
            <div class="mt-12">
                <div class="md:grid md:grid-cols-2 md:gap-20 flex flex-wrap gap-4">

                    <div class="like-item">
                        <div class="flex items-center gap-4">
                            <img :src="require(`assets/images/men_empty.png`)" alt="" class="like-item__img">
                            <div class="">
                                <div class="flex items-center gap-4">
                                    <div class="like-item__name">Демьян</div>
                                    <div class="like-item__date">30 июня, 10:33</div>
                                </div>
                                <div class="flex items-center mt-1.5 gap-1.5">
                                    <span class="star star_t"></span>
                                    <span class="star star_t"></span>
                                    <span class="star star_t"></span>
                                    <span class="star"></span>
                                    <span class="star"></span>
                                </div>
                            </div>
                        </div>
                        <div class="mt-4 like-item__content">
                            Классная, стильная, удобная. Очень приятная к телу, качество отличное! В реале выглядит даже
                            лучше и ярче, чем на фото. Заказывала лавандовый/жёлтый - нежный, приятный цвет. Рекомендую!
                            Спасибо! Отдельно спасибо за презент продавца :)
                        </div>
                        <div class="mt-6 flex items-center justify-between flex-col md:flex-row">
                            <div class="flex items-center gap-1.5">
                                <div class="like-item__label">👍 Лайков:</div>
                                <div class="switcher">
                                    <a href="" class="switcher__but">-</a>
                                    <span class="switcher__value">10</span>
                                    <a href="" class="switcher__but">+</a>
                                </div>
                            </div>
                            <div class="flex items-center gap-1.5">
                                <div class="like-item__label">👎 Дизлайков:</div>
                                <div class="switcher">
                                    <a href="" class="switcher__but">-</a>
                                    <span class="switcher__value">0</span>
                                    <a href="" class="switcher__but">+</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="like-item">
                        <div class="flex items-center gap-4">
                            <img :src="require(`assets/images/men_empty.png`)" alt="" class="like-item__img">
                            <div class="">
                                <div class="flex items-center gap-4">
                                    <div class="like-item__name">Демьян</div>
                                    <div class="like-item__date">30 июня, 10:33</div>
                                </div>
                                <div class="flex items-center mt-1.5 gap-1.5">
                                    <span class="star star_t"></span>
                                    <span class="star star_t"></span>
                                    <span class="star star_t"></span>
                                    <span class="star"></span>
                                    <span class="star"></span>
                                </div>
                            </div>
                        </div>
                        <div class="mt-4 like-item__content">
                            Классная, стильная, удобная. Очень приятная к телу, качество отличное! В реале выглядит даже
                            лучше и ярче, чем на фото. Заказывала лавандовый/жёлтый - нежный, приятный цвет. Рекомендую!
                            Спасибо! Отдельно спасибо за презент продавца :)
                        </div>
                        <div class="mt-6 flex items-center justify-between flex-col md:flex-row">
                            <div class="flex items-center gap-1.5">
                                <div class="like-item__label">👍 Лайков:</div>
                                <div class="switcher">
                                    <a href="" class="switcher__but">-</a>
                                    <span class="switcher__value">10</span>
                                    <a href="" class="switcher__but">+</a>
                                </div>
                            </div>
                            <div class="flex items-center gap-1.5">
                                <div class="like-item__label">👎 Дизлайков:</div>
                                <div class="switcher">
                                    <a href="" class="switcher__but">-</a>
                                    <span class="switcher__value">0</span>
                                    <a href="" class="switcher__but">+</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="like-item">
                        <div class="flex items-center gap-4">
                            <img :src="require(`assets/images/men_empty.png`)" alt="" class="like-item__img">
                            <div class="">
                                <div class="flex items-center gap-4">
                                    <div class="like-item__name">Демьян</div>
                                    <div class="like-item__date">30 июня, 10:33</div>
                                </div>
                                <div class="flex items-center mt-1.5 gap-1.5">
                                    <span class="star star_t"></span>
                                    <span class="star star_t"></span>
                                    <span class="star star_t"></span>
                                    <span class="star"></span>
                                    <span class="star"></span>
                                </div>
                            </div>
                        </div>
                        <div class="mt-4 like-item__content">
                            Классная, стильная, удобная. Очень приятная к телу, качество отличное! В реале выглядит даже
                            лучше и ярче, чем на фото. Заказывала лавандовый/жёлтый - нежный, приятный цвет. Рекомендую!
                            Спасибо! Отдельно спасибо за презент продавца :)
                        </div>
                        <div class="mt-6 flex items-center justify-between flex-col md:flex-row">
                            <div class="flex items-center gap-1.5">
                                <div class="like-item__label">👍 Лайков:</div>
                                <div class="switcher">
                                    <a href="" class="switcher__but">-</a>
                                    <span class="switcher__value">10</span>
                                    <a href="" class="switcher__but">+</a>
                                </div>
                            </div>
                            <div class="flex items-center gap-1.5">
                                <div class="like-item__label">👎 Дизлайков:</div>
                                <div class="switcher">
                                    <a href="" class="switcher__but">-</a>
                                    <span class="switcher__value">0</span>
                                    <a href="" class="switcher__but">+</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="like-item">
                        <div class="flex items-center gap-4">
                            <img :src="require(`assets/images/men_empty.png`)" alt="" class="like-item__img">
                            <div class="">
                                <div class="flex items-center gap-4">
                                    <div class="like-item__name">Демьян</div>
                                    <div class="like-item__date">30 июня, 10:33</div>
                                </div>
                                <div class="flex items-center mt-1.5 gap-1.5">
                                    <span class="star star_t"></span>
                                    <span class="star star_t"></span>
                                    <span class="star star_t"></span>
                                    <span class="star star_t"></span>
                                    <span class="star star_t"></span>
                                </div>
                            </div>
                        </div>
                        <div class="mt-4 like-item__content">
                            Классная, стильная, удобная. Очень приятная к телу, качество отличное! В реале выглядит даже
                            лучше и ярче, чем на фото. Заказывала лавандовый/жёлтый - нежный, приятный цвет. Рекомендую!
                            Спасибо! Отдельно спасибо за презент продавца :)
                        </div>
                        <div class="mt-6 flex items-center justify-between flex-col md:flex-row">
                            <div class="flex items-center gap-1.5">
                                <div class="like-item__label">👍 Лайков:</div>
                                <div class="switcher">
                                    <a href="" class="switcher__but">-</a>
                                    <span class="switcher__value">10</span>
                                    <a href="" class="switcher__but">+</a>
                                </div>
                            </div>
                            <div class="flex items-center gap-1.5">
                                <div class="like-item__label">👎 Дизлайков:</div>
                                <div class="switcher">
                                    <a href="" class="switcher__but">-</a>
                                    <span class="switcher__value">0</span>
                                    <a href="" class="switcher__but">+</a>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>