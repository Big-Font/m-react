import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import IconFont from '@/components/Iconfont';
import { querySpikeDetail } from '@/apis/modules/spikes';
import { date } from '@/utils/filters';
require('./index.scss');

@withRouter
class SpikeDetail extends Component {
  constructor(props) {
    super();
    this.state = {
      id: props.match.params.id,
      ActiveStatus: '未开始',
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
  }

  async componentWillMount() {
    let res = await querySpikeDetail({id: this.state.id});
    if(res.data.code === 0) {
      this.setState({
        resInfo: res.data.data
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

  render() {
    let info = this.state.resInfo;
    return (
      <div className="spike-detail">
        <div className="top-img">
          <img className="good-img" src={info.img} alt=""/>
          <div>{this.state.ActiveStatus}</div>
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
                          <IconFont type={item.status ? 'icon-jiantou-copy-copy-copy' : 'icon-jiantou-copy-copy'} />
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
