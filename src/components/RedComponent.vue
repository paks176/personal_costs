<template>
<div class="red-component"></div>
</template>

<script>
export default {
  name: "RedComponent",
  mounted() {
    this.$emit('component-message', {icon: 'red', text:'Red component is mounted'})
  },
  beforeDestroy() {
    this.$emit('component-message', {icon: 'red', text:'Red component before destroy'})
  },
  destroyed() {
    this.$emit('component-message', {icon: 'red', text:'Red component is destroyed'})
  }
}
</script>

<style scoped>
.red-component {
  background-color: #FA5252;
  width: 300px;
  height: 300px; 
}
</style>