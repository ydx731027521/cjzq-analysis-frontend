import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/home'
import Login from './views/login'
import Version from './views/version'
import BusinInsert from "./views/system_management/busin/insert.vue";

Vue.use(Router)

export default new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/log',
      name: 'login',
      component: Login
    },
    {
      path: '/version',
      name: '版本号',
      component: Version
    },
    // {
    //   path: '/',
    //   name: 'index',
    //   component: Index,
    //   redirect: '/log',
    // },
    // {
    //   path: '*',
    //   redirect: '/log'
    // },
  ]
})