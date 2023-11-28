<template>
  <div class="mb-5">
    <form action="" id="filter-form">
      <div class="d-flex justify-content-between mb-3">

        <div class="d-flex">
          <label for="column_amount" class="me-3">
            <input class="d-none" name="filter-column" type="radio" id="column_amount" value="amount">
            <div class="filter-button">
              Sort by amount
            </div>
          </label>

          <label for="column_category" class="me-3">
            <input class="d-none" name="filter-column" type="radio" id="column_category" value="category">
            <div class="filter-button">
              Sort by category
            </div>
          </label>

          <label for="column_date" class="me-3">
            <input class="d-none" name="filter-column" type="radio" id="column_date" value="date">
            <div class="filter-button">
              Sort by date
            </div>
          </label>
        </div>

        <button class="reset-button" style="" v-if="showResetButton" @click="resetSortingHandler">Reset sorting</button>

      </div>

      <div class="d-flex">
        <span class="me-3 fw-bold">Order:</span>
        <label for="filter-increase" class="d-flex">
          <input type="radio" checked name="filter-order" id="filter-increase" value="increase">
          <span class="ms-1">Increase</span>
        </label>
        <label for="filter-decrease" class="d-flex ms-3">
          <input type="radio" name="filter-order" id="filter-decrease" value="decrease">
          <span class="ms-1">Decrease</span>
        </label>
      </div>

    </form>

  </div>
</template>

<script>
import {mapMutations} from "vuex";
import {mapGetters} from "vuex";

export default {
  name: "listFilters",
  props: {
    showReset: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      showResetButton: this.showReset,
      filtersInputs: {
        columnAmount: null,
        columnCategory: null,
        columnDate: null,
        orderIncrease: null,
        orderDecrease: null,
      }
    }
  },
  methods: {
    ...mapMutations(['makeSort', 'resetSorting']),
    onFormChange() {
      const form = document.querySelector('#filter-form');
      if (form) {
        form.addEventListener('input', () => {
          const filterMap = {
            column: form.querySelector('input[name="filter-column"]:checked')
                ? form.querySelector('input[name="filter-column"]:checked').value
                : 'default',
            order: form.querySelector('input[name="filter-order"]:checked')
                ? form.querySelector('input[name="filter-order"]:checked').value
                : 'increase'
          }
          this.showResetButton = true;
          this.makeSort(filterMap);
        })
      }

    },
    resetSortingHandler(event) {
      event.preventDefault();
      this.showResetButton = false;
      this.resetSorting();

      this.filtersInputs.columnAmount.checked = false;
      this.filtersInputs.columnCategory.checked = false;
      this.filtersInputs.columnDate.checked = false;
      this.filtersInputs.orderIncrease.checked = true;
    },
    applyFilters(filterMap) {
      switch (filterMap.column) {
        case 'amount':
          this.filtersInputs.columnAmount.checked = true;
          break;
        case 'category':
          this.filtersInputs.columnCategory.checked = true;
          break;
        case 'date':
          this.filtersInputs.columnDate.checked = true;
          break;
      }
      switch (filterMap.order) {
        case 'increase':
          this.filtersInputs.orderIncrease.checked = true;
          break;
        case 'decrease':
          this.filtersInputs.orderDecrease.checked = true;
          break;
        default:
          this.filtersInputs.orderIncrease.checked = true;
      }
      this.showResetButton = true;
    }
  },
  computed: {
    ...mapGetters(['getCookieFilterMap']),
  },
  watch: {
    getCookieFilterMap: function (cookieFilter) {
      if (cookieFilter.column !== 'none') {
        this.applyFilters(cookieFilter)
      }
    }
  },
  mounted() {
    this.onFormChange();
    this.filtersInputs.columnAmount = document.querySelector('input[name=filter-column][value=amount]');
    this.filtersInputs.columnCategory = document.querySelector('input[name=filter-column][value=category]');
    this.filtersInputs.columnDate = document.querySelector('input[name=filter-column][value=date]');
    this.filtersInputs.orderIncrease = document.querySelector('input[name=filter-order][value=increase]'); 
    this.filtersInputs.orderDecrease = document.querySelector('input[name=filter-order][value=decrease]');
  },
}
</script>

<style scoped>
label {
  cursor: pointer;
}

.filter-button {
  padding: 6px 12px;
  border-radius: 6px;
  background-color: lightgray;
  font-weight: 500;
  transition: all 0.3s ease-out;
}

.reset-button {
  background-color: orangered;
  border: none;
  transition: all 0.3s ease;
  color: white;
  font-weight: 500;
  padding: 6px 12px;
  border-radius: 6px;
}

label input:checked + .filter-button {
  background-color: rgba(0, 128, 0, 0.99);
  color: white;
}
</style>