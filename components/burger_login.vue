<template>
    <div class="burger_login">
        <div class="b_iiner">
            <div class="b_close" @click="close_burger">
                <span>&#215;</span>
            </div>
            <div class="nav_burger">
              <a class="nav_el" target="_blank" href="https://rate-this.ru/#kejs">кейс</a>
              <a class="nav_el" target="_blank" href="https://rate-this.ru/#kak-eto-rabotaet">как это работает</a>
              <a class="nav_el" target="_blank" href="https://rate-this.ru/#ceny">цены</a>
              <a class="nav_el" target="_blank" href="https://rate-this.ru/#kontakty">контакты</a>
              <a class="nav_el" href="">блог</a>
              <a class="nav_el" href="">faq</a>
            </div>
        </div>
      </div>
</template>
<script>
export default{
    name: "burger_login",
    props: {},
    data() {
        return{}
    },
    computed: {},
    methods: {
        close_burger(){
            this.$emit('close_burger')
        }
    }
}
</script>
<style scoped>
.burger_login{
  background-color: rgba(0, 0, 0, 0.435);
  width: 100vw;
  height: 100vh;
  position: absolute;
  z-index: 10;
  transition: all 0.3s;
}

.b_iiner{
  background: url(../assets/images/noisesss.gif);
  width: 300px;
  height: 100%;
  transition: all 0.3s;
}

.b_close{
    width: 100%;
    height: auto;
    display: flex;
    justify-content: flex-end;
    padding-right: 1rem;
}

.b_close span{
    font-size: 40px;
    color: white;
    font-weight: 500;
    cursor: pointer;
    display: flex;
    justify-content: center;
}

.nav_burger{
    height: 30%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-content: flex-start;
    padding-left: 1rem;
}

.nav_burger a{
    color: white;
    font-size: 17px;

}

</style>
