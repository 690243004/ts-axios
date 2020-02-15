// import { AxiosRequestConfig, AxiosResponse } from './types'
// import xhr from './core/xhr'
// import { buildURL } from './helpers/url'
// import { transformRequest, transformResponse } from './helpers/data'
// import { processHeaders } from './helpers/headers'

// function axios(config: AxiosRequestConfig) {
//   processConfig(config)
//   return xhr(config).then(res => {
//     return transformResponseData(res)
//   })
// }

// export default axios

// function processConfig(config: AxiosRequestConfig): void {
//   config.url = transformUrl(config)
//   config.headers = transformHeaders(config)
//   config.data = transformRequestData(config)
// }

// function transformUrl(config: AxiosRequestConfig): string {
//   const { url = '', params } = config
//   return buildURL(url, params)
// }

// function transformRequestData(config: AxiosRequestConfig): any {
//   return transformRequest(config.data)
// }

// function transformHeaders(config: AxiosRequestConfig) {
//   const { headers = {}, data } = config
//   return processHeaders(headers, data)
// }

// function transformResponseData(res: AxiosResponse): AxiosResponse {
//   res.data = transformResponse(res.data)
//   return res
// }

import { AxiosStatic, AxiosRequestConfig } from './types'
import Axios from './core/axios'
import { extend } from './helpers/util'
import defaults from './defaults'
import mergeConfig from './core/mergeConfig'
import CancelToken from './core/cancelToken'
import Cancel, { isCancel } from './core/cancel'

function createInstance(config: AxiosRequestConfig): AxiosStatic {
  // 这里我们创建一个实例
  const context = new Axios(config)
  // 我们希望 instance() 调用request方法，又希望可以调用instance.post()等方法
  const instance = Axios.prototype.request.bind(context)
  // 所以我们将该方法拷贝出来 并于context混合
  extend(instance, context)
  // 由于typescript 不能正确识别该属性 所以需要断言
  return instance as AxiosStatic
}

const axios = createInstance(defaults)

axios.create = function create(config) {
  return createInstance(mergeConfig(defaults, config))
}

axios.CancelToken = CancelToken
axios.Cancel = Cancel
axios.isCancel = isCancel
export default axios
