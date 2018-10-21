import Vue from 'vue'
import Router from 'vue-router'
import Write from './views/Write.vue'
import BrowseInks from './views/BrowseInks.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/write',
      name: 'write',
      component: Write
    },
    {
      path: '/',
      name: 'browse',
      component: BrowseInks
    }
    
  ]
})
