import request from '../request'

// 获取找师傅接口
function findDecorator(data) {
    return request({
      url: '/addWorkerMsg',
      method: 'post',
      data:data
    })
}
// 师傅list
function decoratorlists() {
  return request({
    url: '/getUserFindWorkerList',
    method: 'post',
  })
}
export {findDecorator,decoratorlists}
