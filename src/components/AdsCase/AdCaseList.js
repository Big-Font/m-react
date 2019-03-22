import React, { Component } from 'react';
import { date } from '@/utils/filters';
import { NavLink } from 'react-router-dom';
import './index.scss'

class AdsList extends Component {
  constructor(props) {
    super();
    this.state={

    }
    this.queryActiveType = this.queryActiveType.bind(this);
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
    const {spikeList} = this.props;
    return (
     <ul className="adCase-list">
         {
              spikeList.length
              ?
              spikeList.map((item,i)=>{
                let type = this.queryActiveType(item.type)
                return (
                  <li
                    key={i + item}
                  >
                    <NavLink to={`/spikeDetail/${item.id}`}>
                      <div className=" clearfix adCase-list-title">
                          <b className="fl">{item.name}</b>
                          <i className="fr">{type.name}</i>
                      </div>
                      <img className="adCase-list-casePic" src={item.img} alt="" />
                      <div className="adCase-list-caseTime">活动时间：{date(item.startTime)}-{date(item.endTime)}</div>
                    </NavLink>
                  </li>
                )
            })
            :
            null
         }
     </ul>
    );
  }
}

export default AdsList;
