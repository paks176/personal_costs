import Vue from 'vue'
import App from './App.vue'
// импортирем стор из папки
import Store from './store/store'
import router from './router/index'
// installing Bootstrap
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
//import custom styles
require('@/assets/styles/custom.scss')

// plugins
import Toast from './plugins/toasts';
Vue.use(Toast)

new Vue({
  store: Store,
  router,
  render: h => h(App),
}).$mount('#app')