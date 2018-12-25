
import URL from 'api/url'
import axios from 'axios'
import baseUrl from '../setBaseUrl'
import { Message } from 'element-ui'
import { filterRouter, setTopNav, setLeftNav } from 'tools/setRoutes'
let { STANDARD_CONFIG_MENU, STANDARD_FIRSTCLASS, STANDARD_SECONDCLASS, CONVENTION_BATCH_AND_STATUS, DEFECTIVE_EXCEL_EXPORT, STANDARD_DIM, STANDARD_BUSIN } = URL

export default {
  initConstantRouterMap(obj) {
    // return constantRouterMap = 
  },
  // 初始化路由
  initRoutes(constantRouterMap, router, store) {
    let user = JSON.parse(sessionStorage.getItem('user'))
    if (user) {
      let { authorityList } = user
      let routes = filterRouter(constantRouterMap, authorityList)
      router.addRoutes(routes)
      sessionStorage.setItem('routes', JSON.stringify(routes))
      let headerNavList = setTopNav(routes)
      let leftNavList = setLeftNav(routes)
      store.commit('topNav/setTopNav', headerNavList)
      store.commit('leftNav/setLeftNavList', leftNavList)
      store.commit('leftNav/setLeftActiveList', leftNavList[0])
    }
  },
  //返回顶部
  wrapToTop(ele) {
    ele.$nextTick(() => {
      document.querySelector(".wrap").scrollTop = 0
    })
  },
  // 用户信息存至session中
  setSession(userName, token, erpxerTime, authorityList) {
    let user = {
      userName,
      token,
      erpxerTime,
      authorityList
    }
    sessionStorage.setItem('user', JSON.stringify(user))
  },
  // 从session中获取用户信息
  getSession() {
    let user = JSON.parse(sessionStorage.getItem('user'))
    return user ? user : null
  },
  // 设置更新后的token
  setRefreshToken(refreshToken) {
    let user = JSON.parse(sessionStorage.getItem('user'))
    user.token = refreshToken
    sessionStorage.setItem('user', JSON.stringify(user))
  },
  // 清空session中的用户数据
  clearUser() {
    sessionStorage.removeItem('user')
  },
  //存储侧边栏导航到session
  setLeftNav(arr) {
    sessionStorage.setItem("leftNav", JSON.stringify(arr))
  },
  //从sesstion中获取侧边栏导航
  getLeftNav() {
    let leftNav
    if (sessionStorage.getItem('leftNav')) {
      leftNav = JSON.parse(sessionStorage.getItem("leftNav"))
    }
    return leftNav ? leftNav : null
  },
  //顶部导航的激活索引
  setActiveIndex(index) {
    sessionStorage.setItem("activeIndex", JSON.stringify(index))
  },
  //获取顶部导航被激活的索引
  getActiveIndex() {
    let index = JSON.parse(sessionStorage.getItem('activeIndex'))
    return index ? index : null
  },
  // 用户信息存至vuex
  setUserToVuex(obj) {
    let user = JSON.parse(sessionStorage.getItem('user'))
    if (user) {
      let { userName, token, erpxerTime, authorityList } = user
      obj.$store.commit('user/setUserName', userName)
      obj.$store.commit('user/setToken', token)
      obj.$store.commit('user/setErpxerTime', erpxerTime)
      obj.$store.commit('user/setAuthorityList', authorityList)
    } else {
      obj.$store.commit('user/setUserName', '')
      obj.$store.commit('user/setToken', '')
      obj.$store.commit('user/setErpxerTime', '')
      obj.$store.commit('user/authorityList', [])
    }
  },
  // 获取表格数据的通用请求
  getData(obj, url, tableName) {
    let currentPage = obj.currentPage
    let pageSize = obj.currentPageSize
    let effectFlag = obj.effectFlag
    obj.$http.get(url, {
      params: {
        currentPage,
        pageSize,
        effectFlag
      }
    }).then(res => {
      if (res.status === 200 && res.data.status == 0) {
        let { data } = res.data
        obj[tableName] = data["items"]
        obj.loading = false
        obj.total = data.totalNum
      }
    }).catch(err => {
      obj.$message.error('服务器错误，请稍后再试')
      console.log(err)
    })
  },
  postData(obj, url, tableName) {
    let currentPage = obj.currentPage
    let pageSize = obj.currentPageSize
    let effectFlag = obj.effectFlag
    obj.$http.post(url, {
      currentPage,
      pageSize,
      effectFlag
    }).then(res => {
      if (res.status === 200 && res.data.status == 0) {
        let { data } = res.data
        obj[tableName] = data.items
        obj.loading = false
        obj.total = data.totalNum
      }
    }).catch(err => {
      obj.$message.error('服务器错误，请稍后再试')
      console.log(err)
    })
  },
  //获取下拉框中的数据 业务类型 和 状态
  getSeletData(obj, type, status) {
    obj.$http.post(STANDARD_CONFIG_MENU).then(res => {
      if (res.status === 200 && res.data.status == 0) {
        let { data } = res.data
        obj[type] = obj[type].concat(data.businType)
        if (status) {
          obj[status] = data.qcStandard
        }
      }
    })
  },
  //获取筛选维度下拉框
  getDim(obj, dimList) {
    obj.$http.get(STANDARD_DIM).then(res => {
      if (res.status === 200 && res.data.status == 0) {
        let { data } = res.data
        obj[dimList] = data
      }
    }).catch(err => {
      obj.$message.error('服务器错误，请稍后再试')
      console.log(err)
    })
  },
  //获取二级分类下拉框
  changeFirstClass(obj, val) {
    obj.$http.post(STANDARD_FIRSTCLASS, { businType: val }).then(res => {
      if (res.status === 200 && res.data.status == 0) {
        let { data } = res.data
        obj.firstClass = obj.firstClass.concat(data.businSubType)
      }
    }).catch(err => {
      obj.$message.error('服务器错误，请稍后再试')
      console.log(err)
    })
  },
  // 获取批次的类型和状态的下拉数据
  getBatchInfo(obj, batchType, qcType) {
    obj.$http.post(CONVENTION_BATCH_AND_STATUS).then(res => {
      if (res.status === 200 && res.data.status == 0) {
        let { data } = res.data
        obj[batchType] = obj[batchType].concat(data.batchTypeList)
        obj[qcType] = obj[qcType].concat(data.qcStatusList)
      }
    }).catch(err => {
      obj.$message.error('服务器错误，请稍后再试')
      console.log(err)
    })
  },
  //业务类型改变
  typeChange(obj, val, firstClassValue, secondClassValue, firstClass, secondClass, hasAll) {
    obj.$http.post(STANDARD_FIRSTCLASS, { businType: val }).then(res => {
      if (res.status === 200 && res.data.status == 0) {
        let { data } = res.data
        if (secondClass && hasAll && hasAll === 'true') {
          obj[firstClassValue] = "所有"
          obj[secondClassValue] = "所有"
          obj[firstClass] = [{
            businName: null,
            businSubType: "所有",
            businType: null,
            businTypeId: null
          }]
          obj[secondClass] = [{
            businName: "所有",
            businSubType: null,
            businType: null,
            businTypeId: null
          }]
        } else {
          obj[firstClass] = []
          obj[secondClass] = []
          obj[firstClassValue] = ""
          obj[secondClassValue] = ""
        }
        // let businSubType = data.businSubType.slice(1)
        obj[firstClass] = obj[firstClass].concat(data.businSubType)
      }
    }).catch(err => {
      obj.$message.error('服务器错误，请稍后再试')
      console.log(err)
    })
  },
  // 二级下拉框值改变
  secondClassChange(obj, val, secondClassValue, businessTypeValue, secondClass, hasAll) {
    obj.$http.post(STANDARD_SECONDCLASS, { businSubType: val, businType: obj[businessTypeValue] }).then(res => {
      if (res.status === 200 && res.data.status == 0) {
        let { data } = res.data
        if (hasAll && hasAll === 'true') {
          obj[secondClassValue] = "所有"
          obj[secondClass] = [{
            businName: "所有",
            businSubType: null,
            businType: null,
            businTypeId: null
          }]
        } else {
          obj[secondClass] = []
          obj[secondClassValue] = ''
        }
        obj[secondClass] = obj[secondClass].concat(data.businName)
      }
    }).catch(err => {
      obj.$message.error('服务器错误，请稍后再试')
      console.log(err)
    })
  },
  // 对数组版本号做拼接
  formatVersionArr(arr) {
    arr.map(item => {
      if (item.qcStandardVersion)
        item.qcStandardVersion = 'V' + item.qcStandardVersion
    })
  },
  formatVersionStr(str) {
    if (str) {
      let newStr = 'V' + str
      return newStr
    }
  },
  // 对质检业务做拼接
  formatBussine(arr, str) {
    arr.map(item => {
      let list = []
      let newStr = ''
      list.push(item.businKind)
      list.push(item.businSubKind)
      list.push(item.businName)
      if (item.businKind && item.businSubKind && item.businName) {
        newStr = list.join(' > ')
      }
      item[str] = newStr
    })
    return arr
  },
  // 导出excel
  exportRate() {
    return axios({
      url: baseUrl + DEFECTIVE_EXCEL_EXPORT,
      method: 'get',
      responseType: 'blob'  //二进制流
    })
  },
  // 请求出错弹窗(服务器)
  err() {
    Message.error('服务器错误，请稍后再试')
  },
  success(str) {
    Message({
      message: str,
      type: 'success',
      duration: 800
    })
  },
  error(str) {
    Message.error(str)
  },
  warn(str) {
    Message({
      message: str,
      type: 'warning',
      duration: 800
    })
  },
  //获取业务类型
  /**
   * @msg: 
   * @param {object} obj 组件对象
   * @param {String} dataName 获取数据的数组
   * @param {String} levelId 需要获取数据的下拉框的级别id
   * @param {String} hasAll true or false
   * @param {String} parentId 父级下拉框id，如果为一级下拉框则为空字符串
   * @return: 
   */
  getBusin(obj, dataName, levelId, hasAll, parentId) {
    obj[dataName] = hasAll ? [{ businName: '所有' }] : []
    if (parentId) {
      obj.$http.get(STANDARD_BUSIN, {
        params: {
          parentId,
          levelId
        }
      }).then(res => {
        let { data } = res.data
        obj[dataName] = obj[dataName].concat(data)
      })
    } else {
      obj.$http.get(STANDARD_BUSIN, {
        params: {
          levelId
        }
      }).then(res => {
        let { data } = res.data
        obj[dataName] = obj[dataName].concat(data)
      })
    }
  },
  // 业务类型下拉框获取label
  getBusinId(arr, val) {
    let obj = {}
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].businName === val) {
        obj = arr[i]
      }
    }
    return obj.id
  },
  // 要件类型下拉框获取id
  getId(arr, val) {
    let obj = {}
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].markTypeName === val) {
        obj = arr[i]
      }
    }
    return obj.id
  },
  // 业务类型改变
  businTypeChange(obj, businessTypeValue, val, hasAll) {
    if (businessTypeValue != '所有') {
      let id = this.getBusinId(obj.businessType, val)
      obj.businessTypeId = id
      this.getBusin(obj, 'secondClass', '2', hasAll, id)
      if (hasAll) {
        obj.secondClassValue = '所有'
        obj.thirdClassValue = '所有'
        obj.thirdClass = [{ businName: '所有' }]
      } else {
        obj.secondClassValue = ''
        obj.thirdClassValue = ''
        obj.thirdClass = []
      }
    } else {
      if (hasAll) {
        obj.secondClassValue = '所有'
        obj.thirdClassValue = '所有'
        obj.secondClass = [{ businName: '所有' }]
        obj.thirdClass = [{ businName: '所有' }]
      } else {
        obj.secondClassValue = ''
        obj.thirdClassValue = ''
        obj.secondClass = [{ businName: '' }]
        obj.thirdClass = [{ businName: '' }]
      }
    }
  },
  // 二级下拉框改变
  secondClassChange(obj, secondClassValue, val, hasAll) {
    if (secondClassValue != '所有') {
      let id = this.getBusinId(obj.secondClass, val)
      obj.secondClassId = id
      this.getBusin(obj, 'thirdClass', '3', hasAll, id)
      if (hasAll) {
        obj.thirdClassValue = '所有'
      } else {
        obj.thirdClassValue = ''
      }
    } else {
      if (hasAll) {
        obj.secondClassValue = '所有'
        obj.thirdClassValue = '所有'
        obj.thirdClass = [{ businName: '所有' }]
      } else {
        obj.thirdClassValue = ''
        obj.thirdClass = [{ businName: '' }]
      }
    }
  },
  // 三级下拉框改变
  thirdClassChange(obj, thirdClassValue, val) {
    if (thirdClassValue != '所有') {
      let id = this.getBusinId(obj.thirdClass, val)
      obj.thirdClassId = id
    }
  },
  // 配置管理 详情页和新增页的新建要件 查找是否存在,实现添加和取消添加按钮的显示
  checkHas(obj, arr, tableDataName) {
    let dtList = []
    let itemsList = []
    arr.map(item => {
      itemsList.push(item.id)
    })
    if (obj[tableDataName].length > 0) {
      obj[tableDataName].map(item => {
        dtList.push(item.id)
      })
      itemsList.map((item, i) => {
        if (dtList.indexOf(item) >= 0) {
          obj.$set(arr[i], 'isAdd', true)
        } else {
          obj.$set(arr[i], 'isAdd', false)
        }
      })
    } else {
      arr.map(item => {
        obj.$set(item, 'isAdd', false)
      })
    }
  },
  // 配置管理 详情页和新增页 刷新表格数据
  freshTableData(obj, tableDataName_change, tableDataName) {
    let currentPageSize = obj.currentPageSize
    let currentPage = obj.currentPage
    let start = (currentPage - 1) * currentPageSize
    let end = (currentPage - 1) * currentPageSize + currentPageSize
    obj[tableDataName_change] = obj[tableDataName].slice(start, end)
  },
  // 业务类型改变
  i_businTypeChange(obj, businessTypeValue, val, hasAll, str) {
    if (businessTypeValue != '所有') {
      let id = this.getBusinId(obj.i_businessType, val)
      obj.i_businessTypeId = id
      this.getBusin(obj, 'i_secondClass', '2', hasAll, id)
      if (hasAll) {
        obj.secondClassValue = '所有'
        obj.thirdClassValue = '所有'
      } else {
        obj.i_secondClassValue = ''
        obj.i_thirdClassValue = ''
      }
    } else {
      if (hasAll) {
        obj.secondClassValue = '所有'
        obj.thirdClassValue = '所有'
        obj.secondClass = [{ businName: '所有' }]
        obj.thirdClass = [{ businName: '所有' }]
      } else {
        obj.i_secondClassValue = ''
        obj.i_thirdClassValue = ''
        obj.i_secondClass = [{ businName: '' }]
        obj.i_thirdClass = [{ businName: '' }]
      }
    }
  },
  // 二级下拉框改变
  i_secondClassChange(obj, secondClassValue, val, hasAll) {
    if (secondClassValue != '所有') {
      let id = this.getBusinId(obj.i_secondClass, val)
      obj.i_secondClassId = id
      this.getBusin(obj, 'i_thirdClass', '3', hasAll, id)
      if (hasAll) {
        obj.thirdClassValue = '所有'
      } else {
        obj.i_thirdClassValue = ''
      }
    } else {
      if (hasAll) {
        obj.secondClassValue = '所有'
        obj.thirdClassValue = '所有'
        obj.secondClass = [{ businName: '所有' }]
        obj.thirdClass = [{ businName: '所有' }]
      } else {
        obj.i_thirdClassValue = ''
        obj.i_thirdClass = [{ businName: '' }]
      }
    }
  },
  // 三级下拉框改变
  i_thirdClassChange(obj, thirdClassValue, val) {
    if (thirdClassValue != '所有') {
      let id = this.getBusinId(obj.i_thirdClass, val)
      obj.i_thirdClassId = id
    }
  },
  // 获取businTypeId
  getBusinTypeId(obj, str) {
    if (!str) {
      var businessTypeValue = 'businessTypeValue'
      var secondClassValue = 'secondClassValue'
      var thirdClassValue = 'thirdClassValue'
      var businessTypeId = 'businessTypeId'
      var secondClassId = 'secondClassId'
      var thirdClassId = 'thirdClassId'
    } else {
      var businessTypeValue = str + 'businessTypeValue'
      var secondClassValue = str + 'secondClassValue'
      var thirdClassValue = str + 'thirdClassValue'
      var businessTypeId = str + 'businessTypeId'
      var secondClassId = str + 'secondClassId'
      var thirdClassId = str + 'thirdClassId'
    }
    let businessId = obj[businessTypeValue] == "所有" ? "" : obj[businessTypeId]
    let secondId = obj[secondClassValue] == "所有" ? "" : obj[secondClassId]
    let thirdId = obj[thirdClassValue] == "所有" ? "" : obj[thirdClassId]

    let id
    if (businessId && !secondId && !thirdId) {
      id = businessId
    } else if (businessId && secondId && !thirdId) {
      id = secondId
    } else {
      id = thirdId
    }
    return id
  },
  // 去除左右空格
  trim(str) {
    return str.replace(/(^\s*)(\s*$)/g, '')
  },
  /**
   * @param {Object}  obj 组件对象
   * @param {String} id 批次的编号
   * @param {String} orderAmount 批次的订单总数
   * @param {String} eligAmount 批次的合格订单数
   * @param {String} uneligAmount 批次的不合格订单数
   */
  // 初始化echarts
  initEcharts(obj, id, orderAmount, eligAmount, uneligAmount, title) {
    let myChart = obj.$echarts.init(document.getElementById(id))
    myChart.setOption({
      title: {
        text: title,
        subtext: "订单总数(" + orderAmount + ")",
        x: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: ['合格订单数' + '(' + eligAmount + ')', '不合格订单数' + '(' + uneligAmount + ')']
      },
      color: ['#597EF7', '#D81E06'],
      series: [
        {
          name: '订单数量统计',
          type: 'pie',
          radius: '55%',
          center: ['50%', '60%'],
          data: [
            { value: eligAmount, name: '合格订单数' + '(' + eligAmount + ')' },
            { value: uneligAmount, name: '不合格订单数' + '(' + uneligAmount + ')' },
          ],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    });
  }
}
