import axios from '../../src/index'
// axios({
//   url: '/extend/post',
//   method: 'post',
//   data: {
//     msg: 'hi'
//   }
// })

// axios.options('/extend/options')



axios('/extend/post', {
  method: 'post',
  data: {
    msg: 'hello'
  }
})