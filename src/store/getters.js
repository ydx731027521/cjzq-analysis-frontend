import types from './types'

let getters = {}
export default getters

getters[types.GETTERS.logged] = state => !!state.userInfo
getters[types.GETTERS.permission] = state => ((state.userInfo || {}).permission || {}).name
getters[types.GETTERS.userInfo] = state => state.userInfo
getters[types.GETTERS.token] = state => state.token
getters[types.GETTERS.loginNextRoute] = state => state.loginNextRoute
getters[types.GETTERS.commonInfo] = state => state.commonInfo


