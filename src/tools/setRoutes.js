
import router from '../router'
import { constantRouterMap } from '../router/router'
import { store } from '../store/index'
/**
 * 通过meta.roles判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  // 如有有meta，并且meta中有roles
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.indexOf(role) >= 0)
  } else {
    return true
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles
 */
export const filterRouter = function (routerMap, roles) {
  const accessedRouters = routerMap.filter(route => {
    if (hasPermission(roles, route)) {
      if (route.children && route.children.length) {
        route.children = filterRouter(route.children, roles)
      }
      return true
    }
    return false
  })
  return accessedRouters
}

// 生成头部导航
export const setTopNav = function (arr) {
  let root = arr.slice(1)
  let headerNavList = []
  let list = root[0].children
  list.forEach(item => {
    let obj = {}
    obj.text = item.name
    obj.dataName = item.meta
    headerNavList.push(obj)
  })
  return headerNavList
}

// 生成左侧导航
export const setLeftNav = function (arr) {
  let root = arr.slice(1)
  let list = root[0].children
  let leftNavList = []
  list.forEach(item => {
    let arr = []
    item.children.forEach(citem => {
      if (citem.meta && citem.meta.icon) {
        let obj = {}
        obj.route = '/' + item.path + '/' + citem.path
        obj.name = citem.name
        obj.icon = citem.meta.icon
        arr.push(obj)
      }
    })
    leftNavList.push(arr)
  })
  return leftNavList
}

// let user = JSON.parse(sessionStorage.getItem('user'))
// if (user) {
//   let { authorityList } = user
// let routes = filterRouter(constantRouterMap, authorityList)
// router.addRoutes(routes)
// let headerNavList = setTopNav(routes)
// let leftNavList = setLeftNav(routes)
// store.commit('topNav/setTopNav', headerNavList)
// store.commit('leftNav/setLeftNavList', leftNavList)
// store.commit('leftNav/setLeftActiveList', leftNavList[0])
// }

export const setRoutes = function () {
  let user = JSON.parse(sessionStorage.getItem('user'))
  let { authorityList } = user
  let routes = filterRouter(constantRouterMap, authorityList)
  router.addRoutes(routes)
  let headerNavList = setTopNav(routes)
  let leftNavList = setLeftNav(routes)
  store.commit('topNav/setTopNav', headerNavList)
  store.commit('leftNav/setLeftNavList', leftNavList)
  store.commit('leftNav/setLeftActiveList', leftNavList[0])
}