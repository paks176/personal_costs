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

    <div class="container pt-3">
      <router-view></router-view>
    </div>

  </div>
</template>

<script>

export default {
  name: 'App',
  components: {},
}
</script>

<style>
</style>
