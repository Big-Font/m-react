import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import IconFont from '@/components/Iconfont';
import { addShopcarAPI } from '@/apis/modules/goods';
require('./index.scss');

@withRouter
class ShopCarCell extends Component {
  constructor(props) {
    super(props);

    this.handleGoodNum = this.handleGoodNum.bind(this);
    this.goDetail = this.goDetail.bind(this);
  }

  async handleGoodNum(id, num) {
    let item = this.props.goodsList
    let nowNum = item.num;
    if(nowNum + num < 0) {
      return;
    }
    let res = await addShopcarAPI({
      goodId: id,
      num
    });
    if(res.data.code === 0) {
      // 调取父组件 init 方法更新购物车环境
      this.props.init();
    }
  }

  goDetail() {

  }

  render() {
    let item = this.props.goodsList;
    return (
      <div className="shop-car-cell">
        <div className="shop-img">
          <img src={item.img} alt=""/>
        </div>
        <div className="good-info">
          <div className="top">
            {/* 产品名称和规格 */}
            <div className="name">
              <h2>{item.name}</h2>
              <p>规格1</p>
            </div>
            {/* 删除按钮 */}
            <IconFont onClick={() => {this.handleGoodNum(item.good_id, -item.num)}} className="delete-good" type="icon-shanchu" />
          </div>
          <div className="bot">
            {/* 数量加减 */}
            <div className="choose-num">
              <IconFont onClick={() => {this.handleGoodNum(item.good_id, -1)}} className={item.num <= 1 ? 'num-btn unshow' : 'num-btn'} type="icon-jian" />
              <span>{item.num}</span>
              <IconFont onClick={() => {this.handleGoodNum(item.good_id, 1)}} className="num-btn" type="icon-jia" />
            </div>
            {/* 金额 */}
            <h4 className="price">￥{item.price*item.num}</h4>
          </div>
        </div>
      </div>
    );
  }
}

export default ShopCarCell;
