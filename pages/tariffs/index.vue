<template>
    <div class="md:container md:mx-auto">
        <div class="bg-white rounded-3xl mt-2.5 mx-2.5 p-7 pb-20">
            <div class="tar_title">Тарифы</div>
            <div class="tar_sup">Выгодные предложения для продвижения бизнеса</div>
            <div class="v_title">Выкупы</div>
            <div class="v_cards">
                <div class="card_1">
                    <div class="c1_title">1 шт.</div>
                    <div class="c1_sup">75 ₽ / за выкуп товара</div>
                    <div class="c1_prices">
                        <div class="c1_price">75₽</div>
                        <div class="c1_pr">100₽</div>
                    </div>
                    <button class="btn_l2_add">Заказать</button>
                </div>
                <div class="card_2">
                    <div class="c1_title">100 шт.</div>
                    <div class="c1_sup">70 ₽ / за выкуп товара</div>
                    <div class="c1_prices">
                        <div class="c1_price">6000₽</div>
                        <div class="c1_pr">7500₽</div>
                    </div>
                    <button class="btn_l2_add">Заказать</button>
                </div>
                <div class="card_3">
                    <div class="c1_title">500 шт.</div>
                    <div class="c1_sup">50 ₽ / за выкуп товара</div>
                    <div class="c1_prices">
                        <div class="c1_price">25 000₽</div>
                        <div class="c1_pr">37 500₽</div>
                    </div>
                    <button class="btn_l2_add">Заказать</button>
                </div>
                <div class="card_4">
                    <div class="c1_title">1000 шт.</div>
                    <div class="c1_sup">35 ₽ / за выкуп товара</div>
                    <div class="c1_prices">
                        <div class="c1_price">35 000₽</div>
                        <div class="c1_pr">75 000₽</div>
                    </div>
                    <button class="btn_l2_add">Заказать</button>
                </div>
                <div class="card_5">
                    <div class="c1_title">5000 шт.</div>
                    <div class="c1_sup">25 ₽ / за выкуп товара</div>
                    <div class="c1_prices">
                        <div class="c1_price">125 000₽</div>
                        <div class="c1_pr">375 000₽</div>
                    </div>
                    <button class="btn_l2_add">Заказать</button>
                </div>
            </div>
            <div class="fb_title">Отзывы</div>
            <div class="v_cards">
                <div class="card_1">
                    <div class="c1_title">1 шт.</div>
                    <div class="c1_sup">75 ₽ / за выкуп товара</div>
                    <div class="c1_prices">
                        <div class="c1_price">75₽</div>
                        <div class="c1_pr">100₽</div>
                    </div>
                    <button class="btn_l2_add">Заказать</button>
                </div>
                <div class="card_2">
                    <div class="c1_title">100 шт.</div>
                    <div class="c1_sup">70 ₽ / за выкуп товара</div>
                    <div class="c1_prices">
                        <div class="c1_price">6000₽</div>
                        <div class="c1_pr">7500₽</div>
                    </div>
                    <button class="btn_l2_add">Заказать</button>
                </div>
                <div class="card_3">
                    <div class="c1_title">500 шт.</div>
                    <div class="c1_sup">50 ₽ / за выкуп товара</div>
                    <div class="c1_prices">
                        <div class="c1_price">25 000₽</div>
                        <div class="c1_pr">37 500₽</div>
                    </div>
                    <button class="btn_l2_add">Заказать</button>
                </div>
                <div class="card_4">
                    <div class="c1_title">1000 шт.</div>
                    <div class="c1_sup">35 ₽ / за выкуп товара</div>
                    <div class="c1_prices">
                        <div class="c1_price">35 000₽</div>
                        <div class="c1_pr">75 000₽</div>
                    </div>
                    <button class="btn_l2_add">Заказать</button>
                </div>
                <div class="card_5">
                    <div class="c1_title">5000 шт.</div>
                    <div class="c1_sup">25 ₽ / за выкуп товара</div>
                    <div class="c1_prices">
                        <div class="c1_price">125 000₽</div>
                        <div class="c1_pr">375 000₽</div>
                    </div>
                    <button class="btn_l2_add">Заказать</button>
                </div>
            </div>
            <div class="cus_tar">Свой собственный тариф</div>
            <div class="calc_tar" style="display: flex">
                <div style="text-align: center">
                  <Switcher v-model="selfTarif.count"  :min="1"  minMsg="Минимум 1 выкуп" style="width: 180px;font-size: 23px;"/>
                  <span style="font-size: 18px; font-weight: bold; margin-top: 15px; color: rgba(0,0,0,0.59)">Выкупы</span>
                </div>
                  <span>x 35₽&nbsp;+</span>
              <div style="text-align: center">
                <Switcher v-model="selfTarif.rcount"  :max="selfTarif.count"  maxMsg="Кол-во отзывов не должно превышть кол-во выкупов" style="width: 180px;font-size: 23px;"/>
                <span style="font-size: 18px; font-weight: bold; margin-top: 15px; color: rgba(0,0,0,0.59)">Отзывы</span>
              </div>
              <span>x 70₽ = {{(+selfTarif.count * 35) + (+selfTarif.rcount * 70)}} ₽</span>
                <button class="btn_l2_add" @click="orderSelfTarif">Заказать</button>
            </div>
            <div class="for_pass">Свой собственный тариф «под ключ»</div>
            <p class="pass_sup">Тариф «под ключ» дороже на фиксированую стоимость к каждому выкупу. За эту стоимость ваш личный<br> менджер сам составит план продвижения, выкупит товары, мы заберем их с пунктов выдачи, отгрузим товары<br> вам, напишем и опубликуем отзывы. Посчитайте, тариф может окупиться у вас уже на этапе просчета логистики.
            </p>
            <div class="pass_culc">
                ( <input type="text" placeholder="Количество выкупов"> x 0 ₽ + 65₽ ) + <input type="text" placeholder="Количество отзывов"> x 0₽  =  0₽
                <button class="btn_l2_add">Заказать</button>
            </div>
            <div class="count_title">Количество апгрейдов «под ключ»</div>
            <p class="count_sup">Если вы уже оплатили пакет выкупов, но решили избавиться от рутины и делегировать ее нам, вы можете<br> оплатить апгрейд «под ключ» и мы сделаем все сами
            </p>
            <div class="count_calc">
                <input type="text" placeholder="Количество выкупов">  0 ₽
                <button class="btn_l2_add">Заказать</button>
            </div>
        </div>
    </div>
</template>
<script>
  export default {
    comments : {},
    data(){
      return {
          selfTarif: {
            count: 1,
            rcount: 0
          }
      }
    },
    methods: {
      orderSelfTarif(){
        if(this.selfTarif.count < 1 || this.selfTarif.rcount > this.selfTarif.count){
          if(this.selfTarif.count < 1){
            this.selfTarif.count = 1;
            this.$toast.warning('для оформления заявки необходим хотябы 1 выкуп');
          }
          if(this.selfTarif.rcount > this.selfTarif.count){
            this.selfTarif.rcount =  this.selfTarif.count;
            this.$toast.warning('отзывов должно быть не больше выкупов');
          }

          return 0
        }

        this.$toast.success('Заявка успешно отправленна, менеджер в ближайшее время с вами свяжется');
      }
    },
    mounted() {
    }
  }
</script>
