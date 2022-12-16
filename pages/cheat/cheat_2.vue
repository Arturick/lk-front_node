<template>
    <div class="md:container md:mx-auto">
        <div class="bg-white rounded-3xl mt-2.5 mx-2.5 p-7 pb-20">
            <div class="">
                <div class="content-title">Вопросы</div>
                <div class="content-desc mt-3.5">Выберете товар или бренд, чтобы добавить конкретные вопросы к нему</div>
            </div>
            <div class="mt-7">
                <div class="flex items-center gap-4 flex-col md:flex-row">
                    <div class="input-block md:w-2/6">
                        <input type="text" name="name" class="input-block__input p-4" placeholder="Введите ссылку на бренд или товар">
                    </div>
                    <div class="input-block md:w-1/5">
                        <input type="text" name="name" class="input-block__input p-4" placeholder="Количество">
                    </div>
                    <div class="select md:w-1/5">
                        <div class="select__name">Период: В течении 3 дней</div>
                    </div>
                    <div class="select md:w-1/5">
                        <div class="select__name">Пол: Неважно</div>
                    </div>
                    <div class="flex items-center gap-2 md:w-1/5 h-full">
                        <div class="counter">0 ₽</div>
                        <a href="#" class="but but_1 h-full p-1.5">Добавить</a>
                    </div>
                </div>
            </div>
            <div class="mt-12">
                <div class="result-empty">ЗДЕСЬ ПОКА НИЧЕГО</div>
            </div>
        </div>
    </div>
</template>