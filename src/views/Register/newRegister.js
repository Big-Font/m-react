import React, { Component } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { InputItem, Toast, Button} from 'antd-mobile';
import IconFont from '@/components/Iconfont';
import { validEmail } from '@/utils/validator';
import { register, getEmailCode } from '@/apis/modules/register';
require('./new.scss');

@inject('commonState')
@observer
@withRouter
class NewRegister extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneHasErr: false,
      phone: '',
      pwdHasErr: false,
      pwd: '',
      rePwdHasErr: false,
      rePwd: '',
      emailHasErr: false,
      email: '',
      codeHasErr: false,
      code: '',
      emailSendCode: 0
    }
    this.register = this.register.bind(this);
    this.sendCodeMsg = this.sendCodeMsg.bind(this);
    this.register = this.register.bind(this);
  }

  componentDidMount() {
    this.props.commonState.handleHeaderStatus(false);
  }

  componentDidUpdate() {
    this.props.commonState.handleHeaderStatus(false);
  }

  // 手机号校验
  onPhoneChange= (phone) => {
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

  onPhoneErrorClick = () => {
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

  onRePwdChange = (rePwd) => {
    if(rePwd.length < 6) {
      this.setState({
        rePwdHasErr: true
      });
    }else if(rePwd != this.state.pwd){
      this.setState({
        rePwdHasErr: true
      });
    }else {
      this.setState({
        rePwdHasErr: false
      });
    }
    this.setState({
      rePwd
    })
  }

  onRePwdErrorClick = () => {
    if(this.state.rePwdHasErr) {
      Toast.info('请正确重复密码');
    }
  }

  // 邮箱校验
  onEmailChange = (email) => {
    if(!validEmail(email)) {
      this.setState({
        emailHasErr: true
      });
    }else {
      this.setState({
        emailHasErr: false
      });
    }
    this.setState({
      email
    })
  }

  onEmailErrorClick = () => {
    if(this.state.emailHasErr) {
      Toast.info('请输入正确的邮箱');
    }
  }

  // 验证码校验
  onCodeChange = (code) => {
    if(code.length != 4) {
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
      Toast.info('请输入4位邮箱验证码');
    }
  }

  // 发送邮箱验证码
  async sendCodeMsg() {
    let {phoneHasErr, pwdHasErr, phone, pwd, rePwd, email, emailHasErr, emailSendCode} = this.state;
    if(emailSendCode !== 0) {
      Toast.info('验证码邮件已发送，请到所填邮箱中查看');
      return;
    }
    if(phoneHasErr) {
      Toast.info('请输入正确的手机号');
      return;
    }else if(pwdHasErr) {
      Toast.info('密码不能少于6位');
      return;
    }else if(pwd != rePwd) {
      Toast.info('两次输入的密码不一致');
    }else if(emailHasErr) {
      Toast.info('请输入4位字母数字验证码');
      return;
    }
    let data = {
      phone: phone.replace(/\s+/g, ''),
      email
    }
    let res = await getEmailCode(data);
    if (res.data.code === 0) {//获取成功--跳转到首页
      let detail = res.data.msg;
      this.setState({
        emailSendCode: -1
      }, () => {
        Toast.success('邮件已发送，请在邮箱中查看验证码');
      })
    }
  }

  // 立即注册
  async register() {
    let {phoneHasErr, pwdHasErr, phone, pwd, rePwd, email, code, emailHasErr, codeHasErr} = this.state;
    if(phoneHasErr) {
      Toast.info('请输入正确的手机号');
      return;
    }else if(pwdHasErr) {
      Toast.info('密码不能少于6位');
      return;
    }else if(pwd != rePwd) {
      Toast.info('两次输入的密码不一致');
    }else if(emailHasErr) {
      Toast.info('请输入4位字母数字验证码');
      return;
    }else if(codeHasErr) {
      Toast.info('请输入4位邮箱验证码');
      return;
    }
    let data = {
      phone: phone.replace(/\s+/g, ''),
      password: pwd,
      email,
      code
    }
    let res = await register(data);
    if (res.data.code === 0) {//注册成功--跳转到首页
      localStorage.QR_TOKEN = res.data.token;
      Toast.success("欢迎成为晴睿装饰的会员", 3);
      let redirect = this.props.location.state;
      redirect ? this.props.history.push(redirect.from) : this.props.history.push('/');
    }
    this.setState({
      emailSendCode: 0
    })
  }

  componentWillUnmount() {
    this.props.commonState.handleHeaderStatus(true);
  }

  render() {
    return (
      <div className="register">
        {/* 关闭按钮 */}
        <IconFont onClick={() => {this.props.history.push('/mine')}} type="icon-guanbi" className="close" />
        {/* 头部logo */}
        <div className="logo">
          <h1></h1>
          <p>你好，欢迎注册晴睿装饰</p>
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
        <InputItem
          className="ant-input"
          type="password"
          placeholder="请再次输入密码"
          error={this.state.rePwdHasErr}
          onErrorClick={this.onRePwdErrorClick}
          onChange={this.onRePwdChange}
          value={this.state.rePwd}>
        </InputItem>
        <InputItem
          className="ant-input"
          type="text"
          placeholder="请输入邮箱"
          error={this.state.emailHasErr}
          onErrorClick={this.onEmailErrorClick}
          onChange={this.onEmailChange}
          value={this.state.email}>
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
          <div onClick={this.sendCodeMsg} className="send-code">{this.state.emailSendCode===0 ? '发送验证码': '已发送到邮箱'}</div>
        </div>
        <div className="has-account">
          <p>已有账号？</p>
          <a onClick={() => {this.props.history.push('/login')}} >去登录 ></a>
        </div>
        <Button onClick={this.register} className="login-btn" type="primary">立即注册</Button>
      </div>
    );
  }
}

export default NewRegister;
