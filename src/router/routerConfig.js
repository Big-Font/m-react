const routes = [
  {
    path: '/',
    component: '@/views/Index/index.js',
    meta: {
      title: '首页'
    }
  },
  {
    path: '/decorationCases',
    component: '@/views/DecoratorsList',
    meta: {
      title: '装修案例'
    }
  },
  {
    path: '/casesDetail/:id',
    component: '@/views/CasesDetail',
    meta: {
      title: '装修案例'
    }
  },
  {
    path: '/spikeList',
    component: '@/views/SpikeList',
    meta: {
      title: '秒杀活动'
    }
  },
  {
    path: '/spikeDetail/:id',
    component: '@/views/SpikeDetail',
    meta: {
      title: '秒杀活动'
    }
  },
  {
    path: '/mine',
    component: '@/views/Mine',
    meta: {
      title: '个人中心'
    }
  },
  {
    path: '/mine/changePersonInfo',
    component: '@/views/Mine/changePersonInfo',
    meta: {
      title: '修改个人信息', auth: true
    }
  },
  {
    path: '/findDecorator',
    component: '@/components/AuthRouter',
    meta: {
      title: '找师傅', auth: true
    }
  },
  {
    path: '/goodsTypeList',
    component: '@/views/goodsTypeList',
    meta: {
      title: '商品列表',
    }
  },
  {
    path: '/goodDetail/:id',
    component: '@/views/GoodDetail',
    meta: {
      title: '商品详情',
    }
  },
  {
    path: '/shopcar',
    component: '@/views/Shopcar',
    meta: {
      title: '购物车', auth: true
    }
  },
  {
    path: '/register',
    component: '@/views/Register/newRegister',
    meta: {
      title: '注册', showHeader: false,
    }
  },
  {
    path: '/register',
    component: '@/views/Register/newRegister',
    meta: {
      title: '登录', showHeader: false,
    }
  },
  {
    path: '/getWechatUserInfo',
    component: '@/views/GetWechatUserInfo',
    meta: {
      title: '测试个人信息'
    }
  },
  {
    path: '*',
    component: '@/views/Page404',
    meta: {
      title: '404', exact: true
    }
  },
]

export default routes
