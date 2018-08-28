import Vue from 'vue'
import Router from 'vue-router'
import ExportsDisplay from './views/ExportsDisplay.vue'
import Convert from './views/Convert.vue'
import Write from './views/Write.vue'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'write',
      component: Write
    },
    {
      path: '/convert',
      name: 'convert',
      component: Convert
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      //component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/export',
      name: 'exportsDisplay',
      component: ExportsDisplay
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      //component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
