<template>
<div>
  <button class="btn btn-primary mb-5" data-bs-toggle="modal" data-bs-target="#addRecordModal">Add new record</button>

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
              <input type="text" v-model="form.formCategory">
            </div>
            <div class="mb-2 d-flex justify-content-between">
              <p>Amount</p>
              <input type="text" v-model.number="form.formAmount">
            </div>
            <button class="btn btn-danger" @click="addNewRecord">Create</button>
          </form>
        </div>
      </div>
    </div>
  </div>
  
</div>
</template>

<script>
export default {
  name: "recordForm",
  data() {
    return {
      form: {
        formCategory: '',
        formAmount: '',
      },
      
    }
  },
  computed: {
      currentDate() {
        let date = new Date();
        return date.getUTCDate() 
            + '.' + date.getUTCMonth() 
            + '.' + date.getUTCFullYear();
      }
    },
  methods: {
    addNewRecord(event) {
      event.preventDefault();
      const formData = {
        date: this.currentDate,
        category: this.form.formCategory,
        amount: this.form.formAmount
      };
      this.$emit('addNewRecord', formData);
    }
  }
}
</script>

<style scoped>

</style>