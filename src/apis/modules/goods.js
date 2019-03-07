import request from '../request'
import qs from 'qs'

// 获取商品分类列表
export function getGoodsTypeList(data) {
  return request({
    url: '/v1/goodsTypeList',
    method: 'post',
    data
  })
}
