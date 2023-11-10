import Vue from 'vue'
import App from './App.vue'
// импортирем стор из папки
import Store from './store/store'
// installing Bootstrap
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
//import custom styles
// require('@/assets/styles/custom.scss')

new Vue({
  store: Store,
  render: h => h(App),
}).$mount('#app')