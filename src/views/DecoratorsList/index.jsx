import React, { Component } from 'react';
import {inject,observer} from 'mobx-react';
import DecorationCase from '@/components/DecorationCase';
import AdsCase from '@/components/AdsCase';
import './index.scss'
@inject('commonState')
@observer
class DecoratorsList extends Component {
  componentDidMount() {//根据路由修改底部导航选中状态及title内容
    this.props.commonState.selectKey();
  }
  render() {
    return (
      <div className="decoration">
        <AdsCase titleName="秒杀活动" data={[1]} />
        <DecorationCase titleName="装修案例" data={[1, 2, 3, 4, 5]} />
      </div>
    );
  }
}

export default DecoratorsList;