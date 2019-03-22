/* ========================================================

    李雪魁
    2018/12/31
    首页装修案例---可作为公共组件
   ====================================================== */
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import DecoratonsCell from './decorationCaseCell';
import { decoration } from '@/apis/modules/decoration';
import IconFont from '@/components/Iconfont';
import './index.scss';

class DecorationCase extends Component {
  constructor(props) {
    super();
    this.state = {
      decorationList: [],
    }
  }

  async componentDidMount() {
    let res = await decoration();
    if(res.data.code === 0) {
      this.setState({
        decorationList: res.data.list
      })
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
      <div className='decorationCase'>
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
      </div>
    );
  }
}
export default DecorationCase;
