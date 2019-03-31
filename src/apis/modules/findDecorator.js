import request from '../request'

// 获取找师傅接口
function findDecorator(data) {
  return request({
    url: '/addWorkerMsg',
    method: 'post',
    data: data
  })
}
// 师傅list
function decoratorlists() {
  return request({
    url: '/getUserFindWorkerList',
    method: 'post',
  })
}
// 删除师傅list
function delDecoratorlist(data) {
  return request({
    url: '/userDeleteFindWorker',
    method: 'post',
    data: data
  })
}
// 催单师傅list
function hurryDecoratorlist(data) {
  return request({
    url: '/userHurryFindWorker',
    method: 'post',
    data: data
  })
}
export { findDecorator, decoratorlists, delDecoratorlist, hurryDecoratorlist }
