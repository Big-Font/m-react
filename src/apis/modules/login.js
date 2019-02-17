import request from '../request'
import qs from 'qs'

// 获取banner接口
function login(data) {
  return request({
    url: '/v1/login',
    method: 'post',
    data:data
  })
}
//登录图形验证码
function getPicCode() {
    return request({
      url: '/v1/captcha',
      method: 'get',
    })
  }
export {login,getPicCode}
