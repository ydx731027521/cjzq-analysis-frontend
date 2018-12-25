import Vuex from 'vuex';
import Vue from 'vue';
import leftNav from "./leftNav"
import breadCrumb from "./breadCrumb"
import user from "./user"
import topNav from "./topNav"

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    leftNav,
    breadCrumb,
    user,
    topNav
  }
})
