import React, { Component } from 'react';
import { SegmentedControl, WingBlank, PullToRefresh } from 'antd-mobile';
import { spikeActiveList } from '@/apis/modules/spikes';
import SpikeCell from './SpikeCell';
import ToTop from '@/components/ToTop';
import './index.scss';

class SpikeList extends Component {
  constructor(props) {
    super();
    this.state = {
      selectedIndex:0,
      resInfo: [],
      // 上拉加载更多组件的数据
      refreshing: false,
      height: document.documentElement.clientHeight,
    }
    // 接口传参
    this.query = {
      type: 1,
      place: 0,
      page: 1
    }
    this.total_page = 0;

    this.handleGetMore = this.handleGetMore.bind(this)
  }

  async componentDidMount() {
    await this.init();
  }

  onChange = (e) => {
    this.query = {...this.query,type:e.nativeEvent.selectedSegmentIndex+1};
    this.setState({
      selectedIndex: e.nativeEvent.selectedSegmentIndex
    }, async () => {
      await this.init();
    })
  }

  // 上拉加载更多的回调
  async handleGetMore() {
    this.setState({ refreshing: true });
    if(this.query.page < this.total_page) {
      this.query.page += 1;
      await this.init('getMore');
      this.setState({
        refreshing: false
      })
    }else {
      setTimeout(() => {
        this.setState({ refreshing: false });
      }, 1000);
    }
  }

  // type:   'getMore': 加载下一页   type 不传为重新加载
  async init(type) {
    return new Promise( async (resolve, reject) => {
      let res = await spikeActiveList(this.query);
      if(res.data.code === 0) {
        this.total_page = res.data.total_page;
        this.query = {...this.query, page: res.data.page};
        // 重新加载
        this.setState({
          resInfo: !type || type !== 'getMore' ? res.data.list : this.state.resInfo.concat(res.data.list)
        }, () => {
          resolve()
        })
      }else {
        resolve()
      }
    })
  }

  render() {
    let spikeList = this.state.resInfo;
    return (
      <WingBlank size="lg" className="sc-example">
        <SegmentedControl onChange={this.onChange} selectedIndex={this.state.selectedIndex} values={['进行中', '已结束', '未开始']} />
          {/* 上拉加载更多 */}
          <PullToRefresh
          damping={60}
          ref={el => this.ptr = el}
          style={{
            height: this.state.height + 20,
            overflow: 'auto',
          }}
          indicator='上拉可以刷新'
          direction='up'
          refreshing={this.state.refreshing}
          onRefresh={ this.handleGetMore }
        >
          {
            spikeList.map( (item, index) => {
              return (
                <SpikeCell item={item} key={item.id} />
              )
            })
          }
        </PullToRefresh>
        <ToTop />
      </WingBlank>
    );
  }
}

export default SpikeList;


