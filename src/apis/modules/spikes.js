import request from '../request'
import qs from 'qs'

// 秒杀活动列表接口
export function spikeActiveList(data) {
  return request({
    url: '/v1/spikeActiveList',
    method: 'post',
    data
  })
}

// 秒杀活动详情接口
export function querySpikeDetail(data) {
  return request({
    url: '/v1/querySpikeDetail',
    method: 'post',
    data
  })
}
