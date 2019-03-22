/* ========================================================

    李雪魁
    2018/12/31
    首页装修案例---可作为公共组件
   ====================================================== */
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { WingBlank, PullToRefresh } from 'antd-mobile';
import DecoratonsCell from './decorationCaseCell';
import { decoration } from '@/apis/modules/decoration';
import './index.scss';

class DecorationCase extends Component {
  constructor(props) {
    super();
    this.state = {
      decorationList: [],
      page: 1,
      // 上拉加载更多组件的数据
      refreshing: false,
      height: document.documentElement.clientHeight,
    }
    this.page = 1;
    this.total_page = 1;
    this.handleGetMore = this.handleGetMore.bind(this);
  }

  async componentDidMount() {
    await this.init();
  }

  init(type) {
    return new Promise(async (resolve, reject) => {
      let res = await decoration({
        page: this.page
      });
      if(res.data.code === 0) {
        this.page = res.data.page;
        this.total_page = res.data.total_page;
        this.setState({
          decorationList: !type || type !== 'getMore' ? res.data.list : this.state.resInfo.concat(res.data.list)
        }, () => {
          resolve()
        })
      }else{
        resolve()
      }
    })
  }

  // 上拉加载更多的回调
  async handleGetMore() {
    this.setState({ refreshing: true });
    if(this.page < this.total_page) {
      this.page += 1;
      let res = await this.init('getMore');
      this.setState({
        refreshing: false
      })
    }else {
      setTimeout(() => {
        this.setState({ refreshing: false });
      }, 1000);
    }
  }

  render() {
    const { titleName } = this.props;
    const { decorationList } = this.state;
    let firstCell = {}, caseList = [];
    if(decorationList.length) {
      firstCell= decorationList[0];
      caseList = decorationList.slice(1);
    }
    return (
      <WingBlank className='decorationCase'>
        <div className="decorationCase-head clearfix">
          <i className="fl decorationCase-head-i"></i>
          <h4 className="fl">{titleName}</h4>
        </div>
        <NavLink to={`/casesDetail/${firstCell.caselist_id}`}>
          <div className="decorationCase-ad">
            <img src={firstCell.caselist_img} alt="" />
            {firstCell.caselist_title}
          </div>
        </NavLink>
        {/* 上拉加载更多 */}
        <PullToRefresh
        damping={60}
        ref={el => this.ptr = el}
        style={{
          height: this.state.height,
          overflow: 'auto',
        }}
        indicator='上拉加载更多'
        direction='up'
        refreshing={this.state.refreshing}
        onRefresh={this.handleGetMore}>
          {
            caseList.length
            ?
            caseList.map((item, index) => {
              return (
                <DecoratonsCell item={item} key={item.caselist_id} />
              )
            })
            :
            null
          }
        </PullToRefresh>
      </WingBlank>
    );
  }
}
export default DecorationCase;
