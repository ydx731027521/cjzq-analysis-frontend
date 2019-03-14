export default {
  //登录接口
  LOGIN: "/api/auth/login",
  //获取验证码
  LOGIN_CODE: "/api/captcha/queryCaptchaImage",
  // 获取用户信息
  USER_INFO: "/api/account/getAccountInfoLogin",

  // 获取服务器当前时间
  SERVER_CURRTIME: "/api/auth/currTime",

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
  //质检标准详情页  删除要件列表单项
  STANDARD_CONFIG_MISSING_ITEM_CHANGE: "/api/orderQcResult/specifyBadOrderDeal",

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
  //次品处理  营业部下拉框 营业部名称
  DEFECTIVE_BRANCH_INFO: "/api/orderQcResult/listBranchInfo",
  //次品处理  营业部下拉框  营业部id
  // DEFECTIVE_BRANCH_ID: "/api/element/markItem/listByBatchId",
  DEFECTIVE_BRANCH_ID: "/api/standardMark/findStandardMarkList",

  // 特殊次品处理 查询列表
  SPECICAL_DEFECTIVE_LIST: "/api/orderQcResult/listSpecifyBadOrderMark",
  // 特殊次品处理 导入
  SPECICAL_DEFECTIVE_EXPORTIN: "/api/orderQcResult/specifyBadOrderMark",
  // 特殊次品处理 模板下载
  SPECICAL_DEFECTIVE_TEMPLAGE: "/api/util/specify/template",

  //复检管理  列表
  RECHECK_LIST: "/api/qcBatch/qcBatchManageList",
  //复检管理  根据复检次数查询复检批次列表
  RECHECK_DETAIL_LIST: "/api/qcBatch/recheckQcBatchList",
  //复检管理  生成复检批次
  RECHECK_ADD: "/api/qcBatch/recheckBatchadd",
  //复检记录  复检下拉框
  RECHECK_RECORD_RECHECKSTATUS: "/api/qcBatch/qcBatchStatus",
  //复检记录  刪除未开始的抽检批次
  RECHECK_RECORD_DELETE: "/api/qcBatch/deleteSpotCheckDel",

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

  //日志管理 查询日志列表
  LOG_LIST: "/api/procLog/ProcLogList",
  // 日志管理 日志类型和状态下拉
  LOG_TYPE_AND_STATUS: "/api/procLog/ProcLogMenu",
  /*
   * 导出
   */
  //批次处理  次品列表导出
  // DEFECTIVE_EXCEL_EXPORT: "/api/util/file/excel/badOrder",
  DEFECTIVE_EXCEL_EXPORT: "/api/util/file/excel/badOrder",
  //批次处理  质检报告导出
  DEFECTIVE_EXCEL_DETAIL_EXPORT: "/api/util/file/excel/qcDetail",
  //抽检详情  抽检导出质检报告
  SPOT_CHECK_EXCEL_DETAIL_EXPORT: "/api/util/file/excel/spotDetail",

  // 统计查询  次品查询
  STATISTICAL_DEFECTIVE_QUERY: "/api/orderQcResult/orderQcResultDefectiveList",
  // 统计查询  次品统计
  STATISTICAL_DEFECTIVE: "/api/orderQcResult/orderQcResultDefectiveStatistics",
  // 统计查询  质检分析  柱状图
  STATISTICAL_INSPECTION_ANALYSIS_HISTOGRAM: "/api/qcBatch/qcBatchAnalysisHistogram",
  // 统计查询  质检分析  折线图
  STATISTICAL_INSPECTION_ANALYSIS_BROKENLINE: "/api/qcBatch/qcBatchAnalysisBrokenLine",
  // 统计查询  质检分析  按业务列表
  STATISTICAL_INSPECTION_BUSIN_LIST: "/api/qcBatch/qcBatchAnalysisHistogramList",
  // 统计查询  质检分析  按批次列表
  STATISTICAL_INSPECTION_BATCH_LIST: "/api/qcBatch/qcBatchAnalysisBrokenLineList",

  // 用户管理  权限管理 列表
  USER_AUTHORITY_LIST: "/api/account/getAccountList",
  // 用户管理  权限管理 获取用户权限集合
  USER_AUTHORITY_GET_LIST: "/api/account/getAuthorityIdList",
  // 用户管理  权限管理 获取所有权限
  USER_AUTHORITY_ALL_LIST: "/api/account/getAllAuthorityIdList",
  // 用户管理  权限管理 修改用户业务权限
  USER_AUTHORITY_CHANGE: "/api/account/modifyAccount",
  // 用户管理  权限管理 激活用户
  USER_AUTHORITY_CHANGE_ACTIVE: "/api/account/activateAccount",
  // 用户管理  权限管理 获取用户角色信息
  USER_AUTHORITY_GET_ROLE: "/api/role/findRoleByUserName",
  // 用户管理  权限管理 获取用户角色信息
  USER_SEARCH: "/api/account/getAccountInfo",

  // 角色管理  角色列表
  ROLE_LIST: "/api/role/findAllRole",
  // 角色管理  分配权限
  ROLE_AUTHORITY_CHANGE: "/api/role/modifyRoleAuthority",
  // 角色管理  根据角色id获取角色权限
  ROLE_AUTHORITY: "/api/role/queryAuthIdByRoleId",

  // 设置管理 获取列表
  SETTING_LIST: "/api/configData/configDataList",
  // 设置管理 修改值
  SETTING_MODIFY: "/api/configData/modifyConfigData",
  // 设置管理 行为管理列表
  BEHAVIOR_LIST: "/api/actionJour/ActionJourList",
  // 设置管理 行为类型下拉框
  BEHAVIOR_ACTION_TYPE: "/api/actionJour/ActionJourMenu",

  // 统计查询 次品查询  导出
  STATISTICAL_EXPORT: '/api/util/exportBadOrderSearch',

  // 业务管理 树
  BUSIN_TREE: "/api/businType/findBusinTypeTree",
  // 业务类型新增
  INSERT_BUSINTYPE: "/api/businType/addBusinType",
  // 业务类型修改
  CHANGE_BUSINTYPE: "/api/businType/updateBusinType",
  // 业务类型的删除
  DELETE_BUSINTYPE: "/api/businType/deleteBusinTypeTreeNode",
  // 业务类型  基本信息
  BASIC_INFO: "/api/businInfo/findBusinInfo",
  // 业务类型  基本信息 所属系统
  SYSTEM_LIST: "/api/sourceSystem/findSourceSystemList",
  // 业务类型  基本信息 所属表
  TABLE_LIST: "/api/sourceSystem/findSourceSystemTableList",
  // 业务类型  基本信息历史信息
  HISTORY_LIST: "/api/businInfo/listBusinInfo",
  // 业务类型  当前质检标准
  CURRENT_CHECK: "/api/qcstandard/getQcStandardDetailsByBusinTypeId",
  // 业务类型  所有质检标准
  ALL_CHECK: "/api/configurSYSTEMe/getStandardByStandardQuery",
  // 业务类型  基本信息 历史信息 激活
  BUSIN_ACTIVE: "/api/businInfo/updateBusinTypeStatus",
  // 业务类型信息新增
  BUSIN_INFO_INSERT: "/api/businInfo/addBusinInfo",
  // 根据子节点id查找所有的父级相关信息
  GET_BUSIN_INFO: "/api/businType/findBusinTypeParentNode",

  // 未分类业务 查询已激活的业务分类
  UNCLASSIFIED_BUTINTYPE: "/api/businType/findBusinTypeChildNode",
  // 未分类业务 列表
  UNCLASSIFIED_TABLE: "/api/orderUncheck/findOrderUncheckList",
  // 校验sql
  CHECK_SQL: "/api/businInfo/checkCondition",

  BATCHCHECK: '/api/orderQcResult/batchSpecifyBadOrderDeal'

}