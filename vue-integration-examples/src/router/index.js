import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';
import MyScriptJSVueComponent from '@/components/myscriptjs-vue-component';

Vue.use(Router);

export default new Router({
  routes: [{
    path: '/',
    name: 'HelloWorld',
    component: HelloWorld,
  },
  {
    path: '/myscript-js',
    name: 'MyScriptJSVueComponent',
    component: MyScriptJSVueComponent,
  },
  ],
});
