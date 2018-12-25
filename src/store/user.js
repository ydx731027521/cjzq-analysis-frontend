import axios from 'src/axios.js'
import URL from 'api/url'
import util from 'tools/util'
let { REFRESH_TOKEN } = URL
export default {
  namespaced: true,
  state: {
    token: '',
    userName: '',
    erpxerTime: 0,
    authorityList: []
  },
  mutations: {
    setToken(state, token) {
      state.token = token
    },
    setUserName(state, userName) {
      state.userName = userName
    },
    setErpxerTime(state, erpxerTime) {
      state.erpxerTime = erpxerTime
    },
    setAuthorityList(state, authorityList) {
      state.authorityList = authorityList
    }
  },
  actions: {
    refeshToken({ commit }) {
      axios.get(REFRESH_TOKEN).then(res => {
        let { erpxerTime, token } = res.data.data
        commit('setErpxerTime', erpxerTime)
        commit('setToken', token)
        let user = util.getSession()
        util.setSession(user.userName, user.token, user.erpxerTime, user.authorityList)
      })
    }
  }
}