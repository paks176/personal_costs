<template>
<div>
  <button class="btn btn-primary mb-4" data-bs-toggle="modal" data-bs-target="#addRecordModal">Add new record</button>

  <div class="modal fade" id="addRecordModal" data-bs-keyboard="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <p>Add new</p>
          <button type="button" class="btn btn-close" data-bs-dismiss="modal" aria-label="Close">
          </button>
        </div>
        <div class="modal-body">
          <form>
            <div class="mb-2 d-flex justify-content-between">
              <p>Category</p>
              <input type="text" v-model="form.formCategory" id="form-category">
            </div>
            <div class="mb-2 d-flex justify-content-between">
              <p>Amount</p>
              <input type="text" v-model.number="form.formAmount" id="form-amount">
            </div>
            <button class="btn btn-danger" @click="addNewRecord">Create</button>
          </form>
          <div class="form-warning" v-show="showWarning">Please, fill the "{{emptyField}}" filed</div>
        </div>
      </div>
    </div>
  </div>
  
</div>
</template>

<script>

import {Modal} from 'bootstrap';

export default {
  name: "recordForm",
  data() {
    return {
      form: {
        formCategory: '',
        formAmount: '',
      },
      formModal: '',
      showWarning: false,
      emptyField: '',
      modalIsShown: '',
    }
  },
  computed: {
      currentDate() {
        let date = new Date();
        return date.getUTCDate() 
            + '.' + date.getUTCMonth() 
            + '.' + date.getUTCFullYear();
      },
    },
  methods: {
    addNewRecord(event) {
      event.preventDefault();
      const formData = {
        date: this.currentDate,
        category: this.form.formCategory,
        amount: this.form.formAmount
      };
      console.log(formData.category)
      console.log(formData.amount)
      if (formData.category === '' || formData.amount === '') {
        if (formData.category === '') {
            this.inputCategory.classList.add('warning');
            this.showWarning = true;
        }
        if (formData.amount === '') {
          this.inputAmount.classList.add('warning');
          this.showWarning = true;
        }
      } else {
        this.inputCategory.classList.remove('warning');
        this.inputAmount.classList.remove('warning');
        this.showWarning = false;
        this.$emit('addNewRecord', formData);
        this.formModal.hide();
      }
    },
  },
  mounted() {
    this.inputCategory = document.querySelector('#form-category');
    this.inputAmount = document.querySelector('#form-amount');
    this.formModal = Modal.getOrCreateInstance(document.getElementById('addRecordModal'));
    this.modalIsShown = this.formModal._isShown;
    if (this.modalIsShown === false) {
      this.inputCategory.classList.remove('warning');
      this.inputAmount.classList.remove('warning');
      this.showWarning = false;
    }
  }
}
</script>

<style scoped>
  input {
    transition: all 0.3s ease;
  }
  input.warning {
    outline: 4px solid rgba(139, 0, 0, 0.99);
  }
</style>