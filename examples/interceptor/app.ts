import axios from '../../src'
import { AxiosRequestConfig } from '../../src/types'

axios.interceptors.request.use(config => {
  console.log(config, '拦截了1')
  return config
})
axios.interceptors.request.use(config => {
  console.log(config, '拦截了2')
  return config
})

axios.interceptors.response.use(response => {
  console.log(response, '拦截了3')
  return response
})
axios({
  method: 'post',
  url: '/base/post',
  data: {
    a: 1,
    b: 2
  }
})
