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

/*
*   判断是否是微信浏览器 微信环境返回 true
*/
export function isWeiXin(){
  var ua = window.navigator.userAgent.toLowerCase();
  if(ua.match(/MicroMessenger/i) == 'micromessenger'){
      return true;
  }else{
      return false;
  }
}
