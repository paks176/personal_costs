<template>
  <div id="app">
    
    <ul class="nav nav-tabs container pt-3">
      <li class="nav-item">
        <router-link class="nav-link" to="/">Start</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/about">About</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/records">Records List</router-link>
      </li>
    </ul>
    
    <div class="toast-container ease-animation"></div>
    <div class="container pt-3">
      <router-view></router-view>
    </div>

  </div>
</template>

<script>
import {mapGetters} from "vuex";
export default {
  name: 'App',
  components: {},
  computed: {
    ...mapGetters(['getErrorsStack']),
  },
  mounted() {

  },
  watch: {
    getErrorsStack() {
      this.$toast.processNew(this.getErrorsStack[0])
    }
  }
}
</script>

<style>
</style>
