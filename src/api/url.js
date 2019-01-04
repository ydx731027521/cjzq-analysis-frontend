export default {
  //登录接口
  LOGIN: "/api/auth/login",
  //获取验证码
  LOGIN_CODE: "/api/captcha/queryCaptchaImage",
  //获取新token
  REFRESH_TOKEN: "/api/auth/refreshToken",
  //权限验证测试
  CHECK_PERMISSION: "/api/element/getAlementAll",
  //要件配置列表
  CONFIG_LIST: "/api/element/getMarkItemAll",
  //要件配置下拉列表
  CONFIG_SELECT: "/api/element/listMarkType",
  //质检标准配置页  列表
  STANDARD_CONFIG_LIST: "/api/configure/getStandardByStandardQuery",
  //质检标准配置页  详情
  STANDARD_CONFIG_LIST_DETAIL: "/api/qcstandard/getQcStandardDetails",
  //质检标准配置页  筛选维度（新增、详情）
  STANDARD_DIM: "/api/element/listMarkDim",
  //质检标准配置页  业务类型和状态下拉菜单(已修改)
  STANDARD_CONFIG_MENU: "/api/configure/getMenuDetails",
  //质检标准配置页业  务类型下拉菜单点击获取一级分类(已修改)
  STANDARD_FIRSTCLASS: "/api/configure/getBusinSubType",
  //质检标准配置页  一级分类下拉菜单点击获取二级分类(已修改)
  STANDARD_SECONDCLASS: "/api/configure/getBusinBusinName",
  //质检标准配置页  获取业务类型
  STANDARD_BUSIN: "/api/configure/businNames",
  //质检标准配置页  获取标准状态
  STANDARD_STATUS: "/api/qcstandard/standardStatus",
  //质检标准配置页  新增标准配置
  STANDARD_INSERT: "/api/configure/putStandard",
  //质检标准配置页  复制
  STANDARD_CONFIG_COPY: "/api/configure/copyQcStandard",
  //质检标准配置页  搜索
  STANDARD_CONFIG_SEARCH: "/api/configure/getStandardByStandardQuery",
  //质检标准配置页  待审核通过
  STANDARD_CONFIG_PASS: "/api/configure/modifyQcStandardStatus",
  //质检标准配置页  修改标准配置(提交)
  STANDARD_CONFIG_SUBMIT: "/api/configure/modifyQcStandard",
  //质检标准详情页  删除要件列表单项
  STANDARD_CONFIG_DETAIL_DELETE: "/api/configure/deleteQcStandardId",
  //周期配置  列表获取查询
  CYCLE_LIST: "/api/cycle/listCycle",
  //周期配置 修改周期类型
  CYCLE_CHANGEPERIOD: "/api/cycle/qcPeriodType",
  //周期配置  修改启动状态
  CYCLE_CHANGE_STATUS: "/api/cycle/qcPeriodAutomatic",
  //批次管理  查看批次详情质检要件
  CONVENTION_LIST: "/api/qcBatch/qcBatchList",
  //批次管理  批次类型和状态下拉
  CONVENTION_BATCH_AND_STATUS: "/api/qcBatch/qcBatchMenu",
  //批次管理  新增批次
  CONVENTION_BATCH_INSERT: "/api/qcBatch/qcBatchPost",
  //批次管理  批次详情
  CONVENTION_BATCH_DETAIL: "/api/qcBatch/qcBatchIdDetail",
  //批次管理  批次详情  质检要件列表
  CONVENTION_BATCH_DETAIL_LIST: "/api/qcBatch/markItemList",
  //批次管理  删除未开始的人工批次
  CONVENTION_BATCH_DETELE: "/api/qcBatch/deleteQcBatchId",
  //批次处理  查看次品处理批次详情和查询
  DEFECTIVE_DETAIL: "/api/orderQcResult/orderQcResultDetail",
  //批次处理  获取列表项
  DEFECTIVE_LIST: "/api/orderQcResult/orderQcResultList",
  //批次详情  查看批次详情质检明细要件固定列数据
  DEFECTIVE_DETAIL_STATIC_LIST: "/api/qcBatch/orderMarkRelDetail",
  //批次详情  查看批次详情质检明细要件浮动列数据（总订单）
  DEFECTIVE_DETAIL_ALL_FLOAT_LIST: "/api/qcBatch/orderMarkRelDetailandMenu",
  //复检管理  列表
  RECHECK_LIST: "/api/qcBatch/qcBatchManageList",
  //复检管理  根据复检次数查询复检批次列表
  RECHECK_DETAIL_LIST: "/api/qcBatch/recheckQcBatchList",
  //复检管理  生成复检批次
  RECHECK_ADD: "/api/qcBatch/recheckBatchadd",
  //复检记录  复检下拉框
  RECHECK_RECORD_RECHECKSTATUS: "/api/qcBatch/qcBatchStatus",
  //复检记录  刪除未开始的抽检批次
  RECHECK_RECORD_DELETE: "/api/qcBatch/spotCheckDel",
  //抽检管理  抽检批次页  列表
  SPOT_CHECK_CONVENTION_LIST: "/api/qcBatch/qcCheckBatchList",
  //抽检管理  抽检批次页  获取质检状态下拉框
  SPOT_CHECK_INSERT_QCSTANDARD: "/api/qcstandard/qcStdVersion",
  //抽检管理  抽检批次页  新增
  SPOT_CHECK_INSERT: "/api/qcBatch/qcCheckBatchPost",
  //抽检管理  抽检批次页  批次删除
  SPOT_CHECK_DELETE: "/api/qcBatch/deleteSpotCheckDel",
  //抽检管理  抽检批次页  获取抽检类型下拉
  SPOT_CHECK_CHECKTYPE: "/api/qcBatch/spotCheckType",
  /*
  * 导出
  */
  //批次处理  次品列表导出
  DEFECTIVE_EXCEL_EXPORT: "/api/util/file/excel/badOrder",
  //批次处理  质检报告导出
  DEFECTIVE_EXCEL_DETAIL_EXPORT: "/api/util/file/excel/qcDetail",
  //抽检详情  抽检导出质检报告
  SPOT_CHECK_EXCEL_DETAIL_EXPORT: "/api/util/file/excel/spotDetail"
}
