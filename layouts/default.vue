<template>
	<v-app >
		<div class="rate-app">
			<TheHeader />
			<Nuxt />
			<TheFooter />
		</div>
	</v-app>
</template>
<script>

  export default {
    components: { },

    middleware: 'auth',
    data() {
      return {

      }
    },
    methods: {

    },
    mounted() {

    },
  }
</script>
