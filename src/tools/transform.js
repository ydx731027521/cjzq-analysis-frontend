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