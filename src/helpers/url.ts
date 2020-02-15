import { isDate, isObject, isURLSearchParams } from './util'

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

export function buildURL(
  url: string,
  params?: any,
  paramsSerializer?: (params: any) => string
): string {
  if (!params) {
    return url
  }
  const parts: string[] = []
  let serializedParams

  if (paramsSerializer) {
    serializedParams = paramsSerializer(params)
  } else if (isURLSearchParams(params)) {
    serializedParams = params.toString()
  } else {
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
        } else if (isObject(item)) {
          item = JSON.stringify(item)
        }
        parts.push(`${encode(key)}=${encode(item)}`)
      })
      // 如果是数组格式，最终会变成 bar[]=1&bar[]=2&bar[]=3...
    })
    serializedParams = parts.join('&')
    // console.log(serializedParams,'????????')
  }

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

interface URLOrigin {
  protocol: string
  host: string
}
// 同域名判断
// 通过传入的url，将其设置为一个a标签的url，然后获取该DOM的protocol、host
// 传入url可以通过 axios({url:''})拿到
// 当前页面的url可以通过window.location.href拿到

export function isURLSameOrigin(requestURL: string): boolean {
  const parsedOrigin = resolveURL(requestURL)
  return (
    parsedOrigin.protocol === currentOrigin.protocol && parsedOrigin.host === currentOrigin.host
  )
}

const urlParsingNode = document.createElement('a')
const currentOrigin = resolveURL(window.location.href)

function resolveURL(url: string): URLOrigin {
  urlParsingNode.setAttribute('href', url)
  const { protocol, host } = urlParsingNode
  return {
    protocol,
    host
  }
}

export function isAbsoluteURL(url: string): boolean {
  // http://
  // :// 都行
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url)
}

export function combineURL(baseURL: string, relativeURL?: string): string {
  // zdxhyangyan.cn/ -> zdxhyangyan.cn
  // /get/baseList -> get/baseList
  // zdxhyangyan.cn/get/baseList
  return relativeURL ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '') : baseURL
}
