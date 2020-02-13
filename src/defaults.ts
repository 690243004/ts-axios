import { AxiosRequestConfig } from './types'

// 定义默认的 config
const defaults: AxiosRequestConfig = {
  method: 'get',
  timeout: 0,
  headers: {
    common: {
      Accept: 'application/json, text/plain, */*'
    }
  }
}

// 这些方法是没有data
const methodsNoData = ['delete', 'get', 'head', 'options']

// 遍历这些方法
methodsNoData.forEach(method => {
  // 使它的首部 header.delete = {}
  defaults.headers[method] = {}
})

// 定义有data 的方法
const methodsWithData = ['post', 'put', 'patch']

//
methodsWithData.forEach(method => {
  // 使它的首部 header.post = { 'Content-Type': 'application/x-www-form-urlencoded' }
  defaults.headers[method] = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})
// 我估计后续会做一些处理吧

export default defaults
