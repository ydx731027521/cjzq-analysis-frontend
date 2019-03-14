import Vue from 'vue'
import App from './App.vue'
import router from './router'
import {
  store
} from './store/index'
import ElementUI from 'element-ui'
import axios from './axios'
import 'style/element-change.less'
import 'style/global.less'
import {
  constantRouterMap
} from './router/router'
import _ from 'lodash'

import util from 'tools/util'

let echarts = require('echarts')

require("echarts/lib/chart/line");
require("echarts/lib/chart/pie");
require("echarts/lib/chart/lines");
require("echarts/lib/component/legendScroll");
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");

Vue.prototype.$echarts = echarts
Vue.prototype.$lodash = _

Vue.config.productionTip = false

Vue.prototype.$http = axios

Vue.use(ElementUI)

// 保证刷新不丢失路由
util.initRoutes(constantRouterMap, router, store)

let flag = true
router.beforeEach((to, from, next) => {
  let user = util.getSession()
  let routes = JSON.parse(sessionStorage.getItem('routes'))
  // sessionStorage.setItem('path', JSON.stringify(from.path))

  if (to.path != '/log') {
    if (!user) {
      // ElementUI.Message.error('请先登录');
      next('/log')
    }else{
      if(flag){
        router.addRoutes(routes)
        flag = false
        next({...to,replace:true})
      }
      next()
    }
  } else {
    // next({...to,replace:true})
    next()
  }

})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')