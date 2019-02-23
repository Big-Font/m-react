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
      resInfo: {
        startTime: '',
        endTime: ''
      }
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

  handleShow() {

  }

  render() {
    let info = this.state.resInfo;
    return (
      <div className="spike-detail">
        <img className="good-img" src={info.img} alt=""/>
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
              {/* <p>{info.stock}</p> */}
            </div>
          </div>
          {/* 活动介绍 */}
          <div className="des-info">
            {/* <Accordion defaultActiveKey="0" className="my-accordion" onChange={this.onChange}>
              <Accordion.Panel header="活动介绍" className="pad">
                {info.seller}
              </Accordion.Panel>
            </Accordion> */}
            <nav>
              <h3>活动介绍</h3>
              <IconFont type='icon-guifandaohanglanshaixuanshouqi' onClick={ () => {this.handleShow()}} />
            </nav>
            <nav>
              <h3>商家介绍</h3>
              <IconFont type='icon-guifandaohanglanshaixuanshouqi' onClick={ () => {this.handleShow()}} />
            </nav>
          </div>
        </div>
      </div>
    );
  }
}

export default SpikeDetail;
