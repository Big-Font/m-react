/* ========================================================

    李雪魁
    2018/12/31
    头部导航数据状态

   ====================================================== */

import { observable, computed, action, autorun } from 'mobx';
import { wxShare } from '@/utils/wxShare';
import { HEADER_TITLE_MAP } from '@/config/headerTitle';

class CommonState {
    @observable headerTitle = '首页';
    @observable showHeader = false;
    @observable showFooter = false;
    @observable keyNum = 0;
    @observable wxShareInfo = {
      title: '晴睿装饰',
      desc: '用科技让装修更简单',
      imgUrl: 'https://qingruiserver.wangshen.top/images/spikeList/85c282803fad11e998829db7f28b0a3816.png'
    }
    @computed get getHeaderTitleFromStore() {
        return this.headerTitle;
    }
    @computed get _showHeader() {
      return this.showHeader;
    }
    @computed get _showFooter() {
      return this.showFooter;
    }
    @computed get _keyNum () {
        return this.keyNum;
    }
    @action handleStoreHeaderTitle(title) {
        this.headerTitle = title;
    }
    @action handleFooterStatus(status) {
      this.showFooter = status;
    }
    @action handleHeaderStatus(status) {
      this.showHeader = status;
    }
    @action selectKey() {
        let pathNameRouter = window.location.pathname;
        this.updateRouterKey(pathNameRouter);
    }
    /*
    *   微信分享
    */
    @action wxShareInit() {
      wxShare(this.wxShareInfo);
    }
    @action handleWxShareInfo(info) {
      for(let name in info) {
        this.wxShareInfo[name] = info[name];
      }
    }
    @action updateRouterKey = (key) => {
        if(HEADER_TITLE_MAP[key]) {
          this.headerTitle = HEADER_TITLE_MAP[key];
        }else {
          if(key.match(/^\/casesDetail/)){
            this.headerTitle = '装修案例详情';
          }else if(key.match(/^\/spikeDetail/)){
            this.headerTitle = '秒杀活动详情';
          }else if(key.match(/^\/goodDetail/)){
            this.headerTitle = '商品详情';
          }else {
            this.headerTitle = '晴睿装饰';
          }
        }
    }
}

const commonState = new CommonState();

autorun(() => {
    console.log(commonState);
})

export default commonState;
