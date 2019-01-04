
import Index from '../views'
import EssantialManagement from '../views/config_management/index.vue'
import QualityManagement from '../views/quality_management/index.vue'
import Config from '../views/config_management/essantial_config.vue'
import Standard from '../views/config_management/standard_config/check_standard.vue'
import StandardInsert from '../views/config_management/standard_config/insert.vue'
import StandardDetail from '../views/config_management/standard_config/detail.vue'
import Cycle from '../views/config_management/cycle_config.vue'
import Version from '../views/version'
import ConventionManage from '../views/quality_management/convention/manage.vue'
import ConventionDetail from '../views/quality_management/convention/detail.vue'
import DefectiveProcess from '../views/quality_management/defective_process/defective.vue'
import SpecialDefectiveProcess from '../views/quality_management/special_defective_process/index.vue'
import DefectiveDetail from '../views/quality_management/defective_process/detail.vue'
import RecheckManage from '../views/quality_management/recheck_manage/index.vue'
import RecheckRecord from '../views/quality_management/recheck_record/index.vue'
import RecheckRecordDetail from '../views/quality_management/recheck_record/recheck_detail.vue'
import SpotCheck from '../views/spot_check/index.vue'
import SpotCheckConvention from '../views/spot_check/convention.vue'
import SpotCheckDetail from '../views/spot_check/detail.vue'
import StatisticalQuery from '../views/statistical_query/index.vue'
import InspectionAnalysis from '../views/statistical_query/inspection_analysis/index.vue'
import DefectiveQuery from '../views/statistical_query/defective_query/index.vue'
import defectiveStatistics from '../views/statistical_query/defective_statistics/index.vue'

// EXAMINE_MANAGE("质检标准审核"),
// PERIODIC_CONFIGURATION("周期配置"),
// BATCH_MANAGEMENT("批次管理"),
// DEFECTIVE_MANAGEMENT("次品处理"),
// REINSPECTION_MANAGEMENT("复检管理"),
// SPOTCHECK_MANAGEMENT("抽检管理");

export const constantRouterMap = [
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
        // component: () => import(/* webpackChunkName: "essantial" */ '../views/config_management/index.vue'),
        component: EssantialManagement,
        meta: {
          roles: ['EXAMINE_MANAGE', 'PERIODIC_CONFIGURATION', 'BATCH_MANAGEMENT', 'DEFECTIVE_MANAGEMENT', 'REINSPECTION_MANAGEMENT', 'SPOTCHECK_MANAGEMENT'],
          name: 'essantialManagement'
        },
        children: [
          {
            path: 'config',
            name: '要件配置',
            meta: {
              roles: ['EXAMINE_MANAGE', 'PERIODIC_CONFIGURATION', 'BATCH_MANAGEMENT', 'DEFECTIVE_MANAGEMENT', 'REINSPECTION_MANAGEMENT', 'SPOTCHECK_MANAGEMENT'],
              icon: 'el-icon-star-on'
            },
            component: Config
          },
          {
            path: 'standard',
            name: '质检标准配置',
            meta: {
              roles: ['EXAMINE_MANAGE'],
              icon: 'el-icon-rank'
            },
            component: Standard,
          },
          {
            path: 'cycle',
            name: '周期配置',
            meta: {
              roles: ['EXAMINE_MANAGE', 'PERIODIC_CONFIGURATION'],
              icon: 'el-icon-time'
            },
            component: Cycle
          },
          {
            path: 'insert',
            name: '新增质检标准',
            meta: {
              roles: ['PERIODIC_CONFIGURATION']
            },
            component: StandardInsert
          },
          {
            path: 'detail',
            name: '质检标准详情',
            meta: {
              roles: ['EXAMINE_MANAGE']
            },
            component: StandardDetail
          },
        ]
      },
      {
        path: 'quality',
        name: '质控管理',
        redirect: '/quality/manage',
        meta: {
          roles: ['BATCH_MANAGEMENT', 'DEFECTIVE_MANAGEMENT', 'REINSPECTION_MANAGEMENT'],
          name: 'qualityManagement'
        },
        component: QualityManagement,
        children: [
          {
            path: 'manage',
            name: '批次管理',
            meta: {
              roles: ['BATCH_MANAGEMENT'],
              icon: 'iconfont icon-pici',
              keepAlive: true
            },
            component: ConventionManage
          },
          {
            path: 'conventiondetail/:id',
            name: '批次管理详情',
            meta: {
              roles: ['BATCH_MANAGEMENT']
            },
            component: ConventionDetail
          },
          {
            path: 'defective',
            name: '次品处理',
            meta: {
              roles: ['DEFECTIVE_MANAGEMENT'],
              icon: 'iconfont icon-chuli1',
              keepAlive: true
            },
            component: DefectiveProcess
          },
          {
            path: 'specialdefective',
            name: '特殊次品处理',
            meta: {
              roles: ['DEFECTIVE_MANAGEMENT'],
              icon: 'iconfont icon-teshu',
              keepAlive: true
            },
            component: SpecialDefectiveProcess
          },
          {
            path: 'defectivedetail/:qcBatchId',
            name: '次品详情',
            component: DefectiveDetail
          },
          {
            path: 'recheckmanage',
            name: '复检管理',
            meta: {
              roles: ['REINSPECTION_MANAGEMENT'],
              icon: 'iconfont icon-chuli',
              keepAlive: true
            },
            component: RecheckManage
          },
          {
            path: 'recheckrecord',
            name: '复检记录',
            meta: {
              roles: ['DEFECTIVE_MANAGEMENT', 'REINSPECTION_MANAGEMENT'],
              icon: 'iconfont icon-jilu1',
              keepAlive: true
            },
            component: RecheckRecord,
          },
          {
            path: 'recheckdetail/:qcBatchId/:originalQcBatchId',
            name: '复检详情',
            meta: {
              roles: ['DEFECTIVE_MANAGEMENT', 'REINSPECTION_MANAGEMENT']
            },
            component: RecheckRecordDetail,
          },
        ]
      },
      {
        path: 'spotcheck',
        name: '抽检管理',
        component: SpotCheck,
        meta: {
          roles: ['SPOTCHECK_MANAGEMENT'],
          name: 'spotCheckManagement'
        },
        redirect: '/spotcheck/convention',
        children: [
          {
            path: 'spotdetail/:id',
            name: '抽检详情',
            meta: {
              roles: ['SPOTCHECK_MANAGEMENT'],
            },
            component: SpotCheckDetail
          },
          {
            path: 'convention',
            name: '抽检批次',
            meta: {
              roles: ['SPOTCHECK_MANAGEMENT'],
              icon: 'iconfont icon-kaoshijieguochoucha',
              keepAlive: true
            },
            component: SpotCheckConvention
          },
        ]
      },
      {
        path: 'statisticalquery',
        name: '统计查询',
        redirect: '/statisticalquery/analysis',
        component: StatisticalQuery,
        meta: {
          roles: ['BATCH_MANAGEMENT', 'DEFECTIVE_MANAGEMENT', 'REINSPECTION_MANAGEMENT'],
          name: 'statisticalQuery'
        },
        children:[
          {
            path: 'analysis',
            name: '质检分析',
            meta: {
              roles: ['SPOTCHECK_MANAGEMENT'],
              icon: 'iconfont icon-fenxi',
            },
            component: InspectionAnalysis
          },
          {
            path: 'defectivequery',
            name: '次品查询',
            meta: {
              roles: ['SPOTCHECK_MANAGEMENT'],
              icon: 'iconfont icon-chaxun',
            },
            component: DefectiveQuery
          },
          {
            path: 'defectivestatistics',
            name: '次品统计',
            meta: {
              roles: ['SPOTCHECK_MANAGEMENT'],
              icon: 'iconfont icon-tongji',
            },
            component: defectiveStatistics
          }
        ]
      }
    ]
  }
]

