import axios from '../../src/index'

axios
  .post(
    '/more/post',
    {
      a: 1
    },
    {
      auth: {
        username: 'Yee',
        password: '123456'
      },
      validateStatus(status) {
        return status >= 200 && status < 404
      }
    }
  )
  .then(res => {
    console.log(res)
  })
