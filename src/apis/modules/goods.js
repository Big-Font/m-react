import request from '../request'
import qs from 'qs'

// 获取商品分类列表
export function getGoodsTypeListAPI(data) {
  return request({
    url: '/v1/goodsTypeList',
    method: 'post',
    data
  })
}

// 查询商品列表
export function getGoodsAPI(data) {
  return request({
    url: '/v1/getGoods',
    method: 'post',
    data
  })
}

// 根据商品id查询商品详情
export function getGoodDetailAPI(data) {
  return request({
    url: '/v1/getGoodDetail',
    method: 'post',
    data
  })
}
