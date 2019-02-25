/* ========================================================

    李雪魁
    2019/02/26
    用户信息
    
   ====================================================== */

import { observable, computed, action, autorun } from 'mobx';

class MineState {
    @observable personInfo = {
        address: null,
        age: null,
        email: null,
        img: null,
        name: null,
        phone: null,
        sex: null,
        username: null,
        imageUrl: null,
    };
    @computed get _personInfo() {
        return this.personInfo;
    }
    @action setPersonInfo(obj) {
        this.personInfo = obj;
    }
    @action setPersonInfoSomeOne(el,nav) {
        this.personInfo[el] = nav;
    }
}
const mineState = new MineState();

autorun(() => {
    console.log(mineState);
})

export default mineState;