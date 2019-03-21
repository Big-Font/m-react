import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import DecorationCase from '@/components/DecorationCase';
import AdsCase from '@/components/AdsCase';
import FootNav from '@/components/FootNav';
import './index.scss'

@inject('commonState')
@observer
class DecoratorsList extends Component {
  constructor(props) {
    super();
  }

  componentDidMount() {//根据路由修改底部导航选中状态及title内容
    console.log(`页面钩子执行了`)
    this.props.commonState.handleFooterStatus(true);
    this.props.commonState.selectKey();
  }

  componentDidUpdate() {
    this.props.commonState.handleFooterStatus(true);
  }

  componentWillUnmount() {
    this.props.commonState.handleFooterStatus(false);
  }

  render() {
    return (
      <div className="decoration">
        <AdsCase titleName="秒杀活动" data={[1]} />
        <DecorationCase titleName="装修案例"  />
        {/* <FootNav /> */}
      </div>
    );
  }
}

export default DecoratorsList;
