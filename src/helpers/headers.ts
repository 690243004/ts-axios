import { isPlainObject, deepMerge } from './util'
import { Method } from '../types'

function normalizeHeaderName(headers: any, normalizedName: string): void {
  if (!headers) {
    return
  }
  // 序列化headers属性
  Object.keys(headers).forEach(name => {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = headers[name]
      delete headers[name]
    }
  })
}

export function processHeaders(headers: any, data: any): any {
  normalizeHeaderName(headers, 'Content-Type')
  if (isPlainObject(data)) {
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8' // 添加默认首部
    }
  }
  return headers
}

// 处理响应首部
export function parseHeaders(headers: string): any {
  let parsed = Object.create(null)
  if (!headers) {
    return parsed
  }
  // 根据空行隔开
  headers.split('\r\n').forEach(line => {
    // 首部的格式是这样的 首部名:指令参数1,指令参数2
    // 例如 : Content-Type:private,max-age=0,no-cache
    let [key, ...vals] = line.split(':')
    key = key.trim().toLowerCase()
    if (!key) {
      return
    }
    let val = vals.join(':').trim()
    parsed[key] = val
  })
  return parsed
}

// 经过合并默认配置对象后，有些首部可能变成了这样
// headers: {
//   common: {
//     Accept: 'application/json, text/plain, */*'
//   },
//   post: {
//     'Content-Type':'application/x-www-form-urlencoded'
//   }
// }
// 需要将其变为一级
// headers: {
//   Accept: 'application/json, text/plain, */*',
//  'Content-Type':'application/x-www-form-urlencoded'
// }
// 但是也需要对应得method

export function flattenHeaders(headers: any, method: Method): any {
  if (!headers) {
    return headers
  }
  headers = deepMerge(headers.common || {}, headers[method] || {}, headers)
  const methodsToDelete = ['delete', 'get', 'head', 'options', 'post', 'put', 'patch', 'common']
  methodsToDelete.forEach(method => {
    delete headers[method]
  })
  return headers
}
