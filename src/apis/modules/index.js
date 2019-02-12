import request from '../request'
import qs from 'qs'

// 获取banner接口
export function getBanner() {
  return request({
    url: '/v1/banner',
    method: 'get'
  })
}
