import React, { Component } from 'react';
import './index.scss'
import { withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import minePic from '@/images/mine/headPic.png'
import { personInfo, } from '@/apis/modules/mine';
import IconFont from '@/components/Iconfont';
import FootNav from '@/components/FootNav';
import {  message } from 'antd';

//把需要的全局状态inject过来
@withRouter
@inject('commonState','mineState')
@observer
class Mine extends Component {
  constructor(props) {
    super();
    this.state = {
    }
    this.goLogin = this.goLogin.bind(this);
    this.personInfoInit = this.personInfoInit.bind(this);
    this.toChangePerInfo = this.toChangePerInfo.bind(this);
  }
  async componentDidMount() {//根据路由修改底部导航选中状态及title内容
    this.props.commonState.handleFooterStatus(true);
    this.props.commonState.selectKey();
    if (localStorage.getItem('QR_TOKEN')) {
      //请求个人信息
      await this.personInfoInit();
    }
  }

  componentDidUpdate() {
    this.props.commonState.handleFooterStatus(true);
  }

  componentWillUnmount() {
    this.props.commonState.handleFooterStatus(false);
  }

  async personInfoInit() {
    let res = await personInfo();
    if (res.data.code === 0) {//成功
      let obj =  res.data.data
      this.props.mineState.setPersonInfo(obj);
    } else if (res.data.code < 0) {//网络错误怎么显示

    }
  }
  toChangePerInfo(){
    if (!localStorage.getItem('QR_TOKEN')){
      message.warn("用户未登录",5);
      return;
    }
    this.props.history.push('/mine/changePersonInfo');
  }
  goLogin() {
    this.props.history.push('/login');
  }

  render() {
    const {mineState} = this.props;
    let personInfo = mineState._personInfo;
    let email = personInfo.email ? personInfo.email : "(无)";
    let phone = personInfo.phone ? personInfo.phone : "(无)";
    let imageUrl = personInfo.img ? personInfo.img : minePic;
    let username = personInfo.username ? personInfo.username : phone;
    let niName = personInfo.username ? personInfo.username : "(无)";
    let address = personInfo.address ? personInfo.address : "(无)";
    return (
      <div className="mineS">
        <div className="mineS-top">
          <p className="mineS-top-p">
            <img src={imageUrl} alt="" />
          </p>
          {
            !localStorage.getItem('QR_TOKEN') ?
              <input type="button" value="点击登录" onClick={this.goLogin} /> :
              <b>{username}</b>
          }
        </div>
        <div className="mineS-mid">
          <div className="mineS-mid-myActiv clearfix">
            <h4 className="fl">我的活动</h4>
            <IconFont type={"icon-more"} style={{ float: "right" }} />
          </div>
          <div className="mineS-mid-myActivFirst clearfix">
            <div className="fl">
              <p>暂时未参加活动哦~</p>
              <p className="mineS-mid-myActivFirst-p">活动多多，优惠多多，点击右侧按钮查看活动。。。</p>
            </div>
            <input className="fr" type="button" value="点击查看" />
          </div>
          <div className="mineS-mid-myActiv clearfix">
            <h4 className="fl">我的信息</h4>
            <input
              className="fr mineS-mid-myActiv-input"
              type="button"
              value="修改用户信息"
              onClick={this.toChangePerInfo}
           />
          </div>
          <div className="mineS-mid-myActivFirst clearfix">
            <div className="fl">
              <p>家庭地址</p>
              <i className="mineS-mid-myActivFirst-i">{address}</i>
            </div>
          </div>
          <div className="mineS-mid-myActivFirst clearfix">
            <div className="fl">
              <p>邮箱</p>
              <i className="mineS-mid-myActivFirst-i">{email}</i>
            </div>
          </div>
          <div className="mineS-mid-myActivFirst clearfix">
            <div className="fl">
              <p>用户名</p>
              <i className="mineS-mid-myActivFirst-i">{niName}</i>
            </div>
          </div>
          <div className="mineS-mid-myActivFirst clearfix">
            <div className="fl">
              <p>手机号</p>
              <i className="mineS-mid-myActivFirst-i">{phone}</i>
            </div>
          </div>
        </div>
        {/* <FootNav /> */}
      </div>
    );
  }
}

export default Mine;
