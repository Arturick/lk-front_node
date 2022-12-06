<template>

  <div class="md:container md:mx-auto">
    <div class="bg-white rounded-3xl mt-2.5 mx-2.5 p-7 pb-20">

      <div class=" flex gap-8 items-center">
        <a href="/" class="but but_3">Назад</a>
        <ul class="breadcrumbs">
          <li class="breadcrumbs__item">
            <a href="/" class="breadcrumbs__link">Главная</a>
          </li>
          <li class="breadcrumbs__item">
            <a href="/" class="breadcrumbs__link">Отчёты</a>
          </li>
          <li class="breadcrumbs__item">
            Отчет о выкупленных товарах
          </li>
        </ul>
      </div>

      <div class="mt-12">
        <div class="content-title">Отчет о выкупленных товарах</div>
      </div>
      <div class="mt-8">
        <div class="input-date  max-w-xs">
          <input type="text" name="name" class="input-date__input" placeholder="__.__.____ - __.__.____">
          <span class="input-date__label">Период</span>
        </div>
      </div>

      <div class="mt-12">
        <div class="content-title content-title_2">Раннее заказанные отчеты</div>
      </div>
      <div class="mt-8 w-3/5">
        <div class="positions-table">
          <table>
            <thead>
            <tr class="h-14">
              <th>Начало периода</th>
              <th>Конец периода</th>
              <th></th>
            </tr>
            </thead>
            <tbody>
            <tr class="h-14">
              <td>05.07.2022</td>
              <td>05.07.2022</td>
              <td class="text-right"><a href="" class="but but_1 w-auto">Заказали</a></td>
            </tr>
            <tr class="h-14">
              <td>05.07.2022</td>
              <td>05.07.2022</td>
              <td class="text-right"><a href="" class="but but_1 w-auto">Заказали</a></td>
            </tr>
            <tr class="h-14">
              <td>05.07.2022</td>
              <td>05.07.2022</td>
              <td class="text-right"><a href="" class="but but_1 w-auto">Заказали</a></td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>


<style>
</style>
