import axios from 'axios'
import { baseUrl } from '../config/env'

// create an axios instance
const baseConfig = {
  baseURL: baseUrl, // api的base_url
  withCredentials: true,
  timeout: 5000, // 请求超时时间
}

const service = axios.create(baseConfig)

// request interceptor
service.interceptors.request.use(config => {
  // Do something before request is sent
  if (sessionStorage.getItem('QR_TOKEN')) {
    config.headers['Authorization'] = `Bearer ${sessionStorage.getItem('QR_TOKEN')}` // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone interceptor
service.interceptors.response.use(response => {
  if(response.data.code !== 0) {
    console.log('进入相应拦截器错误处理了')
  }
  return response
}, error => {
  switch(error.response.status) {
    case 401:
      // 登录过期，清除token
      sessionStorage.removeItem('QR_TOKEN');
      // window.location.reload();
      break;
  }
  console.log('err' + error) // for debug
  return Promise.reject(error)
})

export default service
