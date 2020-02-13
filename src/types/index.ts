import Axios from '../core/axios'
export interface AxiosRequestConfig {
  url?: string
  method?: Method
  data?: any
  params?: any
  headers?: any
  responseType?: XMLHttpRequestResponseType // 它的定义是 "" | "arraybuffer" | "blob" | "document" | "json" | "text" 字符串字面量类型
  timeout?: number
  [propName: string]: any
}

export type Method =
  | 'get'
  | 'GET'
  | 'delete'
  | 'DELETE'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'post'
  | 'POST'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'

export interface AxiosResponse {
  data: any
  status: number
  statusText: string
  headers: any
  config: AxiosRequestConfig
  request: any
}

export interface AxiosError extends Error {
  config: AxiosRequestConfig
  code?: string
  request?: any
  response?: AxiosResponse
  isAxiosError: boolean
}

// 使 axios 返回的promise.resolve 参数是一个 AxiosResponse对象
export interface AxiosPromise extends Promise<AxiosResponse> {}

// 扩展axios 对象
// export interface Axios {
//   request(config: AxiosRequestConfig): AxiosPromise
//   get(url: string, config?: AxiosRequestConfig): AxiosPromise
//   delete(url: string, config?: AxiosRequestConfig): AxiosPromise
//   head(url: string, config?: AxiosRequestConfig): AxiosPromise
//   options(url: string, config?: AxiosRequestConfig): AxiosPromise
//   post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise
//   put(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise
//   patch(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise
// }

export interface AxiosInstance extends Axios {
  (config: AxiosRequestConfig): AxiosPromise // 接口定义构造函数
  (url: string, config?: AxiosRequestConfig): AxiosPromise
}

export interface AxiosInterceptorManager<T> {
  use(resolved: ResolvedFn<T>, rejected?: RejectedFn): number
}

export interface ResolvedFn<T = any> {
  (val: T): T | Promise<T>
}

export interface RejectedFn {
  (error: any): any
}

export interface AxiosStatic extends AxiosInstance {
  create(config?: AxiosRequestConfig): AxiosInstance
}
