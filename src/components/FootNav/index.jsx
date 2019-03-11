import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import IconFont from '@/components/Iconfont';
import './index.scss'
//引进全局状态管理
import FootNavList from './footNavList';

class FootNav extends Component {
  constructor(props) {
    super();
  }
  render() {
    return (
      <div className="foot-nav">
          <FootNavList />
      </div>
    );
  }
}

export default FootNav;
