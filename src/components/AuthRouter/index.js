/* ========================================================
    jason
    2019/2/28
    登录拦截组件
    this.props.info 为跳转页面提示的内容，默认为 '为了更好的提供服务，请先登录'
   ====================================================== */
import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { message } from 'antd';

class AuthRouter extends Component {
  constructor(props) {
    super();
    this.isLogin = localStorage.getItem('QR_TOKEN') ? true : false;
  }

  componentDidMount() {
    this.isLogin ? null : message.info(this.props.info ? this.props.info : '为了更好的提供服务，请先登录', 5);
  }

  render() {
    const {component: Component, ...rest } = this.props;
    const toPath = this.props.path ? this.props.path : null;
    return (
      <Route {...rest} render={ props => {
        return  this.isLogin
                ?
                <Component {...props} />
                :
                <Redirect to={{pathname: '/login', state: {from: props.location}}} />
      }} />
    )
  }
}

export default AuthRouter;
