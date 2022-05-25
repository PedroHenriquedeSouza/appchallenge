import Vue from 'vue'
import App from './App.vue'
import VueGeolocationApi from 'vue-geolocation-api'
import vuetify from './plugins/vuetify'
import VueRouter from 'vue-router'
import Home from '@/pages/Home'

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(VueGeolocationApi/*, { ...options } */)

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
