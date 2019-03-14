export default {
  //token刷新时间
  TOKEN_TIMEOUT: 1000 * 60 * 60 * 2,
  // TOKEN_TIMEOUT: 1000 * 60 * 60 * 23 + 1000 * 60 * 59,
  // TOKEN_TIMEOUT: 2 * 1000 * 60 * 60,
  // 标准要件配置，审核权限
  REVIEW: "10202",
  // 标准要件配置，新增、复制、搜索、提交
  ESSANTIAL_OPT: "10201",
  // 周期配置，修改权限
  CYCLE_CHANGE: "10301",
  // 质检管理，新增权限
  CONVENTION_INSERT: "10402",
  // 质检管理，详情页，导出权限
  CONVENTION_DETAIL_EXPORT: "10403",
  // 次品处理，导出权限
  DEFECTIVE_EXPORT: "10502",
  // 次品处理，查看权限
  DEFECTIVE_VIEW: "10501",
  // 特殊次品处理，导入
  SPECIAL_DEFECTIVE_IMPORT: "10602",
  // 复检管理，复检权限
  RECHECK: "10702",
  // 抽检管理，新增权限和删除权限
  SPOTCHECK_INSERT: "10903",
  // 抽检管理，详情页，导出抽检报告
  SPOTCHECK_EXPORT: "10902",
  // 批次管理，查看权限
  CONVENTION_VIEW: "10401",
  // 批次管理，新增
  CONVENTION_INSERT: "10402"
};