/* ========================================================

    jason
    2019/03/12
    用户个人信息状态：
    购物车商品，数量，总价

   ====================================================== */

import { observable, computed, action, autorun } from 'mobx';
import { queryShopcarListAPI } from '@/apis/modules/goods';

class UserState {
  @observable shopCarList = [];   // 购物车商品
  @observable shopCarTotalNum = 0;
  @observable shopCarTotalPrice = 0;

  @computed get _shopCarTotalNum() {
    return this.shopCarTotalNum;
  }
  @computed get _shopCarTotalPrice() {
    return this.shopCarTotalPrice;
  }
  @computed get _shopCarList() {
    return this.shopCarList;
  }

  @action async getUserShopCarList() {
    if(!localStorage.getItem('QR_TOKEN')) return;
    let res = await queryShopcarListAPI();
    if(res.data.code === 0) {
      this.shopCarList = res.data.list;
      this.shopCarTotalNum = res.data.total_num;
      this.shopCarTotalPrice = res.data.total_price;
    }
  }

}

const userState = new UserState();

autorun(() => {
  console.log(userState);
})


export default userState;
