import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import IconFont from '@/components/Iconfont';
import { List, InputItem, Toast, Button } from 'antd-mobile';
import { baseUrl } from '@/config/env';
import { login } from '@/apis/modules/login';

require('./index.scss');

@inject('commonState', 'userState')
@observer
@withRouter
class NewLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneHasErr: false,
      phone: '',
      pwdHasErr: false,
      pwd: '',
      codeHasErr: false,
      code: '',
      captcha: `${baseUrl}/v1/captcha?${new Date().getTime()}`
    };

    this.onPhoneChange = this.onPhoneChange.bind(this);
    this.onPhoneErrorClick = this.onPhoneErrorClick.bind(this);
    this.login = this.login.bind(this);
  }

  componentDidMount() {
    this.props.commonState.handleHeaderStatus(false);
    console.log(this.props.commonState._showHeader)
  }

  componentDidUpdate() {
    this.props.commonState.handleHeaderStatus(false);
  }

  // 手机号校验
  onPhoneChange(phone) {
    if(phone.replace(/\s/g, '').length < 11) {
      this.setState({
        phoneHasErr: true
      });
    }else {
      this.setState({
        phoneHasErr: false
      });
    }
    this.setState({
      phone
    })
  }

  onPhoneErrorClick() {
    if(this.state.phoneHasErr) {
      Toast.info('请输入正确的手机号');
    }
  }

  // 密码校验
  onPwdChange = (pwd) => {
    if(pwd.length < 6) {
      this.setState({
        pwdHasErr: true
      });
    }else {
      this.setState({
        pwdHasErr: false
      });
    }
    this.setState({
      pwd
    })
  }

  onPwdErrorClick = () => {
    if(this.state.pwdHasErr) {
      Toast.info('密码不能少于6位');
    }
  }

  // 验证码校验
  onCodeChange = (code) => {
    if(code.length < 4) {
      this.setState({
        codeHasErr: true
      });
    }else {
      this.setState({
        codeHasErr: false
      });
    }
    this.setState({
      code
    })
  }

  onCodeErrorClick = () => {
    if(this.state.codeHasErr) {
      Toast.info('请输入4位字母数字验证码');
    }
  }

  // 刷新验证码
  reflshCode = () => {
    let captcha = `${baseUrl}/v1/captcha?${new Date().getTime()}`;
    this.setState({
      captcha
    })
  }

  // 登录
  async login() {
    let { phoneHasErr, pwdHasErr, codeHasErr, phone, pwd, code} = this.state;
    if(phoneHasErr) {
      Toast.info('请输入正确的手机号');
      return;
    }else if(pwdHasErr) {
      Toast.info('密码不能少于6位');
      return;
    }else if(codeHasErr) {
      Toast.info('请输入4位字母数字验证码');
      return;
    }
    let data = {
      phone: phone.replace(/\s+/g, ''),
      password: pwd,
      capkey: code
    }
    let res = await login(data);
    if (res.data.code === 0) {//登录成功--跳转到首页
      localStorage.QR_TOKEN = res.data.token;//储存账号
      Toast.success('请输入4位字母数字验证码', 3);
      this.props.userState.getUserShopCarList();
      let redirect = this.props.location.state;
      redirect ? this.props.history.push(redirect.from) : this.props.history.push('/');
    }
  }

  componentWillUnmount() {
    this.props.commonState.handleHeaderStatus(true);
  }

  render() {
    return (
      <div className="login">
        {/* 关闭按钮 */}
        <IconFont onClick={() => {this.props.history.push('/mine')}} type="icon-guanbi" className="close" />
        {/* 头部logo */}
        <div className="logo">
          <h1></h1>
          <p>你好，欢迎来到晴睿装饰</p>
        </div>
        {/* 登录框 */}
        <InputItem
          className="ant-input"
          type="phone"
          placeholder="请输入手机号"
          error={this.state.phoneHasErr}
          onErrorClick={this.onPhoneErrorClick}
          onChange={this.onPhoneChange}
          value={this.state.phone}>
        </InputItem>
        <InputItem
          className="ant-input"
          type="password"
          placeholder="请输入密码"
          error={this.state.pwdHasErr}
          onErrorClick={this.onPwdErrorClick}
          onChange={this.onPwdChange}
          value={this.state.pwd}>
        </InputItem>
        <div className="code-item">
          <InputItem
            className="ant-input code"
            type="text"
            placeholder="请输入验证码"
            error={this.state.codeHasErr}
            onErrorClick={this.onCodeErrorClick}
            onChange={this.onCodeChange}
            labelNumber={3}
            value={this.state.code}>
          </InputItem>
          <img onClick={this.reflshCode} src={this.state.captcha} alt=""/>
        </div>
        <div className="register">
          <p>没有账号？</p>
          <a onClick={() => {this.props.history.push({pathname: '/register', state: {from: this.props.location.state ? this.props.location.state.from : '/'}})}} >立即注册 ></a>
        </div>
        <Button onClick={this.login} className="login-btn" type="primary">立即登录</Button>
      </div>
    );
  }
}

export default NewLogin;
