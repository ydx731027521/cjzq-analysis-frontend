export default {
  namespaced: true,
  state: {
    activeIndex: 0,
    topNav: []
  },
  mutations: {
    setActiveIndex(state, activeIndex) {
      state.activeIndex = activeIndex
    },
    setTopNav(state, topNav) {
      state.topNav = topNav
    }
  }
}
