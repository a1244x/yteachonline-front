import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import cookie from 'js-cookie'
// 创建axios实例
const service = axios.create({
  baseURL: 'http://localhost:8222', // api的base_url
  timeout: 20000 // 请求超时时间
})
service.interceptors.request.use(
  config => {
  //debugger
  if (cookie.get('yt_token')) {
    config.headers['token'] = cookie.get('yt_token');
  }
    return config
  },
  err => {
  return Promise.reject(err);
})

// response 拦截器
service.interceptors.response.use(
    response => {
      /**
       * code为非20000是抛错 可结合自己业务进行修改
       */
      const res = response.data
      // debugger
      if (res.code !== 20000) {
        Message({
          message: res.message,
          type: 'error',
          duration: 5 * 1000
        })
        return Promise.reject('error')
      } else {
        return response.data
      }
    },
    error => {
      console.log('err' + error) // for debug
      Message({
        message: error.message,
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(error)
    }
  )

export default service