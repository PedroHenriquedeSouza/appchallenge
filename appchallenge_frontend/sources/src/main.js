import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import VueRouter from 'vue-router'
import Home from '@/pages/Home'

Vue.config.productionTip = false
Vue.use(VueRouter)

const routes = 
[
  {
    path:'/',
    component:Home,
    meta:{}
  },
  {
    path:'/Home',
    component:Home,
    meta:{}
  }
];

const router = new VueRouter({
  routes,
  mode:'history'
});

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
