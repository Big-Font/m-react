import request from '../request'

// 获取装修案例接口
export function decoration(data) {
  return request({
    url: '/v1/caseList',
    method: 'post',
    data:data
  })
}

export function caseDetail(data) {
  return request({
    url: '/v1/caseDetail',
    method: 'post',
    data:data
  })
}


// export {decoration}
