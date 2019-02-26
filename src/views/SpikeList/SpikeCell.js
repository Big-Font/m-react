import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { date } from '@/utils/filters';
require('./index.scss');

@withRouter
class SpikeCell extends Component {
  constructor(props) {
    super();
    this.handleClick = this.handleClick.bind(this);
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

  handleClick() {
    this.props.history.push(`/spikeDetail/${this.props.item.id}`);
  }

  render() {
    let item = this.props.item;
    let type = this.queryActiveType(item.type);
    return (
      <div className="spike-item" onClick={this.handleClick}>
        <img className="list-img" src={item.img} alt=""/>
        <span className={`list-type ${type.class}`}>{type.name}</span>
        <div className="list-name">
          活动名称： {item.name}
        </div>
        <div className="list-time">
          时间: {date(item.startTime)}-{date(item.endTime)}
        </div>
      </div>
    );
  }
}

export default SpikeCell;
