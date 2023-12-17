<template>
  <div>
    <h2 class="mb-5 mt-4">Personal costs records</h2>
    <recordForm @addNewRecord="addNewInTable"/>
    <listFilters :showReset="false"/>
    <table class="w-100">
      <thead>
      <tr>
        <td>Category</td>
        <td>Amount</td>
        <td>Date</td>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in getRecordsFromState" :key="item.id">
        <td class="table-category">{{toCapitalize(item.category)}}</td>
        <td>{{item.amount}} $</td>
        <td class="table-date">{{ item.date }}</td>
      </tr>
      </tbody>

    </table>
  </div>
</template>

<script>

import recordForm from '../components/recordForm.vue';
import listFilters from '../components/listFilters.vue';
import {mapActions, mapGetters, mapMutations} from "vuex";

export default {
  name: "recordsList",
  components: {
    'recordForm': recordForm,
    'listFilters': listFilters,
  },
  data() {
    return {
      filterMap: '',
    }
  },
  methods: {
    ...mapActions(['getRecordsList', 'processFilters']),
    ...mapMutations(['addNewInState']),
    toCapitalize(word) {
      const firstLetter = ([...word][0]).toUpperCase();
      const last = [...word].splice(1).join('');
      return firstLetter + last
    },
    addNewInTable(data) {
      this.addNewInState(data);
    }
  },
  computed: {
    ...mapGetters(['getRecordsFromState']),
    ...mapGetters(['getCookieFilterMap'])
  },
  mounted() {
    this.getRecordsList()
  }
}
</script>

<style scoped>
  table {
    border: 2px solid gray;
  }
  thead td {
    padding: 5px;
    border: 3px solid midnightblue;
    color: white;
    background-color: cornflowerblue;
    font-weight: 500;
    text-align: center;
  }
  tbody td {
    border: 2px solid gray;
    padding: 10px;
  }
  .table-category {
    width: 20%;
  }
</style>