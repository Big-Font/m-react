import request from '../request'
import qs from 'qs'

// 获取验证码接口
function getEmailCode(data) {
    return request({
      url: '/v1/mailVerify',
      method: 'post',
      data:data
    })
  }
//注册接口
function register(data) {
  return request({
    url: '/v1/register',
    method: 'post',
    data:data
  })
}
export {register,getEmailCode}