import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import AdBanner from './adBanner';//banner
import Swiper from './component/swiper';
import DecorationCase from '@/components/DecorationCase';
import SimbleTool from './component/simbleTool';
import AdsCase from '@/components/AdsCase';
import FootNav from '@/components/FootNav';
import { getBanner } from '@/apis/modules';
import './index.scss'

@inject('commonState')
@observer
class Index extends Component {
  constructor(props) {
    super();
    this.state = {
      banners: []
    }
  }

  async componentDidMount() {//根据路由修改底部导航选中状态及title内容
    console.log(`页面钩子执行了`)
    this.props.commonState.handleFooterStatus(true);
    this.props.commonState.selectKey();

    let banners = await getBanner();
    if(banners.data.code === 0) {
      this.setState({
        banners: banners.data.list
      })
    }
  }

  componentDidUpdate() {
    this.props.commonState.handleFooterStatus(true);
  }

  componentWillUnmount() {
    this.props.commonState.handleFooterStatus(false);
  }

  render() {
    return (
      <div>
        <Swiper banners={this.state.banners} />
        {/* <AdBanner /> */}
        {/* <div className="home-importADShow clearfix">
          <div className="fl home-importADShow-left"></div>
          <div className="fl home-importADShow-right">
            <p></p>
            <p></p>
          </div>
        </div> */}
        <div className="home">
          <SimbleTool />
          <AdsCase titleName="秒杀活动" data={[1]} />
          {/* <DecorationCase titleName="经典装修" /> */}
          <DecorationCase titleName="设计美学" />
          {/* <FootNav /> */}
        </div>
      </div>
    );
  }
}

export default Index;
