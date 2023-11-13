<template>
  <div class="mb-5">
    <form action="" id="filter-form">
      <div class="d-flex mb-3">
        
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

export default {
  name: "listFilters",
  methods: {
    ...mapMutations(['makeSort']),
    onFormChange() {
      const form = document.querySelector('#filter-form');
      if (form) {
        form.addEventListener('input', () => {
          const filterMap = {
            column: form.querySelector('input[name="filter-column"]:checked') 
                ? form.querySelector('input[name="filter-column"]:checked').value 
                : 'default',
            order : form.querySelector('input[name="filter-order"]:checked') 
                ? form.querySelector('input[name="filter-order"]:checked').value 
                : 'increase'
          }
          this.makeSort(filterMap)
        })
      }

    }
  },
  mounted() {
    this.onFormChange();
  }
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
    
    transition: all 0.3s ease-out;
  }
  label input:checked + .filter-button {
    background-color: rgba(0, 128, 0, 0.99);
    color: white;
  }
</style>