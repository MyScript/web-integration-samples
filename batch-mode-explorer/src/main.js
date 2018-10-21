import Vue from 'vue'
import App from './App.vue'
import VueClipboard from 'vue-clipboard2'
import router from './router'
import store from './store/store'
import './plugins/element.js'

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
Vue.use(VueClipboard)

