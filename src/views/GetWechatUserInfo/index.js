import React, { Component } from 'react';
import { Button } from 'antd-mobile';
import { getWechatOAuth, getWechatInfo } from '@/apis/modules/wechat';

class Page404 extends Component {
  constructor(props) {
    super();
    this.state = {
      token: '',
      userData: ''
    }
    this.handleGetWechatInfo = this.handleGetWechatInfo.bind(this);
  }

  async componentDidMount() {
    if(sessionStorage.getItem('wechatAuth') === 'oneStep') {
      let url = window.location.href;
      if(url.indexOf('?') === -1){
        sessionStorage.removeItem('wechatAuth');
        window.location.reload();
      }
      let arr = url.split('?');

      let url_query_arr = arr[1].split("&");
      let query = {};
      for (let i = 0; i < url_query_arr.length; i++) {
        let list = url_query_arr[i].split("=");
        query[list[0]] = list[1];
      }
      let res = await getWechatInfo(
        {code: query.code}
      );
      this.setState({
        token: res.data.token,
        userData: res.data.userData
      })
    }
  }

  async handleGetWechatInfo() {
    const url = window.location.href;
    let res = await getWechatOAuth({target: url})
    sessionStorage.setItem('wechatAuth', 'oneStep');
    window.location.href = res.data.data;
  }

  render() {
    return (
      <div>
         <Button type="primary" onClick={this.handleGetWechatInfo}>点击获取微信信息</Button>
         <div>
           <h4>用户的token是：</h4>
           <div>{this.state.token}</div>
           <h4>获取的用户信息是</h4>
           <div>{JSON.stringify(this.state.userData)}</div>
         </div>
      </div>
    );
  }
}

export default Page404;
