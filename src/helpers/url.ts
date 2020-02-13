import { isDate, isObject } from './util'

function encode(val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

export function buildURL(url: string, params?: any): string {
  if (!params) {
    return url
  }
  const parts: string[] = []
  Object.keys(params).forEach(key => {
    // 处理params 的成员变量
    let val = params[key]
    if (val === null || typeof val === 'undefined') {
      return
    }
    // 定义一个字符串数组
    let values: string[]
    // 如果该成员变量的值是数组
    if (Array.isArray(val)) {
      // 将该数组赋值给values
      values = val
      // key加一个后缀 : []
      key += '[]'
    } else {
      // 成员变量不是数组，则将其push 进去values
      values = [val]
    }
    values.forEach(item => {
      if (isDate(item)) {
        item = item.toISOString()
      } else if (isObject(val)) {
        item = JSON.stringify(item)
      }
      parts.push(`${encode(key)}=${encode(item)}`)
    })
    // 如果是数组格式，最终会变成 bar[]=1&bar[]=2&bar[]=3...
  })
  let serializedParams = parts.join('&')
  if (serializedParams) {
    const markIndex = url.indexOf('#')
    if (markIndex !== -1) {
      url = url.slice(0, markIndex)
    }
    // 这里判断url是否已经有index了
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
  }
  return url
}
