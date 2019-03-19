import React, { Component } from 'react';
import { Route, HashRouter, BrowserRouter, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';
import AnimatedRouter from 'react-animated-router'; //导入我们的的AnimatedRouter组件
import 'react-animated-router/animate.css'; //导入默认的切换动画样式，如果需要其它切换样式，可以导入自己的动画样式定义文件

import AuthRouter from '@/components/AuthRouter';
import Loading from '@/components/Loading';
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

//引进全局状态管理
//把需要的全局状态inject过来
@inject('commonState')
@observer
export default class Routers extends Component {
    constructor(props) {
        super(props);
        this.state = {
          showFootNav: true
        }
    }

    componentDidMount(){
        // 去除splash
        let el=document.getElementById('splash'); //html标签
        el.className='loaded';
        setTimeout(()=>{
            if(!!el) el.remove();
            // 显示 header
            this.props.commonState.handleHeaderStatus(true);
        },600);
    }

    render () {
        return (
            <BrowserRouter>
                <React.Fragment>
                    {
                      this.props.commonState._showHeader ? <HeadNav>{this.props.commonState._showHeader}</HeadNav> : null
                    }
                    <AnimatedRouter>
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
                        {/* <Route exact path={{pathname: '/goodsTypeList', state={title: '商品列表'}}} component={GoodsTypeList} /> */}
                        {/* 商品详情 */}
                        <Route path="/goodDetail/:id" component={GoodDetail} />
                        {/* 购物车 */}
                        <AuthRouter path="/shopcar" component={Shopcar} />
                        {/* 注册 */}
                        <Route exact path="/register" component={NewRegister} />
                        {/* <Route exact path="/newRegister" component={NewRegister} /> */}
                        {/* 登录 */}
                        <Route exact path="/login" component={NewLogin} />
                        {/* <Route exact path="/newlogin" component={NewLogin} /> */}
                        {/* 测试获取用户信息 */}
                        <Route exact path="/getWechatUserInfo" component={GetWechatUserInfo} />
                        {/* 404页面 */}
                        <Route component={Page404} />
                    </AnimatedRouter>
                    {
                        this.props.commonState._showFooter ?  <FootNav /> : null
                    }
                </React.Fragment>
            </BrowserRouter>
        )
    }
}
