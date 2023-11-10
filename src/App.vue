<template>
  <div id="app">
    
    <div class="container mb-5">
      <h2 class="mb-5 mt-4">Personal costs records</h2>
      <recordsList />
    </div>
    
  </div>
</template>

<script>

import recordsList from './components/recordsList.vue'

export default {
  name: 'App',
  components: {
    recordsList,
  },
}
</script>

<style>
</style>
