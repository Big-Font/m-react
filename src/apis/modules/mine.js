import request from '../request'
import qs from 'qs'

//个人信息
function personInfo() {
  return request({
    url: '/getUserInfo',
    method: 'post',
  })
}
//上传图片
function uploadAjax (data, path) {
  return request({
    url: `/upload/${data}`,
    method: 'post',
    headers:{
      "Authorization":"Bearer " + localStorage.QR_TOKEN,
    },
    data: qs.stringify(data)
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
