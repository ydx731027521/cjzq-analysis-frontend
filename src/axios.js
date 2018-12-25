import axios from "axios"
import { store } from "./store/index.js"
import CONSTANT from './api/constant'
import baseUrl from './setBaseUrl'
import { Message } from 'element-ui'
import router from './router'

let { TOKEN_TIMEOUT } = CONSTANT

const Axios = axios.create({
  baseURL: baseUrl
})

Axios.interceptors.request.use(config => {
  let { token } = store.state.user
  // config.method === 'post'
  //   ? config.data = qs.stringify({ ...config.data })
  //   : config.params = { ...config.params };

  if (token) {
    config.headers['Authorization'] = "Bearer " + token
  }
  return config
},
  err => {
    return Promise.reject(err)
  }
)

Axios.interceptors.response.use(
  response => {
    if (response.status === 200 && response.data.status === -5) {
      router.push('/log')
    }

    if (store.state.user.erpxerTime) {
      let currentTime = (new Date()).getTime()
      let { erpxerTime } = store.state.user
      // console.log(TOKEN_TIMEOUT)
      // console.log(erpxerTime - currentTime)
      if ((erpxerTime - currentTime) < TOKEN_TIMEOUT) {
        store.dispatch('user/refeshToken')
      }
    }
    return response
  },
  error => {
    return Promise.reject(error)
  }
)

export default Axios
