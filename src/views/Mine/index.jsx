import React, { Component } from 'react';
import './index.scss'
import { withRouter } from 'react-router-dom';
import {inject,observer} from 'mobx-react';
import minePic from '@/images/mine/headPic.png'
import { personInfo, changePersonSomeInfo } from '@/apis/modules/mine';
//把需要的全局状态inject过来
@withRouter
@inject('commonState')
@observer
class Mine extends Component {
  constructor(props) {
    super();
    this.state = {
      personInfo:{
        address: null,
        age: null,
        email: "834469228@qq.com",
        img: null,
        name: null,
        phone: "13633203563",
        sex: null,
        username: null,
      }
    }
    this.goLogin = this.goLogin.bind(this);
    this.personInfoInit = this.personInfoInit.bind(this);
  }
  async componentDidMount() {//根据路由修改底部导航选中状态及title内容
    this.props.commonState.selectKey();
    if (sessionStorage.getItem('QR_TOKEN')) {
      //请求个人信息
      await this.personInfoInit();
    }
  }
  async personInfoInit() {
    let res = await personInfo();
    console.log(res.data);
    if (res.data.code === 0) {//成功
       this.setState({
        personInfo:res.data.data[0],
       })
    } else if (res.data.code < 0){//网络错误怎么显示
        
    }
}
  goLogin() {
    this.props.history.push('/login');
  }
  render() {
    const {personInfo} = this.state;
    let name = personInfo.name ? personInfo.name  : "(无)";
    let email = personInfo.email ? personInfo.email  : "(无)";
    let phone = personInfo.phone ? personInfo.phone  : "(无)";
    let personPic = personInfo.img ? personInfo.img  : minePic;
    let username = personInfo.username ? personInfo.username  : "(无)";
    let address = personInfo.address ? personInfo.address  : "(无)";
    let stylePer = {
      background:"url("+personPic+") no-repeat center",
      backgroundSize:"1.06rem 1.06rem"
    }
    return (
      <div className="mineS">
        <div className="mineS-top">
          <p style={stylePer}></p>
          {
            !sessionStorage.getItem('QR_TOKEN') ? 
            <input type="button" value="点击登录" onClick={this.goLogin} /> : 
            <b>{name}</b>
          }
        </div>
        <div className="mineS-mid">
          <div className="mineS-mid-myActiv clearfix">
            <h4 className="fl">我的活动</h4>
            <a href="javascript:;" className="fr"> ></a>
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
              <i className="mineS-mid-myActivFirst-i">{username}</i>
            </div>
          </div>
          <div className="mineS-mid-myActivFirst clearfix">
            <div className="fl">
              <p>手机号</p>
              <i className="mineS-mid-myActivFirst-i">{phone}</i>
            </div>
            <input className="fr" type="button" value="绑定手机" />
          </div>
        </div>
      </div>
    );
  }
}

export default Mine;