<template>
  <div>
    <h2 class="mb-5 mt-4">About</h2>
    <p>current page: {{this.testRoute}}</p>
  </div>
</template>

<script>
export default {
  name: "AboutPage",
  watch: {
    testRoute () {
      this.dataValue = this.$route.params.test + ' ' + this.dataValue;
    }
  },
  computed: {
    testRoute() {
      return this.$route.params.test;
    },
  },
}
</script>

<style scoped>

</style>