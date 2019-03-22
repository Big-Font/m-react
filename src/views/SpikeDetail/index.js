import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import IconFont from '@/components/Iconfont';
import { querySpikeDetail } from '@/apis/modules/spikes';
import { date } from '@/utils/filters';
require('./index.scss');

@withRouter
class SpikeDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.match.params.id,
      ActiveStatus: {
        name: '',
        class: ''
      },
      resInfo: {
        startTime: '',
        endTime: ''
      },
      desStatus: [
        {name: '活动介绍', status: false, data: 'activity', icon: 'icon-guifandaohanglanshaixuanshouqi'},
        {name: '商家介绍', status: false, data: 'seller', icon: 'icon-guifandaohanglanshaixuanshouqi'},
      ]
    }

    this.handleShow = this.handleShow.bind(this);
    this.queryActiveType = this.queryActiveType.bind(this);
  }

  async componentWillMount() {
    let res = await querySpikeDetail({id: this.state.id});
    if(res.data.code === 0) {
      let resInfo = res.data.data;
      let ActiveStatus = this.queryActiveType(resInfo.type);
      this.setState({
        resInfo,
        ActiveStatus
      })

    }
  }

  handleShow(index) {
    let desStatus = this.state.desStatus;
    desStatus[index].status = !desStatus[index].status;
    this.setState({
      desStatus
    })
  }

  // 活动状态  1-进行中， 2-已结束, 3-未开始
  queryActiveType(type) {
    switch(type){
      case '1':
        return {name: '进行中', class: 'ing'};
      case '2':
        return {name: '已结束', class: 'end'};
      case '3':
        return {name: '未开始', class: 'unopen'};
      default:
        return '';
    }
  }

  render() {
    let {resInfo: info, ActiveStatus} = this.state;
    return (
      <div className="spike-detail">
        <div className="top-img">
          <img className="good-img" src={info.img} alt=""/>
          <div className={ActiveStatus.class}>{ActiveStatus.name}</div>
        </div>
        {/* 秒杀信息 */}
        <div className="spilk-info">
          <h1>{info.name}</h1>
          <div className="time">
            <div>
              <h2>活动时间</h2>
              <p>{date(info.startTime)}</p>
              <div>
                <i></i>至<i></i>
              </div>
              <p>{date(info.endTime)}</p>
            </div>
            <div>
              <h2>活动价格</h2>
              <div className="price">{info.price ? `${info.price}元` : ''}</div>
              <div>商品数量: <b>{info.stock}</b></div>
            </div>
          </div>
          {/* 活动介绍 */}
          <div className="des-info">
            {
              this.state.desStatus.map( (item, index) => {
                  return (
                      <div key={index}>
                        <nav onClick={ () => {this.handleShow(index)}}>
                          <h3>{item.name}</h3>
                          <IconFont className="des-info-icon" type={item.status ? 'icon-jiantou-copy-copy-copy' : 'icon-jiantou-copy-copy'} />
                        </nav>
                        <div className={item.status ? '' : 'un-look'}>&nbsp;&nbsp;&nbsp;&nbsp;{info[item.data]}</div>
                      </div>
                  )
              })
            }
            {/* <nav>
              <h3>活动介绍</h3>
              <IconFont type='icon-guifandaohanglanshaixuanshouqi' onClick={ () => {this.handleShow()}} />
            </nav>
            <div>&nbsp;&nbsp;&nbsp;&nbsp;{info.activity}</div>
            <nav>
              <h3>商家介绍</h3>
              <IconFont type='icon-guifandaohanglanshaixuanshouqi' onClick={ () => {this.handleShow()}} />
            </nav>
            <div>&nbsp;&nbsp;&nbsp;&nbsp;{info.seller}</div> */}
          </div>
        </div>
        {/* 商品活动详情 */}
        <div className="content" dangerouslySetInnerHTML={{__html: info.goods}}></div>
      </div>
    );
  }
}

export default SpikeDetail;
