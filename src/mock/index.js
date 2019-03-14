/**
 * 定义本地测试接口，最好与正式接口一致，避免联调阶段修改工作量
 */
// 引入mockjs
const Mock = require('mockjs')

import URL from 'api/url.js'

let {
  STANDARD_CONFIG_LIST,
  STANDARD_CONFIG_LIST_DETAIL,
  STANDARD_CONFIG_MENU,
  STANDARD_CONFIG_SEARCH,
  STANDARD_FIRSTCLASS,
  STANDARD_SECONDCLASS,
  CONVENTION_LIST,
  DEFECTIVE_LIST
} = URL

// 获取 mock.Random 对象

const Random = Mock.Random

// mock一组数据

const produceData = function (opt) {

  let articles = []

  for (let i = 0; i < 30; i++) {
    let newArticleObject = {

      address: Random.csentence(5, 30), // Random.csentence( min, max )

      pic: Random.dataImage('300x250', 'mock的图片'), // Random.dataImage( size, text ) 生成一段随机的 Base64 图片编码

      name: Random.cname(), // Random.cname() 随机生成一个常见的中文姓名

      date: Random.date() // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；Random.time() 返回一个随机的时间字符串

    }

    articles.push(newArticleObject)
  }

  return {

    data: articles

  }
}

const navList = function (opt) {

  let list = []

  for (let i = 0; i < 8; i++) {
    let listObject = {
      title: Random.city()
    }
    list.push(listObject)
  }

  return {
    data: list
  }
}

const userObj = {
  "status": 0,
  "message": "请求成功",
  "data": {
    "userName": "test",
    "token": "Breaer ;eyJ0eXAiOiJCcmVhZXIiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX25hbWUiOiJ0ZXN0IiwiYXV0aG9yaXRpZXMiOiJbXCJQQVBFUl9NQU5BR0VcIixcIlFVRVNUSU9OX01BTkFHRVwiLFwiT1VUTElORV9NQU5BR0VcIixcIkNPR05JVElPTl9NQU5BR0VcIixcIkJPT0tfTUFOQUdFXCIsXCJQQVBFUl9DSEVDS1wiLFwiT1VUTElORV9DSEVDS1wiLFwiUVVFU1RJT05fQ0hFQ0tcIixcIkJPT0tfQ0hFQ0tcIixcIkNPR05JVElPTl9DSEVDS1wiLFwiQUNDT1VOVF9NQU5BR0VcIixcIkJBU0lDX0lORk9cIl0iLCJpYXQiOjE1NDIwNzE0MTcsImV4cCI6MTU0MjA3MTQ3N30.BO7xqFr82rJL_otmgINMnEp1woXOwYP_vDc_bIcKpI4"
  }
}

const essentialTableData = function () {
  let data = []

  for (let i = 0; i < 30; i++) {
    let obj = {
      type: Random.csentence(4, 7),
      title: Random.csentence(5, 16),
      param: Random.string('number', 3, 6)
    }
    data.push(obj)
  }
  return data
}

const standardTableData = function () {
  let data = []

  for (let i = 0; i < 30; i++) {
    let obj = {
      businType: Random.csentence(4, 7),
      businSubType: Random.csentence(4, 7),
      businName: Random.csentence(2),
      qsStandardVersion: "V" + Random.string('number', 1) + '.0',
      effectFlag: Random.csentence(3),
      beginDate: Random.date(),
      qsId: Random.string('number', 3)
    }
    data.push(obj)
  }
  return data
}

const insertTableData = function () {
  let data = []

  for (let i = 0; i < 30; i++) {
    let obj = {
      type: Random.csentence(4, 7),
      title: Random.csentence(5, 16),
      param: Random.string('number', 3, 6),
      condition: Random.string('lower', 5)
    }
    data.push(obj)
  }
  return data
}

const cycleTableData = function () {
  let data = []

  for (let i = 0; i < 6; i++) {
    let obj = {
      type: Random.csentence(4, 7),
      cycle: Random.csentence(2),
      isCheck: true
    }
    data.push(obj)
  }
  return data
}


const conventionTableData = function () {
  return {
    "data": {
      "currentPage": 0,
      "isMore": 0,
      "items": [{
          "batchEndTime": "1111",
          "batchType": "抽检",
          "businName": "临柜",
          "businSubType": "创业板权限开通",
          "businType": "业务办理",
          "finalResult": "合格",
          "orderAmount": "1000",
          "qcBatchId": "SJCJ20180101001",
          "qcResult": "不合格",
          "qcStatus": "0"
        },
        {
          "batchEndTime": "222",
          "batchType": "抽检",
          "businName": "临柜",
          "businSubType": "创业板权限开通",
          "businType": "业务办理",
          "finalResult": "合格",
          "orderAmount": "1000",
          "qcBatchId": "SJCJ20180101001",
          "qcResult": "不合格",
          "qcStatus": "已完成"
        },
        {
          "batchEndTime": "33",
          "batchType": "抽检",
          "businName": "临柜",
          "businSubType": "创业板权限开通",
          "businType": "业务办理",
          "finalResult": "合格",
          "orderAmount": "1000",
          "qcBatchId": "SJCJ20180101221",
          "qcResult": "不合格",
          "qcStatus": "已完成"
        }
      ],
      "pageSize": 0,
      "startIndex": 0,
      "totalNum": 0,
      "totalPage": 0
    },
    "message": "string",
    "status": 0
  }
}

const defectiveTableData = function () {
  return {
    "data": {
      "currentPage": 0,
      "isMore": 0,
      "items": [{
          "branchNo": "22",
          "clientId": "1313",
          "clientName": "jock",
          "currentPage": 0,
          "originalOrderId": "1231231",
          "pageSize": 0,
          "qcBatchId": "ssdf1111",
          "qcName": "asfsadf",
          "qsId": "sf123123"
        },
        {
          "branchNo": "22",
          "clientId": "1313",
          "clientName": "jock",
          "currentPage": 0,
          "originalOrderId": "1231231",
          "pageSize": 0,
          "qcBatchId": "ssdf1111",
          "qcName": "asfsadf",
          "qsId": "sf123123"
        }
      ],
      "pageSize": 0,
      "startIndex": 0,
      "totalNum": 10,
      "totalPage": 0
    },
    "message": "string",
    "status": 0
  }
}

Mock.mock('/news', /post|get/i, produceData)
Mock.mock('/nav', /post|get/i, navList)
Mock.mock('/login', /post/, userObj)
Mock.mock('/essentialTableData', /post|get/i, essentialTableData)
Mock.mock(STANDARD_CONFIG_LIST, /post|get/i, standardTableData)
Mock.mock('/insertTableData', /post|get/i, insertTableData)
Mock.mock('/cycleTableData', /post|get/i, cycleTableData)
Mock.mock(CONVENTION_LIST, /post|get/i, conventionTableData)
Mock.mock(DEFECTIVE_LIST, /post|get/i, defectiveTableData)