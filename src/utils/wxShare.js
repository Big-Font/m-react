import wx from 'weixin-js-sdk';
import { getWechatSign } from '@/apis/modules/wechat';
import { isWeiXin } from './index';

export function wxShare(shareInfo) {
  if(isWeiXin()) {
    let url = window.location.href;
    getWechatSign({url}).then(res => {
      wechatShareInit(res.data.params, url, shareInfo);
      console.log(`微信分享开启`)
    })
    .catch(err => {
      console.log(`微信分享接口err`)
    })
  }else {
    console.log(`微信分享未开启`)
  }
}

function wechatShareInit(params, url, shareInfo) {
  wx.config({
      debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: params.appId, // 必填，公众号的唯一标识
      timestamp: params.timestamp, // 必填，生成签名的时间戳
      nonceStr: params.noncestr, // 必填，生成签名的随机串
      signature: params.signature,// 必填，签名
      jsApiList: ["onMenuShareAppMessage", "onMenuShareTimeline", "onMenuShareQQ", "onMenuShareQZone"] // 必填，需要使用的JS接口列表
  });

  wx.ready(function(){
      // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。

       //获取“分享给朋友”按钮点击状态及自定义分享内容接口
       wx.onMenuShareAppMessage({
          title: shareInfo.title, // 分享标题
          desc: shareInfo.desc, // 分享描述
          link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: shareInfo.imgUrl, // 分享图标
          type: '', // 分享类型,music、video或link，不填默认为link
          dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
          success: function(ret) {
              // 用户确认分享后执行的回调函数
              // alert("分享给朋友分享成功！");
          },
          cancel: function() {
              // 用户取消分享后执行的回调函数
              // alert("分享给朋友取消分享！");
          }
      });

      wx.onMenuShareTimeline({
        title: shareInfo.title, // 分享标题
        desc: shareInfo.desc, // 分享描述
        link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: shareInfo.imgUrl,
        success: function(ret) {
            // 用户确认分享后执行的回调函数
            // alert("分享到朋友圈分享成功！");
        },
        cancel: function() {
            // 用户取消分享后执行的回调函数
            // alert("分享到朋友圈取消分享！");
        }
    });

    //获取“分享到QQ”按钮点击状态及自定义分享内容接口
    wx.onMenuShareQQ({
        title: shareInfo.title, // 分享标题
        desc: shareInfo.desc, // 分享描述
        link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: shareInfo.imgUrl,
        success: function() {
            // 用户确认分享后执行的回调函数
            // alert("QQ分享成功！");
        },
        cancel: function() {
            // 用户取消分享后执行的回调函数
            // alert("QQ取消分享！");
        }
    });

    wx.onMenuShareWeibo({
      title: shareInfo.title, // 分享标题
      desc: shareInfo.desc, // 分享描述
      link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: shareInfo.imgUrl,
      success: function() {
          // 用户确认分享后执行的回调函数
          // alert("腾讯微博分享成功！");
      },
      cancel: function() {
          // 用户取消分享后执行的回调函数
          // alert("腾讯微博取消分享！");
      }
  });

  //获取“分享到QQ空间”按钮点击状态及自定义分享内容接口
    wx.onMenuShareQZone({
        title: shareInfo.title, // 分享标题
        desc: shareInfo.desc, // 分享描述
        link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: shareInfo.imgUrl,
        success: function() {
            // 用户确认分享后执行的回调函数
            // alert("分享到QQ空间分享成功！");
        },
        cancel: function() {
            // 用户取消分享后执行的回调函数
            // alert("分享到QQ空间取消分享！");
        }
    });
  });

  wx.error(function(res){
      // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
      console.log(`微信分享init执行err`)
  });
}
