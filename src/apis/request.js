import axios from 'axios';
import { baseUrl } from '../config/env';
import { message } from 'antd';
// import { Toast } from 'antd-mobile';

// create an axios instance
const baseConfig = {
  baseURL: baseUrl, // api的base_url
  withCredentials: true,
  timeout: 5000, // 请求超时时间
}

const service = axios.create(baseConfig)

// request interceptor
service.interceptors.request.use(config => {
  // Toast.loading('Loading...', 30, () => {
  //   console.log('Load complete !!!');
  // });
  // Do something before request is sent
  if (localStorage.getItem('QR_TOKEN')) {
    config.headers['Authorization'] = `Bearer ${localStorage.getItem('QR_TOKEN')}` // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone interceptor
service.interceptors.response.use(response => {
  // Toast.hide();
  // Toast.fail(response.data.msg, 4);
  // 程序级别的错误提示 tost 提示对应后台msg
  if(response.data.code !== 0 && response.data.msg) {
    console.log('进入相应拦截器错误处理了');
    // Toast.fail(response.data.msg, 4);
    message.error(response.data.msg, 5);
  }
  return response
}, error => {
  if(error.response){
    switch(error.response.status) {
      case 401:
        // 登录过期，清除token
        localStorage.removeItem('QR_TOKEN');
        window.location.reload();
        break;
    }
  }
  return Promise.reject(error);
})

export default service
