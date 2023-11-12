<template>
  <div class="mb-5">
    <button @click="makeSort('amount')">Sort by amount</button>
    <button @click="makeSort('category')">Sort by category</button>
  </div>
</template>

<script>
import {mapMutations} from "vuex";

export default {
  name: "listFilters",
  methods: {
    ...mapMutations(['makeSort'])
  }
}
</script>

<style scoped>

</style>