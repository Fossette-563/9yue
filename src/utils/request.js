import axios from 'axios'
import store from '@/store'

const instance = axios.create({
  baseURL: process.env.VUE_APP_API,
  timeout: 5000
})

// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    const token = store.getters.token
    if (token) {
      config.headers.token = token
    }
    // 在发送请求之前做些什么
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    const {
      data: { data },
      status
    } = response
    if (status === 200) {
      return data
    }
    // 对响应数据做点什么
    return response
  },
  function (error) {
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)

// 统一传参
const requset = (options) => {
  if (options.method.toLowerCase() === 'get') {
    options.params = options.data || {}
  }
  return instance(options)
}

export default requset
