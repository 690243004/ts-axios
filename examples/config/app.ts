import axios from '../../src'

axios.defaults.headers.common['Access-Token'] = 222333

axios({
  url: '/config/post',
  method: 'post',
  data: {
    a : 1
  },
  headers: {
    test: '321'
  }
}).then((res) => {
  console.log(res.data)
})