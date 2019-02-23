import request from '../request'
import qs from 'qs'

// 获取banner接口
export function querySpikeDetail(data) {
  return request({
    url: '/v1/querySpikeDetail',
    method: 'post',
    data
  })
}
