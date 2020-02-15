import axios from '../../src'
import CancelToken from '../../src/core/cancelToken'

let cancel 

// 实际上这种xhr是异步发送的 也就是包裹了promise发送的
axios({
  method: 'get',
  url: '/cancel/get',
  data: {
    a: 1,
    b: 2
  },
  CancelToken : new CancelToken(c=> {cancel = c })
}).then(response=> { 
  console.log(response,'啊啊啊')
}).catch(e=>{
  console.log(JSON.stringify(e))
  console.log(axios.isCancel(e),'是否为cancel')
}) 
// 所以这里必须使用setTimeout
setTimeout(() => {
  console.log(cancel('草泥马'))
});