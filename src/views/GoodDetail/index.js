import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { getGoodDetailAPI } from '@/apis/modules/goods';
require('./index.scss');

@withRouter
class GoodDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      detail: {

      }
    }
  }

  async componentDidMount() {
    console.log(this.props, this.props.match.params.id)
    let id = this.props.match.params.id;
    let res = await getGoodDetailAPI({id});
    if(res.data.code === 0) {
      this.setState({
        detail: res.data.data
      })
    }
  }

  render() {
    let { detail } = this.state;
    return (
      <div className="good-detail">
        {/* 头部 */}
        <div className="header">
          <img className="good-img" src={detail.img} alt=""/>
        </div>
        {/* 属性参数 */}
        <div className="good-info">

        </div>
        {/* 富文本详情 */}
        <div className="content" dangerouslySetInnerHTML={{__html: detail.detail}}></div>
      </div>
    );
  }
}

export default GoodDetail;
