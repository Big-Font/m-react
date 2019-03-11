/* ========================================================

    李雪魁
    2018/12/31
    头部导航数据状态

   ====================================================== */

import { observable, computed, action, autorun } from 'mobx';

class CommonState {
    @observable headerTitle = '首页';
    @observable keyNum = 0;
    @computed get getHeaderTitleFromStore() {
        // alert(111)
        return this.headerTitle;
    }
    @computed get _keyNum () {
        return this.keyNum;
    }
    @action handleStoreHeaderTitle(title) {
        this.headerTitle = title;
    }
    @action selectKey() {
        let pathNameRouter = window.location.pathname;
        this.updateRouterKey(pathNameRouter);
    }
    @action updateRouterKey = (key) => {
        switch (key) {
            case "/findDecorator":
                this.keyNum = 2;
                this.headerTitle = "找师傅"
                break;
            case "/":
                this.keyNum = 0;
                this.headerTitle = "首页"
                break;
            case "/decorationCases":
                this.keyNum = 1;
                this.headerTitle = "装修案例"
                break;
            case "/mine":
                this.keyNum = 3;
                this.headerTitle = "我的"
                break;
            case "/mine/changePersonInfo":
                this.keyNum = 3;
                this.headerTitle = "修改用户信息"
                break;
            default:
                this.keyNum = 0;
                this.barName = "首页"
        }
    }
}

const commonState = new CommonState();

autorun(() => {
    console.log(commonState);
})

export default commonState;
