/* ========================================================
    李雪魁
    2018/12/31
    首页banner静态数据
   ====================================================== */
import banner0 from '@/images/home/homeBanner/0.png';
import banner1 from '@/images/home/homeBanner/1.png';
import banner2 from '@/images/home/homeBanner/2.png';
let homeBannerPic = [{
    pic: banner0,
    title: '1',
    class: 'index',
    iconClass: 'index-bg'
}, {
    pic: banner1,
    title: '2',
    class: 'acs-list',
    iconClass: 'acs-list-bg'
}, {
    pic: banner2,
    title: '3',
    class: 'mine',
    iconClass: 'mine-bg'
},];
let simbleToolArr = [{
    classPic: "tool1",
    title: 'tool1',
    name: '装修预算',
    path: '/spikeList'
}, {
    classPic: "tool2",
    title: 'tool2',
    name: '装修攻略',
    path: '/'
}, {
    classPic: "tool3",
    title: 'tool3',
    name: '装修记账',
    path: '/'
}, {
    classPic: "tool4",
    title: 'tool4',
    name: '业主口碑',
    path: '/'
},];

export {
    homeBannerPic,
    simbleToolArr
}

