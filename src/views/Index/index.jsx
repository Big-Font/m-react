import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
// import AdBanner from './adBanner';//banner
import Swiper from './component/swiper';
import DecoratonsCell from '@/components/DecorationCase/decorationCaseCell';
// import DecorationCase from '@/components/DecorationCase';
import SimbleTool from './component/simbleTool';
import AdsCase from '@/components/AdsCase';
import { getIndexAPI } from '@/apis/modules';
import './index.scss'

@inject('commonState')
@observer
class Index extends Component {
  constructor(props) {
    super();
    this.state = {
      bannerList: [],
      spikeList: [],
      caseList: []
    }
  }

  async componentDidMount() {
    this.props.commonState.handleFooterStatus(true);
    let res = await getIndexAPI();
    if(res.data.code === 0) {
      let { bannerList, spikeList, caseList} = res.data;
      this.setState({
        bannerList,
        spikeList,
        caseList
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
    let { bannerList, spikeList, caseList } = this.state;
    return (
      <div>
        <Swiper banners={bannerList} />
        <div className="home">
          <SimbleTool />
          {/* 推荐到首页的秒杀活动 */}
          {
            spikeList.length
            ?
            <AdsCase titleName="秒杀活动" spikeList={spikeList} />
            :
            null
          }
          {/* 推荐到首页的装修案例 */}
          {/* <DecorationCase titleName="经典装修" /> */}
          {
            caseList.length
            ?
            caseList.map((item, index) => {
              return (
                <DecoratonsCell item={item} key={index} />
              )
            })
            :
            null
          }
        </div>
      </div>
    );
  }
}

export default Index;
