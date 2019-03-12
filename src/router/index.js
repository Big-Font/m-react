import React, { Component } from 'react';
import { Route, HashRouter, BrowserRouter, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';

import AuthRouter from '@/components/AuthRouter';
import Index from '@/views/Index';
// import DecoratorsList from '@/views/DecoratorsList';
// import CasesDetail from '@/views/CasesDetail';
// import SpikeList from '@/views/SpikeList';
// import SpikeDetail from '@/views/SpikeDetail';
// import Mine from '@/views/Mine';
// import MineChangePInfo from '@/views/Mine/changePersonInfo';
// import GoodsTypeList from '@/views/goodsTypeList';
import GoodDetail from '@/views/GoodDetail';
import Shopcar from '@/views/Shopcar';
import Page404 from '@/views/Page404';
import HeadNav from '@/components/HeadNav'
import FootNav from '@/components/FootNav'
import Login from '@/views/Login'
import Register from '@/views/Register'
import FindDecorator from '@/views/FindDecorator'
import GetWechatUserInfo from '@/views/GetWechatUserInfo'
import { inject, observer } from 'mobx-react';


function MyLoadingComponent({ error, pastDelay }) {
  if (error) {
    return <div>Error!</div>;
  } else if (pastDelay) {
    return <div>Loading...</div>;
  } else {
    return null;
  }
}

const DecoratorsList = Loadable({
  loader: () => import(/* webpackChunkName: "DecoratorsList" */ '@/views/DecoratorsList'),
  loading: MyLoadingComponent,
  delay: 300
});
const CasesDetail = Loadable({
  loader: () => import(/* webpackChunkName: "CasesDetail" */ '@/views/CasesDetail'),
  loading: MyLoadingComponent,
  delay: 300
});
const SpikeList = Loadable({
  loader: () => import(/* webpackChunkName: "SpikeList" */ '@/views/SpikeList'),
  loading: MyLoadingComponent,
  delay: 300
});
const SpikeDetail = Loadable({
  loader: () => import(/* webpackChunkName: "SpikeDetail" */ '@/views/SpikeDetail'),
  loading: MyLoadingComponent,
  delay: 300
});
const Mine = Loadable({
  loader: () => import(/* webpackChunkName: "Mine" */ '@/views/Mine'),
  loading: MyLoadingComponent,
  delay: 300
});
const ChangePersonInfo = Loadable({
  loader: () => import(/* webpackChunkName: "changePersonInfo" */ '@/views/Mine/changePersonInfo'),
  loading: MyLoadingComponent,
  delay: 300
});
const GoodsTypeList = Loadable({
  loader: () => import(/* webpackChunkName: "goodsTypeList" */ '@/views/goodsTypeList'),
  loading: MyLoadingComponent,
  delay: 300
});
//引进全局状态管理
//把需要的全局状态inject过来
@inject('commonState')
@observer
export default class Routers extends Component {
    constructor(props) {
        super(props);
    }
    render () {
        const {commonState} = this.props;
        let header = commonState.getHeaderTitleFromStore;
        let showFootNav = ['/', '/decorationCases', '/spikeList', '/mine', '/findDecorator', '/goodsTypeList'].some( item => {
          return item === window.location.pathname;
        })
        console.log('是否显示底部导航栏:', showFootNav)
        return (
            <BrowserRouter>
                <React.Fragment>
                    <HeadNav />
                    <Switch>
                        {/* 首页 */}
                        <Route exact path="/" component={Index} />
                        {/* 装修案例 */}
                        <Route exact path="/decorationCases" component={DecoratorsList} />
                        {/* 装修案例详情 */}
                        <Route path="/casesDetail/:id" component={CasesDetail} />
                        {/* 秒杀活动列表 */}
                        <Route exact path="/spikeList" component={SpikeList} />
                        {/* 秒杀活动详情 */}
                        <Route path="/spikeDetail/:id" component={SpikeDetail} />
                        {/* 我的 */}
                        <Route exact path="/mine" component={Mine} />
                        {/* 修改个人信息 */}
                        <Route exact path="/mine/changePersonInfo" component={ChangePersonInfo} />
                        {/* 找师傅 --- 登录拦截 */}
                        {/* <Route exact path="/findDecorator" component={FindDecorator} /> */}
                        <AuthRouter path="/findDecorator" component={FindDecorator} />
                        {/* 商品分类列表 */}
                        <Route exact path="/goodsTypeList" component={GoodsTypeList} />
                        {/* 商品详情 */}
                        <Route path="/goodDetail/:id" component={GoodDetail} />
                        {/* 购物车 */}
                        <Route exact path="/shopcar" component={Shopcar} />
                        {/* 注册 */}
                        <Route exact path="/register" component={Register} />
                        {/* 登录 */}
                        <Route exact path="/login" component={Login} />
                        {/* 测试获取用户信息 */}
                        <Route exact path="/getWechatUserInfo" component={GetWechatUserInfo} />
                        {/* 404页面 */}
                        <Route component={Page404} />
                    </Switch>
                    {
                        showFootNav ?  <FootNav /> : null
                    }
                </React.Fragment>
            </BrowserRouter>
        )
    }
}
