import Home from "../views/home.vue";
import EssantialManagement from "../views/config_management/index.vue";
import QualityManagement from "../views/quality_management/index.vue";
import EssantialConfig from "../views/config_management/essantial_config.vue";
import Standard from "../views/config_management/standard_config/check_standard.vue";
import StandardInsert from "../views/config_management/standard_config/insert.vue";
import StandardDetail from "../views/system_management/busin/detail.vue";
// import StandardDetail from "../views/config_management/standard_config/detail.vue";
import Cycle from "../views/config_management/cycle_config.vue";
import Version from "../views/version";
import ConventionManage from "../views/quality_management/convention/manage.vue";
import ConventionDetail from "../views/quality_management/convention/detail.vue";
import DefectiveProcess from "../views/quality_management/defective_process/defective.vue";
import SpecialDefectiveProcess from "../views/quality_management/special_defective_process/index.vue";
import DefectiveDetail from "../views/quality_management/defective_process/detail.vue";
import RecheckManage from "../views/quality_management/recheck_manage/index.vue";
import RecheckRecord from "../views/quality_management/recheck_record/index.vue";
import RecheckRecordDetail from "../views/quality_management/recheck_record/recheck_detail.vue";
import SpotCheck from "../views/spot_check/index.vue";
import SpotCheckConvention from "../views/spot_check/convention.vue";
import SpotCheckDetail from "../views/spot_check/detail.vue";
import StatisticalQuery from "../views/statistical_query/index.vue";
import InspectionAnalysis from "../views/statistical_query/inspection_analysis/index.vue";
import DefectiveQuery from "../views/statistical_query/defective_query/index.vue";
import Log from "../views/system_management/log/index.vue";
import Authority from "../views/system_management/authority/index.vue";
import SettingsConfig from "../views/system_management/config/index.vue";
import Behavior from "../views/system_management/behavior/index.vue";
import SystemManagement from "../views/system_management/index.vue";
import Role from "../views/system_management/role/index.vue";
import Busin from "../views/system_management/busin/index.vue";
import BusinInsert from "../views/system_management/busin/insert.vue";
import BusinDetail from "../views/system_management/busin/detail.vue";
import Tree from '../views/system_management/busin/tree.vue';
// import Home from '../views/system_management/busin/home.vue';
import Unclassified from '../views/statistical_query/unclassified_orders/index.vue'

// ELEMENTS_VIEW("ELEMENTS_VIEW","10100","要件查看"),
// STANDARD_MANAGEMENT("STANDARD_MANAGEMENT","10201","标准管理--新增、复制、搜索"),
// STANDARD_AUDIT("STANDARD_AUDIT","10202","标准审核"),
// STANDARD_CHECK("10203", "标准管理-查看"),
// PERIODIC_MODIFY("PERIODIC_MODIFY","10301","周期修改"),
// PERIODIC_CHECK("PERIODIC_CHECK","10302","周期查看"),
// CHECK_BATCH("CHECK_BATCH","10401","查看批次"),
// ADD_BATCH("ADD_BATCH","10402","新增批次"),
// EXPORT_BATCH("EXPORT_BATCH","10403","导出批次")
// CHECK_DEFECTIVE("CHECK_DEFECTIVE","10501","次品查看"),
// EXPORT_DEFECTIVE("EXPORT_DEFECTIVE","10502","次品导出"),
// SPECIAL_CHECK_DEFECTIVE("SPECIAL_CHECK_DEFECTIVE","10601","特殊次品查看"),
// SPECIAL_EXPORT_DEFECTIVE("SPECIAL_EXPORT_DEFECTIVE","10602","特殊次品导出"),
// CHECK_REINSPECTION("CHECK_REINSPECTION","10701","复检管理查看"),
// REEXAMINATION_REINSPECTION("EXPORT_REINSPECTION","10702","复检管理复检"),
// CHECK_REEXAMINATION("CHECK_REEXAMINATION","10801","复检记录查看"),
// CHECK_SPOTCHECK("CHECK_SPOTCHECK","10901","抽检管理查看"),
// EXPORT_SPOTCHECK("EXPORT_SPOTCHECK","10902","抽检管理导出"),
// CHECK_STATISTICS("CHECK_STATISTICS","11000","统计查看"),
// CHECK_DEFECTIVE_DETAILS("CHECK_DEFECTIVE_DETAILS","11100","次品详情查看"),
// SYSTEM_MANAGEMENT("SYSTEM_MANAGEMENT","11200","系统管理")

export const constantRouterMap = [{
    path: "/version",
    name: "版本号",
    component: Version
  },
  {
    path: "/",
    name: "index",
    component: Home,
    redirect: "/log",
    children: [{
        path: "essantial",
        name: "配置管理",
        // redirect: '/essantial/config',
        // component: () => import(/* webpackChunkName: "essantial" */ '../views/config_management/home.vue'),
        component: EssantialManagement,
        meta: {
          name: "essantialManagement"
        },
        children: [
          // {
          //   path: "config",
          //   name: "要件配置",
          //   meta: {
          //     icon: "el-icon-star-ohn"
          //   },
          //   component: EssantialConfig
          // },
          // {
          //   path: "home",
          //   name: "首页",
          //   component: Home,
          //   meta: {
          //     icon: "iconfont icon-yewu"
          //   }
          // },
          {
            path: "busin",
            name: "业务管理",
            component: Tree,
            meta: {
              icon: "iconfont icon-yewu"
            }
          },
          // {
          //   path: "standard",
          //   name: "质检标准配置",
          //   meta: {
          //     roles: ["10201", "10202", "10203", "ADMIN"],
          //     icon: "el-icon-rank"
          //   },
          //   component: Standard
          // },
          // {
          //   path: "cycle",
          //   name: "周期配置",
          //   meta: {
          //     roles: ["10301", "10302", "ADMIN"],
          //     icon: "el-icon-time"
          //   },
          //   component: Cycle
          // },
          // {
          //   path: "insert",
          //   name: "新增质检标准",
          //   meta: {
          //     roles: ["10201", "ADMIN"]
          //   },
          //   component: StandardInsert
          // },
          // {
          //   path: "detail",
          //   name: "质检标准详情",
          //   meta: {
          //     roles: ["10201", "ADMIN"]
          //   },
          //   component: StandardDetail
          // }
        ]
      },
      {
        path: "quality",
        name: "质控管理",
        // redirect: '/quality/manage',
        meta: {
          roles: [
            "10401",
            "10402",
            "10403",
            "10701",
            "10702",
            "10501",
            "10502",
            "10601",
            "10602",
            "ADMIN",
            "10701",
            "10702",
            "10801"
          ],
          name: "qualityManagement"
        },
        component: QualityManagement,
        children: [{
            path: "manage",
            name: "批次管理",
            meta: {
              roles: ["10401", "10402", '10403', "ADMIN"],
              icon: "iconfont icon-pici",
              keepAlive: true
            },
            component: ConventionManage
          },
          {
            path: "defective",
            name: "次品处理",
            meta: {
              roles: ["10501", "10502", "ADMIN"],
              icon: "iconfont icon-chuli1",
              keepAlive: true
            },
            component: DefectiveProcess
          },
          {
            path: "specialdefective",
            name: "特殊次品处理",
            meta: {
              roles: ["10601", "10602", "ADMIN"],
              icon: "iconfont icon-teshu",
              keepAlive: true
            },
            component: SpecialDefectiveProcess
          },
          {
            path: "recheckmanage",
            name: "复检管理",
            meta: {
              roles: ["10701", "10702", "ADMIN"],
              icon: "iconfont icon-chuli",
              keepAlive: true
            },
            component: RecheckManage
          },
          {
            path: "recheckrecord",
            name: "复检记录",
            meta: {
              roles: ["10801", "ADMIN"],
              icon: "iconfont icon-jilu1",
              keepAlive: true
            },
            component: RecheckRecord
          },
          {
            path: "conventiondetail/:id",
            name: "批次管理详情",
            meta: {
              roles: ["10401", "10402", "10701", "10702", "ADMIN"]
            },
            component: ConventionDetail
          },
          {
            path: "defectivedetail/:qcBatchId",
            name: "次品详情",
            component: DefectiveDetail,
            meta: {
              roles: ["10501", "10502", "10401", "10402", "ADMIN"]
            }
          },
          {
            path: "recheckdetail/:qcBatchId/:originalQcBatchId",
            name: "复检详情",
            meta: {
              roles: ["10801", "ADMIN"]
            },
            component: RecheckRecordDetail
          },
        ]
      },
      {
        path: "spotcheck",
        name: "抽检管理",
        component: SpotCheck,
        meta: {
          roles: ["10901", "10902", "10903", "ADMIN"],
          name: "spotCheckManagement"
        },
        // redirect: '/spotcheck/convention',
        children: [{
            path: "convention",
            name: "抽检批次",
            meta: {
              roles: ["10901", "10902", "10903", "ADMIN"],
              icon: "iconfont icon-kaoshijieguochoucha",
              keepAlive: true
            },
            component: SpotCheckConvention
          },
          {
            path: "spotdetail/:id",
            name: "抽检详情",
            meta: {
              roles: ["10901", "10902", "10903" , "ADMIN"]
            },
            component: SpotCheckDetail
          },
        ]
      },
      {
        path: "statisticalquery",
        name: "统计查询",
        // redirect: '/statisticalquery/analysis',
        // redirect: to =>{
        //   return {name:'系统质检分析'}
        // },
        component: StatisticalQuery,
        meta: {
          roles: ["11000", "11100", "ADMIN"],
          name: "statisticalQuery"
        },
        children: [{
            path: "analysis",
            name: "系统质检分析",
            meta: {
              roles: ["11000", "ADMIN"],
              icon: "iconfont icon-fenxi"
            },
            component: InspectionAnalysis
          },
          {
            path: "defectivequery",
            name: "次品查询",
            meta: {
              roles: ["11100", "ADMIN"],
              icon: "iconfont icon-chaxun"
            },
            component: DefectiveQuery
          },
          {
            path: 'unclassified',
            name: "未分类订单",
            meta: {
              roles: ["11300", "ADMIN"],
              icon: "iconfont icon-fenlei"
            },
            component: Unclassified
          }
          // {
          //   path: 'defectivestatistics',
          //   name: '次品统计',
          //   meta: {
          //     roles: ['SPOTCHECK_MANAGEMENT'],
          //     icon: 'iconfont icon-tongji',
          //   },
          //   component: defectiveStatistics
          // }
        ]
      },
      {
        path: "system",
        name: "系统管理",
        // redirect: "/system/authority",
        component: SystemManagement,
        meta: {
          roles: ["11200", "ADMIN"]
        },
        children: [{
            path: "authority",
            name: "用户管理",
            component: Authority,
            meta: {
              roles: ["ADMIN"],
              icon: "iconfont icon-27"
            }
          },
          {
            path: "role",
            name: "角色管理",
            component: Role,
            meta: {
              roles: ["ADMIN"],
              icon: "iconfont icon-jiaoseguanli"
            }
          },
          {
            path: "behavior",
            name: "行为管理",
            component: Behavior,
            meta: {
              roles: ["ADMIN"],
              icon: "iconfont icon-hangwei"
            }
          },
          {
            path: "log",
            name: "日志管理",
            component: Log,
            meta: {
              roles: ["ADMIN", "11200"],
              icon: "iconfont icon-rizhi"
            }
          },
          {
            path: "config",
            name: "配置设置",
            component: SettingsConfig,
            meta: {
              roles: ["ADMIN", "11200"],
              icon: "iconfont icon-peizhi"
            }
          },
        ]
      }
    ]
  },
  {
    path: "/busininsert/:businTypeId",
    name: "新增标准",
    component: BusinInsert,
  }, {
    path: "/busindetail/:businTypeId/:id/:effectFlag",
    name: "业务详情",
    component: BusinDetail
  },

];