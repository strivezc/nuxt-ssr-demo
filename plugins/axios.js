import { Message } from 'element-ui'

export default function ({ app: { $axios, $cookies,redirect,store } }) {
	$axios.defaults.baseURL = process.env.API_URL
	$axios.defaults.timeout = 60000
	$axios.interceptors.request.use(config => {
		config.headers.token = $cookies.get('token') || ''
		return config
	})
	$axios.interceptors.response.use(response => {
	  const res=response.data
      if (res.resultCode !== 0) {
        if (res.resultCode === 3 || res.resultCode === -5) {
          if (response.config.hideMessage) {
            return Promise.reject(res || 'Error')
          } else {
            Message({
              type: 'error',
              message: res.resultMessage,
            })
          }
        } else if (res.resultCode === -1) {
          if (response.config.hideMessage) {
            return Promise.reject(res || 'Error')
          } else {
            Message({
              type: 'error',
              message: res.resultMessage,
            })
            store.dispatch('user/reset')
            redirect('/login')
          }
        } else {
          Message({
            type: 'error',
            message: '网络连接不佳,请稍后重试!',
          })
        }
        return Promise.reject(res || 'Error')
      } else {
        return res
      }
	},
  (err) => {
    // 请求超时，设置重新请求及错误提示
    Message({
      type: 'error',
      message: (err && err.data && err.data.msg) || '网络连接不佳,请稍后重试!',
    })
    return Promise.reject(err)
  },)
}
