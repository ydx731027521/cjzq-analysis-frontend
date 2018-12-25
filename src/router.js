import Vue from 'vue'
import Router from 'vue-router'
import Index from './views'
import Login from './views/login'
import EssantialManagement from './views/config_management/index.vue'
import QualityManagement from './views/quality_management/index.vue'
import Config from './views/config_management/essantial_config.vue'
import Standard from './views/config_management/standard_config/check_standard.vue'
import StandardInsert from './views/config_management/standard_config/insert.vue'
import StandardDetail from './views/config_management/standard_config/detail.vue'
import Cycle from './views/config_management/cycle_config.vue'
import Version from './views/version'
import ConventionManage from './views/quality_management/convention/manage.vue'
import ConventionDetail from './views/quality_management/convention/detail.vue'
import DefectiveProcess from './views/quality_management/defective_process/defective.vue'
import DefectiveDetail from './views/quality_management/defective_process/detail.vue'
import RecheckManage from './views/quality_management/recheck_manage/index.vue'
import RecheckRecord from './views/quality_management/recheck_record/index.vue'
import SpotCheck from './views/spot_check/index.vue'
import SpotCheckConvention from './views/spot_check/convention.vue'


Vue.use(Router)

export default new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/log',
      name: 'login',
      component: Login
    },
    {
      path: '/version',
      name: '版本号',
      component: Version
    },
    {
      path: '/',
      name: 'index',
      component: Index,
      redirect: '/log',
      children: [
        {
          path: 'essantial',
          name: '配置管理',
          redirect: '/essantial/config',
          // component: () => import(/* webpackChunkName: "essantial" */ './views/config_management/index.vue'),
          component: EssantialManagement,
          children: [
            {
              path: 'config',
              name: '要件配置',
              component: Config
            },
            {
              path: 'standard',
              name: '质检标准配置',
              component: Standard,
            },
            {
              path: 'cycle',
              name: '周期配置',
              component: Cycle
            },
            {
              path: 'insert',
              name: '新增质检标准',
              component: StandardInsert
            },
            {
              path: 'detail',
              name: '质检标准详情',
              component: StandardDetail
            },
          ]
        },
        {
          path: 'quality',
          name: '质控管理',
          redirect: '/quality/manage',
          component: QualityManagement,
          children: [
            {
              path: 'manage',
              name: '批次管理',
              component: ConventionManage
            },
            {
              path: 'conventiondetail',
              name: '批次详情',
              component: ConventionDetail
            },
            {
              path: 'defective',
              name: '次品处理',
              component: DefectiveProcess
            },
            {
              path: 'defectivedetail',
              name: '次品详情',
              component: DefectiveDetail
            },
            {
              path: 'recheckmanage',
              name: '复检管理',
              component: RecheckManage
            },
            {
              path: 'recheckrecord',
              name: '复检记录',
              component: RecheckRecord
            }
          ]
        },
        {
          path: 'spotcheck',
          name: '抽检管理',
          component: SpotCheck,
          redirect: '/spotcheck/convention',
          children: [
            {
              path: 'convention',
              name: '抽检批次',
              component: SpotCheckConvention
            }
          ]
        }
      ]
    }
  ]
})
