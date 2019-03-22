import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import IconFont from '@/components/Iconfont';
import './index.scss'

class DecoratonsList extends Component {
  constructor(props) {
    super();
    this.state={

    }
    this.goCaseDetail = this.goCaseDetail.bind(this)
  }

  goCaseDetail(id) {
    // this.props.history.push({
    //   path: '/casesDetail',
    //   params: id
    // })
    this.props.history.push(`/casesDetail/${id}`);
  }

  render() {
    const {item} = this.props;
    return (
      <NavLink
      to={`/casesDetail/${item.caselist_id}`}
      className="decorationCase-cell"
      >
        <div className="decorationCase-cell-top">
          <div className="decorationCase-cell-info">
            <p>{item.caselist_title}</p>
            <div>{item.caselist_author}</div>
          </div>
          <img className="decorationCase-casePic" src={item.caselist_img} alt="" />
        </div>
      </NavLink>
    );
  }
}

export default DecoratonsList;
