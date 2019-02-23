import request from '../request'
//个人信息
function personInfo() {
  return request({
    url: '/getUserInfo',
    method: 'post',
  })
}
//修改个人信息
function changePersonSomeInfo (data) {
    return request({
      url: '/modeifymUserInfo',
      method: 'post',
      data:data
    })
}
export {personInfo,changePersonSomeInfo}
