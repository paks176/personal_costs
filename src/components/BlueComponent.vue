<template>
  <div class="blue-component"></div>
</template>

<script>
export default {
  name: "BlueComponent",
  mounted() {
    this.$emit('component-message', {icon: 'blue', text:'Blue component is mounted'})
  },
  beforeDestroy() {
    this.$emit('component-message', {icon: 'blue', text:'Blue component before destroy'})
  },
  destroyed() {
    this.$emit('component-message', {icon: 'blue', text:'Blue component is destroyed'})
  }
}
</script>

<style scoped>
.blue-component {
  background-color: #4C6EF5;
  width: 300px;
  height: 300px;
}
</style>