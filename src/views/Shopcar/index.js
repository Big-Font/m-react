import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import ShopCarCell from './shapCarCell';
import { queryShopcarListAPI } from '@/apis/modules/goods';
require('./index.scss');

@inject('userState')
@observer
class Shopcar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      goodsList:[],
      total_num: 0,
      total_price: 0
    }
    this.init = this.init.bind(this);
  }

  async componentDidMount() {
    this.init();
  }

  // 调用 store 中 action 来更新数据
  init() {
    this.props.userState.getUserShopCarList();
  }

  render() {
    let { _shopCarList, _shopCarTotalNum, _shopCarTotalPrice } = this.props.userState;
    return (
      <div className="shop-car">
      {/* 购物车列表 */}
      {
        _shopCarList.map( (item, index) => {
          return (
            <ShopCarCell init={this.init} goodsList={item} key={item.id} />
          )
        })
      }
      {/* footer */}
        <div className="car-footer">
          {/* <div className="total-num">{_shopCarTotalNum}个产品</div> */}
          <div className="total-price">累计{_shopCarTotalPrice}元 (共{_shopCarTotalNum}个产品)</div>
        </div>
      </div>
    );
  }
}

export default Shopcar;
