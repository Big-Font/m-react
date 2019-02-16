import React, { Component } from 'react';
import './index.scss'
import { withRouter } from 'react-router-dom';
import {inject,observer} from 'mobx-react';
//把需要的全局状态inject过来
@withRouter
@inject('commonState')
@observer
class Mine extends Component {
  constructor(props) {
    super();
    this.goLogin = this.goLogin.bind(this);
  }
  componentDidMount() {//根据路由修改底部导航选中状态及title内容
    this.props.commonState.selectKey();
  }
  goLogin() {
    this.props.history.push('/login');
  }
  render() {
    return (
      <div className="mineS">
        <div className="mineS-top">
          <p></p>
          <input type="button" value="点击登录" onClick={this.goLogin} />
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
              <p>个性签名</p>
              <i className="mineS-mid-myActivFirst-i">个非官方个非官方个盖房盖房。。。</i>
            </div>
          </div>
          <div className="mineS-mid-myActivFirst clearfix">
            <div className="fl">
              <p>邮箱</p>
              <i className="mineS-mid-myActivFirst-i">（无）</i>
            </div>
          </div>
          <div className="mineS-mid-myActivFirst clearfix">
            <div className="fl">
              <p>用户名</p>
              <i className="mineS-mid-myActivFirst-i">辅导辅导费</i>
            </div>
          </div>
          <div className="mineS-mid-myActivFirst clearfix">
            <div className="fl">
              <p>手机号</p>
              <i className="mineS-mid-myActivFirst-i">未绑定手机号</i>
            </div>
            <input className="fr" type="button" value="绑定手机" />
          </div>
        </div>
      </div>
    );
  }
}

export default Mine;