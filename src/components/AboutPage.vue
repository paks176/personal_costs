<template>
  <div>
    <h2 class="mb-5 mt-4">About</h2>
    <p>current page: {{this.testRoute}}</p>
    <div class="mb-3">
      <h3>Choose component</h3>
      <label for="red-id" class="d-flex">
        <input type="radio" name="testComponent" v-model="testComponent" id="red-id" value="RedComponent">
        <p class="mb-0 ms-2">Red</p>
      </label>
      
      <label for="blue-id" class="d-flex">
        <input type="radio" name="testComponent" v-model="testComponent" id="blue-id" value="BlueComponent">
        <p class="mb-0 ms-2">Blue</p>
      </label>
      
    </div>
    <div class="d-flex justify-content-between">
      <transition name="fade">
        <component :is="testComponent" @component-message="showComponentMessage"></component>
      </transition>
      
      <div class="border border-info-subtle p-3" id="messagePlace">
        
      </div>
      
    </div>
    
    
  </div>
</template>

<script>
import RedComponent from "@/components/RedComponent.vue";
import BlueComponent from "@/components/BlueComponent.vue";
export default {
  props: {
    color: {
      type: String,
      default: 'green',
    } 
  },
  components: {
    RedComponent,
    BlueComponent
  },
  name: "AboutPage",
  data() {
    return {
      buttonColor: this.$props.color,
      testComponent: null,
    }
  },
  watch: {
    testRoute () {
      this.dataValue = this.$route.params.test + ' ' + this.dataValue;
    }
  },
  computed: {
    messagePlace() {
      return document.querySelector('#messagePlace')
    },
    testRoute() {
      return this.$route.params.test;
    },
  },
  methods: {
    showComponentMessage(message) {
      const layout = `
        <div class="d-flex align-items-center">
            <div class="icon me-2" style="background-color: ${message.icon}"></div>
            <p class="mb-0">${String(message.text)}</p>
        </div>`
      this.messagePlace.insertAdjacentHTML("beforeend", layout);
    }
  }
}
</script>

<style>
#messagePlace {
  max-height: 300px;
  min-height: 300px;
  width: 50%;
  overflow-y: scroll;
}
.icon {
  width: 20px;
  height: 20px;
  border-radius: 50%;
}
.fade-enter-active, .fade-leave-active {
  display: block;
  transition: opacity .3s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>