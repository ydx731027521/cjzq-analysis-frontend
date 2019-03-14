// 质检周期的转换
export const regularTransform = function (val, obj) {
  switch (val) {
    case 1:
      obj.regularQcperiodText = "日"
      break;
    case 2:
      obj.regularQcperiodText = "周"
      break;
    case 3:
      obj.regularQcperiodText = "月"
      break;
  }
}

export const regularTransformToNum = function (val, obj) {
  switch (val) {
    case '日':
      obj.regularQcperiodNum = 1
      break;
    case '周':
      obj.regularQcperiodNum = 2
      break;
    case '月':
      obj.regularQcperiodNum = 3
      break;
  }
}

// 审核状态的转换
export const checkTransform = function (val, obj) {
  switch (val) {
    case "1":
      obj.effectFlag = "待审核"
      break;
    case "2":
      obj.effectFlag = "生效中"
      break;
    case "3":
      obj.effectFlag = "已失效"
      break;
    case "4":
      obj.effectFlag = "待确认"
      break;
    case "5":
      obj.effectFlag = "待生效"
      break;
  }
}

export const checkTransformToNum = function (val) {
  let str = ''
  switch (val) {
    case "待审核":
      str = "1"
      break;
    case "生效中":
      str = "2"
      break;
    case "已失效":
      str = "3"
      break;
    case "待确认":
      str = "4"
      break;
    case "待生效":
      str = "5"
      break;
  }
  return str
}


// 筛选维度
export const checkDim = function (val, obj) {
  switch (val) {
    case "1":
      obj.markDim = "订单维度"
      break;
    case "2":
      obj.markDim = "客户维度"
      break;
    case "3":
      obj.markDim = "流水维度"
      break;
  }
}

export const checkDimTrans = function (val, obj) {
  switch (val) {
    case "订单维度":
      obj.markDim = 1
      break;
    case "客户维度":
      obj.markDim = 2
      break;
    case "流水维度":
      obj.markDim = 3
      break;
  }
}

// 批次初检结果的转换
export const conventionResultTrans = function (val) {
  let str = ''
  switch (val) {
    case "合格":
      str = "0"
      break;
    case "不合格":
      str = "1"
      break;
  }
  return str
}

// 最终结果的转换
export const finalResultTransToNum = function (str) {
  let number
  switch (str) {
    case "未完成":
      number = -1
      break;
    case "合格":
      number = 0
      break;
    case "不合格":
      number = 1
      break;
    case "复检中":
      number = 3
      break;
    default:
      number = ''
      break;
  }
  return number
}

export const finalResultTrans = function (arr) {
  arr.map(item => {
    switch (item.finalResult) {
      case "0":
        item.finalResult = "合格"
        break;
      case "1":
        item.finalResult = "不合格"
        break;
    }
  })
}

// 批次状态的转换
export const statusTrans = function (arr) {
  arr.map(item => {
    switch (item.qcStatus) {
      case "-1":
        item.qcStatus = "异常"
        break;
      case "0":
        item.qcStatus = "未开始"
        break;
      case "1":
        item.qcStatus = "进行中"
        break;
      case "2":
        item.qcStatus = "已完成-成功"
        break;
      case "3":
        item.qcStatus = "已完成-失败"
        break;
    }
  })
}

export const statusTransToNum = function (val) {
  let str = ''
  switch (val) {
    case "未开始":
      str = "0"
      break;
    case "已完成-成功":
      str = "2"
      break;
    case "已完成-失败":
      str = "3"
      break;
    case "所有":
      str = ""
      break;
  }
  return str
}

// 批次类型的转换
export const batchTypeTrans = function (val) {
  let number
  switch (val) {
    case "人工批次":
      number = "1"
      break;
    case "系统批次":
      number = "2"
      break;
    case "所有":
      number = ""
      break;
  }
  return number
}

// 复检结果的转换
export const qcStatusTransToNum = function (val) {
  let number = 0
  switch (val) {
    case "未完成":
      number = 1
      break;
    case "合格":
      number = 2
      break;
    case "不合格":
      number = 3
      break;
    case "所有":
      number = null
      break;
  }
  return number
}

// 日志级别的转换
export const logLevelToNum = function (val) {
  let number
  switch (val) {
    case "error":
      number = '1'
      break;
    case "info":
      number = '2'
      break;
    case "debug":
      number = '3'
      break;
    default:
      number = '';
      break;
  }
  return number
}

// 日志类型的转换
export const logTypeToNum = function (val) {
  let number
  switch (val) {
    case "参数记录":
      number = '0'
      break;
    case "逻辑异常日志":
      number = '1'
      break;
    case "系统异常日志":
      number = '2'
      break;
    case "执行时间记录":
      number = '-1'
      break;
    case "成功":
      number = '3'
      break;
    default:
      number = '';
      break;
  }
  return number
}

// 权限的转换
// "EXAMINE_MANAGE" : "质检标准审核",
//       "CONFIG_MANAGE" : "配置管理",
//       "REINSPECTION_MANAGEMENT" : "复检管理",
//       "PERIODIC_CONFIGURATION" : "周期配置",
//       "SPOTCHECK_MANAGEMENT" : "抽检管理",
//       "BATCH_MANAGEMENT" : "批次管理",
//       "DEFECTIVE_MANAGEMENT" : "次品处理"
export const authorityTran = function (val) {
  let str = ''
  switch (val) {
    case "EXAMINE_MANAGE":
      str = '质检标准审核'
      break;
    case "CONFIG_MANAGE":
      str = '配置管理'
      break;
    case "REINSPECTION_MANAGEMENT":
      str = '复检管理'
      break;
    case "PERIODIC_CONFIGURATION":
      str = '周期配置'
      break;
    case "SPOTCHECK_MANAGEMENT":
      str = '抽检管理'
      break;
    case "BATCH_MANAGEMENT":
      str = '批次管理'
      break;
    case "DEFECTIVE_MANAGEMENT":
      str = '次品处理'
      break;
    case "LOG_MANAGEMENT":
      str = '日志管理'
      break;
  }
  return str
}

// 行为类型的转换
export const actionTypeToNum = function (val) {
  let number
  switch (val) {
    case "激活":
      number = '0'
      break;
    case "锁定":
      number = '1'
      break;
    case "状态生效":
      number = '2'
      break;
    case "质检周期":
      number = '3'
      break;
    case "质检状态":
      number = '4'
      break;
    case "新增人工批次":
      number = '5'
      break;
    case "生成质检报告":
      number = '6'
      break;
    case "查看次品详情":
      number = '7'
      break;
    case "次品列表导出":
      number = '8'
      break;
    case "将单个次品处理为特殊次品":
      number = '9'
      break;
    case "特殊次品文件导入":
      number = '10'
      break;
    case "批次跑批":
      number = '11'
      break;
    case "新增抽检批次":
      number = '12'
      break;
    case "激活/锁定用户":
      number = '13'
      break;
    case "修改用户权限":
      number = '14'
      break;
    case "登陆成功":
      number = '15'
      break;
    case "特殊次品导入":
      number = '101'
      break;
    default:
      number = '';
      break;
  }
  return number
}