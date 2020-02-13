import { isPlainObject } from './util'

function normalizeHeaderName(headers: any, normalizedName: string): void {
  if (!headers) {
    return
  }
  // 序列化headers属性
  Object.keys(headers).forEach(name => {
    if (name !== normalizedName && name.toUpperCase() !== normalizedName.toUpperCase()) {
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
    let [key, val] = line.split(':')
    key = key.trim().toLowerCase()
    if (!key) {
      return
    }
    if (val) {
      val = val.trim()
    }
    parsed[key] = val
  })
  return parsed
}
