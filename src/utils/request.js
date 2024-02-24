import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'
import router from '@/router'
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // 基础地址
  timeout: 10000
})
// 请求拦截器 可以携带公共参数token
service.interceptors.request.use((config) => {
  // 注入token
  // store.getters.token => 请求头里面
  if (store.getters.token) {
    config.headers.Authorization = `Bearer ${store.getters.token}`
  }
  return config // 必须return 否则返回undefined
}, (error) => {
  // 失败执行promise
  return Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use((response) => {
  // axios默认包裹了data
  const { data, message, success } = response.data
  if (success) {
    return data
  } else {
    Message({ type: 'error', message })
    return Promise.reject(new Error(message))
  }
}, async(error) => {
  if (error.response.status === 401) {
    await store.dispatch('user/logout') // 调用清除token以及用户数据
    router.push('/login') // 跳转主页
  }
  // 里面是个对象
  Message({ type: 'error', message: error.message })
  return Promise.reject(error)
})
export default service
