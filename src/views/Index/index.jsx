import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import AdBanner from './adBanner';//banner
import DecorationCase from '@/components/DecorationCase';
import SimbleTool from './simbleTool';
import FootNav from '@/components/FootNav'
import { getWechatSign } from '@/apis/modules/wechat';
import wx from 'weixin-js-sdk';
import './index.scss'

@inject('commonState')
@observer
class Index extends Component {
  constructor(props) {
    super();
    this.state = {

    }
    this.wechatShareInit = this.wechatShareInit.bind(this)
  }

  async componentDidMount() {//根据路由修改底部导航选中状态及title内容
    this.props.commonState.selectKey();
    let url = window.location.href.split('#')[0];
    let res = await getWechatSign({url});
    this.wechatShareInit(res.data.params, url);
  }

  wechatShareInit(params, url) {
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
            title: '晴睿装饰', // 分享标题
            desc: '用科技让装修更简单', // 分享描述
            link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: 'https://qingruiserver.wangshen.top/images/spikeList/85c282803fad11e998829db7f28b0a3816.png', // 分享图标
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
          title: '晴睿装饰', // 分享标题
          desc: '用科技让装修更简单', // 分享描述
          link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: 'https://qingruiserver.wangshen.top/images/spikeList/85c282803fad11e998829db7f28b0a3816.png',
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
          title: '晴睿装饰', // 分享标题
          desc: '用科技让装修更简单', // 分享描述
          link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: 'https://qingruiserver.wangshen.top/images/spikeList/85c282803fad11e998829db7f28b0a3816.png',
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
        title: '晴睿装饰', // 分享标题
        desc: '用科技让装修更简单', // 分享描述
        link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: 'https://qingruiserver.wangshen.top/images/spikeList/85c282803fad11e998829db7f28b0a3816.png',
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
          title: '晴睿装饰', // 分享标题
          desc: '用科技让装修更简单', // 分享描述
          link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: 'https://qingruiserver.wangshen.top/images/spikeList/85c282803fad11e998829db7f28b0a3816.png',
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
    });
  }

  render() {
    return (
      <div className="home">
        <AdBanner />
        <div className="home-importADShow clearfix">
          <div className="fl home-importADShow-left"></div>
          <div className="fl home-importADShow-right">
            <p></p>
            <p></p>
          </div>
        </div>
        <SimbleTool />
        <DecorationCase titleName="经典装修" />
        <DecorationCase titleName="设计美学" />
        <FootNav />
      </div>
    );
  }
}

export default Index;
