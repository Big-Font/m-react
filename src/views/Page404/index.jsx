import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Button } from 'antd-mobile';
require('./index.scss');

@withRouter
class Page404 extends Component {
  render() {
    return (
      <div className="no-data">
        <img src={require('@/images/common/no-data.png')} alt="404" />
        <p>您访问的页面不存在</p>
        <Button onClick={() => {this.props.history.go(-1)}} size="small" type="primary">返回首页</Button>
      </div>
    );
  }
}

export default Page404;
