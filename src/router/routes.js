import Loadable from 'react-loadable';
import Loading from '@/components/Loading';

const Index = Loadable({
  loader: () => import(/* webpackChunkName: "DecoratorsList" */ '@/views/Index'),
  loading: Loading,
  delay: 300
});
const DecoratorsList = Loadable({
  loader: () => import(/* webpackChunkName: "DecoratorsList" */ '@/views/DecoratorsList'),
  loading: Loading,
  delay: 300
});
const CasesDetail = Loadable({
  loader: () => import(/* webpackChunkName: "CasesDetail" */ '@/views/CasesDetail'),
  loading: Loading,
  delay: 300
});
const SpikeList = Loadable({
  loader: () => import(/* webpackChunkName: "SpikeList" */ '@/views/SpikeList'),
  loading: Loading,
  delay: 300
});
const SpikeDetail = Loadable({
  loader: () => import(/* webpackChunkName: "SpikeDetail" */ '@/views/SpikeDetail'),
  loading: Loading,
  delay: 300
});
const Mine = Loadable({
  loader: () => import(/* webpackChunkName: "Mine" */ '@/views/Mine'),
  loading: Loading,
  delay: 300
});
const ChangePersonInfo = Loadable({
  loader: () => import(/* webpackChunkName: "changePersonInfo" */ '@/views/Mine/changePersonInfo'),
  loading: Loading,
  delay: 300
});
const GoodsTypeList = Loadable({
  loader: () => import(/* webpackChunkName: "goodsTypeList" */ '@/views/goodsTypeList'),
  loading: Loading,
  delay: 300
});
const NewLogin = Loadable({
  loader: () => import(/* webpackChunkName: "newLogin" */ '@/views/NewLogin'),
  loading: Loading,
  delay: 300
});
const NewRegister = Loadable({
  loader: () => import(/* webpackChunkName: "NewRegister" */ '@/views/Register/newRegister'),
  loading: Loading,
  delay: 300
});
const Page404 = Loadable({
  loader: () => import(/* webpackChunkName: "NewRegister" */ '@/views/Page404'),
  loading: Loading,
  delay: 300
});


const routes = [
  {
    path: '/',
    component: Index,
    meta: {
      title: '首页'
    }
  },
  {
    path: '/decorationCases',
    component: DecoratorsList,
    meta: {
      title: '装修案例'
    }
  },
  // {
  //   path: '/casesDetail/:id',
  //   component: 'views/CasesDetail',
  //   meta: {
  //     title: '装修案例'
  //   }
  // },
  // {
  //   path: '/spikeList',
  //   component: 'views/SpikeList',
  //   meta: {
  //     title: '秒杀活动'
  //   }
  // },
  // {
  //   path: '/spikeDetail/:id',
  //   component: 'views/SpikeDetail',
  //   meta: {
  //     title: '秒杀活动'
  //   }
  // },
  // {
  //   path: '/mine',
  //   component: 'views/Mine',
  //   meta: {
  //     title: '个人中心'
  //   }
  // },
  // {
  //   path: '/mine/changePersonInfo',
  //   component: 'views/Mine/changePersonInfo',
  //   meta: {
  //     title: '修改个人信息', auth: true
  //   }
  // },
  {
    path: '/findDecorator',
    component: 'components/AuthRouter',
    meta: {
      title: '找师傅', auth: true
    }
  },
  // {
  //   path: '/goodsTypeList',
  //   component: 'views/goodsTypeList',
  //   meta: {
  //     title: '商品列表',
  //   }
  // },
  // {
  //   path: '/goodDetail/:id',
  //   component: 'views/GoodDetail',
  //   meta: {
  //     title: '商品详情',
  //   }
  // },
  // {
  //   path: '/shopcar',
  //   component: 'views/Shopcar',
  //   meta: {
  //     title: '购物车', auth: true
  //   }
  // },
  // {
  //   path: '/register',
  //   component: 'views/Register/newRegister',
  //   meta: {
  //     title: '注册', showHeader: false,
  //   }
  // },
  // {
  //   path: '/login',
  //   component: 'views/Register/newLogin',
  //   meta: {
  //     title: '登录', showHeader: false,
  //   }
  // },
  // {
  //   path: '/getWechatUserInfo',
  //   component: 'views/GetWechatUserInfo',
  //   meta: {
  //     title: '测试个人信息'
  //   }
  // },
  {
    path: '/404',
    component: Page404,
    meta: {
      title: '404', exact: true
    }
  },
]

export default routes
