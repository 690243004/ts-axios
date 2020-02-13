import { isPlainObject } from './util'
export function transformRequest(data: any): any {
  // 如果是对象类型 做一层转换
  // 为什么不用isObject ?
  // 因为对于 FormData、ArrayBuffer 这些类型，isObject 判断也为 true
  // 对于这些数据类型 我们并不需要处理
  if (isPlainObject(data)) {
    return JSON.stringify(data)
  }
  return data
}

// 当服务端返回一个sting类型，我们尝试去解析它
export function transformResponse(data: any) {
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data)
    } catch (e) {
      // do something
    }
  }
  return data
}
