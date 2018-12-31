/* ========================================================

    李雪魁
    2018/12/31
    头部导航数据状态
    
   ====================================================== */

import { observable, computed, action, autorun } from 'mobx';

class CommonState {
    @observable headerTitle = '首页';
    
    @computed get getHeaderTitleFromStore() {
        return this.headerTitle;
    }

    @action handleStoreHeaderTitle(title) {
        this.headerTitle = title;
    }
}

const commonState = new CommonState();

autorun( () => {
    console.log(commonState);
})

export default commonState;