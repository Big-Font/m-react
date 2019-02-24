import request from '../request'
import { func } from 'prop-types';
//个人信息
function personInfo() {
  return request({
    url: '/getUserInfo',
    method: 'post',
  })
}
//上传图片
function uploadAjax () {
  return request({
    url: '/upload',
    method: 'post',
    headers:{
      "Authorization":"Bearer " + localStorage.QR_TOKEN,
    },
  })
}
//修改个人信息
function changePersonSomeInfo (data) {
    return request({
      url: '/modeifymUserInfo',
      method: 'post',
      data:data,
    })
}
export {personInfo,changePersonSomeInfo,uploadAjax}
