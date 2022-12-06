<template>
  <div>{{sendNotf()}}</div>
</template>

<script>
  export default {
    components: { },
    data() {
      return {

      }
    },
    methods: {
      sendNotf() {
        this.$store.dispatch('request/get_notification', {}).then((x) => {
            console.log(x);
        })
        setTimeout(sendNotf(), 60*1000)
      },

    },
  }
</script>
