// 基于axios的模块
import axios from 'axios'

const $axios = axios.create({
  baseURL: 'http://localhost:3000/',
  withCredentials: true
})
// axios.defaults.withCredentials = true
axios.interceptors.response.use(
  res => {
    /* 可在这里根据返回的状态码做一些拦截操作 */
    return res
  }, err => {
    return Promise.resolve(err)
  }
)

export default $axios
