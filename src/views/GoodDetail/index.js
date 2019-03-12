import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { getGoodDetailAPI, addShopcarAPI } from '@/apis/modules/goods';
import IconFont from '@/components/Iconfont';
import { message, Badge } from 'antd';
require('./index.scss');

@withRouter
class GoodDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      detail: {}
    }
    this.buyGood = this.buyGood.bind(this);
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

  // 添加购物车
  async buyGood(item) {
    if(!localStorage.getItem('QR_TOKEN')) {
      message.info('为了更好的提供服务，请先登录', 5);
      this.props.history.push(`/login?redirect=${encodeURI(window.location.pathname)}`)
      return;
    }
    let res = await addShopcarAPI({
      goodId: item.id,
      num: 1
    })
    if(res.data.code === 0) {
      this.props.history.push('/shopcar');
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
          <div className="title">
            <span className={detail.tag ? '' : 'unshow'}>{detail.tag}</span>
            <h1>{detail.name}</h1>
          </div>
          <h4>{detail.seller}</h4>
          <p className="price">￥{detail.price}</p>
        </div>
        {/* 富文本详情 */}
        <div className="content" dangerouslySetInnerHTML={{__html: detail.detail}}></div>
        {/* 底部按钮 */}
        <div className="shopping">
          <div>
            <Badge  className="icon" count={99}>
              <IconFont className="shopping-icon" type="icon-gouwu1" />
            </Badge>
          </div>
          <div className="in-shopcar" onClick={() => {this.buyGood(detail)}}>
            加入购物车
          </div>
        </div>
      </div>
    );
  }
}

export default GoodDetail;
