import request from '../baseReq'

// 获取banner接口
export function getWechatSign(data) {
  return request({
    url: '/wechat/get-wechat-sign',
    method: 'post',
    data
  })
}

// 获取 微信个人信息确认页面接口
export function getWechatOAuth(url) {
  alert(url.target)
  return request({
    url: `/wechat/wx-oauth?target=${encodeURIComponent(url.target)}`,
    method: 'get'
  })
}

// 获取微信个人信息
export function getWechatInfo(data) {
  return request({
    url: `/wechat/userinfo?code=${data.code}`,
    method: 'get'
  })
}
