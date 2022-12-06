<template>
	<div>
      <div class="notices">
          <div class="notices__group notices__group_1">
              <div class="content-title">Уведомления</div>
          </div>
          <div class="notices__group notices__group_2">
              
          </div>
          <div class="notices__group">
              <a href="" class="content-link-all">Все новости</a>
          </div>
      </div>
	</div>
</template>

<script>
	export default {
	  name: 'Notices',
	  components: {  },
	  data() {
	    return {

	    }
	  },
	}
</script>

<style scoped>
	/* notices  */
	.notices {

	}
	.notices__group {
	  margin-top: 30px;
	}
	.notices__group:first-child {
	  margin-top: 0px;
	}

	.notices__group.notices__group_1 {

	}
	.notices__group.notices__group_2 {
	  height: 400px;
	  overflow-x: hidden;
	  padding-right: 15px;
	  position: relative;
	}

	.notices__group.notices__group_2:after {
	  content: '';
	  width: 100%;
	  height: 50px;
	  left: 0px;
	  bottom: 0px;
	  position: sticky;
	  display: block;

	  /* Permalink - use to edit and share this gradient: https://colorzilla.com/gradient-editor/#ffffff+0,ffffff+100&0+0,1+100 */
	  background: -moz-linear-gradient(top,  rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%); /* FF3.6-15 */
	  background: -webkit-linear-gradient(top,  rgba(255,255,255,0) 0%,rgba(255,255,255,1) 100%); /* Chrome10-25,Safari5.1-6 */
	  background: linear-gradient(to bottom,  rgba(255,255,255,0) 0%,rgba(255,255,255,1) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
	  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00ffffff', endColorstr='#ffffff',GradientType=0 ); /* IE6-9 */
	}

	/* notices end */

	/* notice  */
	.notice {
	  margin-top: 30px;
	}
	.notice:first-child {
	  margin-top: 0px;
	}
	.notice__group {

	}
	.notice__group.notice__group_1 {
	  display: flex;
	  justify-content: space-between;
	}
	.notice__group.notice__group_2 {
	  margin-top: 10px;
	}
	.notice__title {
	  font-family: 'Montserrat';
	  font-style: normal;
	  font-weight: 700;
	  font-size: 15px;
	  line-height: 18px;
	  color: #000000;

	}
	.notice__date {
	  font-family: 'Montserrat';
	  font-style: normal;
	  font-weight: 500;
	  font-size: 13px;
	  line-height: 16px;
	  color: #76767D;
	}
	.notice__info {

	}
	.notice__line {
	  font-family: 'Montserrat';
	  font-style: normal;
	  font-weight: 400;
	  font-size: 14px;
	  color: #000000;
	}
	.notice__link {
	  font-family: 'Montserrat';
	  font-style: normal;
	  font-weight: 600;
	  font-size: 14px;
	  color: #94DCCE;
	}
	/* notice end */
</style>
