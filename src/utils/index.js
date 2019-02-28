/*
*   url查询参数整理器
*/
export function getUrlQuery(str) {
  if(!str) {
    return {}
  }else {
    str = str.slice(1);
  }
  let queryArr = str.split('&');
  let query = {};  //
  for(let item of queryArr) {
    query[item.split('=')[0]] = item.split('=')[1];
  }
  return query;
}
