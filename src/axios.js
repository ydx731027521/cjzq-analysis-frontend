import axios from "axios"
import {
  store
} from "./store/index.js"
import CONSTANT from './api/constant'
import baseUrl from './setBaseUrl'
import util from 'tools/util'
import router from './router'
import URL from 'api/url'
let {
  BUSIN_INFO_INSERT,
  CHANGE_BUSINTYPE,
  BUSIN_ACTIVE
} = URL

let flag = 0
let businInfoInsertList = BUSIN_INFO_INSERT.split('/')
let changeBusintypeList = CHANGE_BUSINTYPE.split('/')
let businActiveList = BUSIN_ACTIVE.split('/')

let businInfoInsert = businInfoInsertList[businInfoInsertList.length - 1]
let changeBusintype = changeBusintypeList[changeBusintypeList.length - 1]
let businActive = businActiveList[businActiveList.length - 1]


let {
  TOKEN_TIMEOUT
} = CONSTANT

const Axios = axios.create({
  baseURL: baseUrl,
})

const downAxios = axios.create({
  baseURL: baseUrl,
  timeout: 20 * 60 * 1000
})

Axios.interceptors.request.use(config => {
    let {
      token
    } = store.state.user
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
    let urlList = response.request.responseURL.split('/')
    let url = urlList[urlList.length - 1]

    let path = JSON.parse(sessionStorage.getItem('path'))

    if (response.status === 200 && response.data.status === -10) {
      router.push('/log')
      util.error(response.data.message)
    }

    if (response.status === 200 && response.data.status === -5) {
      // if (url == businInfoInsert || url == changeBusintype || url == businActive) {
      //   util.error("该系统处于清洗或跑批中")
      // } else {
      // router.push(path)
      util.error(response.data.message)
      // }
    }

    // let urlList = response.request.responseURL.split('/')
    // let responsePath = urlList[urlList.length - 1]
    // let currTimeList = SERVER_CURRTIME.split('/')
    // let currTimePath = currTimeList[currTimeList.length - 1]
    // if (responsePath != currTimePath) {
    // Axios.get(SERVER_CURRTIME).then(res => {
    //   if (res.status === 200 && res.data.status === 0) {
    //     if (store.state.user.erpxerTime) {
    //       let { erpxerTime } = store.state.user
    //       let currentTime = res.data.data
    //       if ((erpxerTime - currentTime) < TOKEN_TIMEOUT) {
    //         store.dispatch('user/refeshToken')
    //       }
    //     }
    //   }
    // })
    // }
    if (store.state.user.erpxerTime) {
      let currentTime = (new Date()).getTime()
      let {
        erpxerTime
      } = store.state.user
      if ((erpxerTime - currentTime) < TOKEN_TIMEOUT) {
        store.dispatch('user/refeshToken')
      }
    }
    return response
  },
  err => {
    return Promise.reject(err)
  }
)

export default Axios