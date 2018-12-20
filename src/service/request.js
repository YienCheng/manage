import axios from 'axios'
import { Message } from 'iview'
import Qs from 'qs'
// baseUrl
axios.defaults.baseURL = '/api'

// 指定请求超时时间
axios.defaults.timeout = 10000

// 设置跨域时允许携带cookie
axios.defaults.withCredentials = true

// 设置post请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  config.headers['X-Requested-With'] = 'XMLHttpRequest'
  let params = {
    timer: new Date().getTime()
  }
  if (config.method === 'post') {
    let parseData = Qs.parse(config.data)
    // 过滤空参数
    Object.keys(parseData).forEach(key => {
      if (parseData[key]) {
        params[key] = parseData[key]
      }
    })
    config.data = Qs.stringify(params)
  }
  if (config.method === 'get') {
    let parseData = config.params || {}
    Object.keys(parseData).forEach(key => {
      if (parseData[key]) {
        params[key] = parseData[key]
      }
    })
    config.params = params
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  if (response.data.code !== 0) {
    Message.error(response.data.message)
  }
  return response
}, function (error) {
  // 对响应错误做点什么
  if (error.request.status === 401) {
    location.href = 'http://localhost:3000/user/login'
  }
  Message.error(`${error.request.status}  ${error.request.statusText}`)
  return Promise.reject(error)
})
/**
 * get请求方法
 *
 * @export
 * @param {String} url 请求地址
 * @param {Object} params 请求参数
 * @param {any} log 暂时没用
 * @returns
 */
export function requestGet (url, params, log) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    })
      .then(response => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

/**
 * Post请求方法
 *
 * @export
 * @param {String} url 请求地址
 * @param {Object} params 请求参数
 * @param {'payload' || [null]} payload 传原始对象还是stringify对象
 * @returns
 */
export function requestPost (url, params, payload) {
  console.log(params)
  params = payload === 'payload' ? params : Qs.stringify(params)
  return new Promise((resolve, reject) => {
    axios.post(url, params)
      .then(response => {
        resolve(response.data)
      }).catch(error => {
        reject(error)
      })
  })
}
