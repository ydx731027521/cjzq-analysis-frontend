const namespace = 'app/'

export default {
  GETTERS: {
    logged: namespace + 'logged',
    token: namespace + 'token',
    /**
     * 当前权限
     */
    commonInfo: namespace + 'commonInfo',
    permission: namespace + 'permission',
    userInfo: namespace + 'userInfo',
    loginNextRoute: namespace + 'loginNextRoute',
  },
  ACTIONS: {
    loginOut: namespace + 'loginOut',
  },
  MUTATIONS: {
    setUserInfo: namespace + 'setUserInfo',
    setToken: namespace + 'setToken',
    setCommonInfo: namespace + 'setCommonInfo',
    setLoginNextRoute: namespace + 'setLoginNextRoute',
  }
}
