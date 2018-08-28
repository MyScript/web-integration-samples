import Vue from 'vue'
import App from './App2.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import Spinner from 'vue-simple-spinner'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  components: {
    Spinner
  },
  render: h => h(App)
}).$mount('#app')
