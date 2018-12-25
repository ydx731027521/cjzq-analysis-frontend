export default {
  namespaced: true,
  state: {
    firstClass: '导航1',
    secondClass: '',
    thirdClass: ''
  },
  mutations: {
    setFirstClass(state, value) {
      state.firstClass = value
    },
    setSecondClass(state, value) {
      state.secondClass = value
    },
    setThirdClass(state, value) {
      state.thirdClass = value
    }
  },
  getters: {
    list(state) {
      let arr = []
      if (state.firstClass) {
        arr.push(state.firstClass)
      }
      if (state.secondClass) {
        arr.push(state.secondClass)
      }
      if (state.thirdClass) {
        arr.push(state.thirdClass)
      }
      return arr
    }
  }
}