import axios from 'axios';
import { baseUrl } from '../config/env';

// create an axios instance
const baseConfig = {
  baseURL: baseUrl.replace(/\/api/, ''), // api的base_url
  withCredentials: true,
  timeout: 5000, // 请求超时时间
}

const service = axios.create(baseConfig)

// request interceptor
service.interceptors.request.use(config => {
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone interceptor
service.interceptors.response.use(response => {
  return response
}, error => {
  return Promise.reject(error);
})

export default service
