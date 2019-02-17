import request from '../request'
import qs from 'qs'

// 获取装修案例接口
function decoration(data) {
    return request({
      url: '/v1/caseList',
      method: 'post',
      data:data
    })
  }
export {decoration}