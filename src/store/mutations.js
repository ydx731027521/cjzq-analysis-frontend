/**
 * Created by hao.wang on 2017/2/8.
 */
import types from "./types";
import {setAxiosToken} from "../utils/common";

export default {
  [types.MUTATIONS.setUserInfo] (state, userInfo) {
    state.userInfo = userInfo
  },
  [types.MUTATIONS.setToken] (state, token) {
    state.token = token
    setAxiosToken(token)
  },
  [types.MUTATIONS.setLoginNextRoute] (state, loginNextRoute) {
    state.loginNextRoute = loginNextRoute
  },
  [types.MUTATIONS.setCommonInfo] (state, commonInfo) {
    state.commonInfo = commonInfo
  },

}
