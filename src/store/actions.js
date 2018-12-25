import  types from './types'
let actions = {}
export default actions

actions[types.ACTIONS.loginOut] = ({commit}) => {
  commit(types.MUTATIONS.setUserInfo, null)
  commit(types.MUTATIONS.setToken, null)
}

