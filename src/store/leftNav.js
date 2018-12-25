export default {
  namespaced: true,
  state: {
    list: [],
    activeList: []
  },
  mutations: {
    setLeftNavList(state, list) {
      state.list = list
    },
    setLeftActiveList(state, list) {
      state.activeList = list
    },
    setList(state, list) {
      state.list = list
    }
  }
}