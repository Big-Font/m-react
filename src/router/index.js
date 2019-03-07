import React, { Component } from 'react';
import { Route, HashRouter, Switch, } from 'react-router-dom';

import AuthRouter from '@/components/AuthRouter';
import Index from '@/views/Index';
import DecoratorsList from '@/views/DecoratorsList';
import CasesDetail from '@/views/CasesDetail';
import SpikeList from '@/views/SpikeList';
import SpikeDetail from '@/views/SpikeDetail';
import Mine from '@/views/Mine';
import MineChangePInfo from '@/views/Mine/changePersonInfo';
import goodsTypeList from '@/views/goodsTypeList';
import GoodsList from '@/views/GoodsList';
import Page404 from '@/views/Page404';
import HeadNav from '@/components/HeadNav'
import FootNav from '@/components/FootNav'
import Login from '@/views/Login'
import Register from '@/views/Register'
import FindDecorator from '@/views/FindDecorator'
import GetWechatUserInfo from '@/views/GetWechatUserInfo'
import { inject, observer } from 'mobx-react';
//引进全局状态管理
//把需要的全局状态inject过来
@inject('commonState')
@observer
export default class Routers extends Component {
    constructor(props) {
        super();
    }
    render () {
        const {commonState} = this.props;
        let header = commonState.getHeaderTitleFromStore;
        return (
            <HashRouter>
                <React.Fragment>
                    <HeadNav />
                    <Switch>
                        {/* 首页 */}
                        <Route exact path="/" component={Index} />
                        {/* 装修案例 */}
                        <Route exact path="/decorationCases" component={DecoratorsList} />
                        {/* 装修案例详情 */}
                        <Route exact path="/casesDetail/:id" component={CasesDetail} />
                        {/* 秒杀活动列表 */}
                        <Route exact path="/spikeList" component={SpikeList} />
                        {/* 秒杀活动详情 */}
                        <Route exact path="/spikeDetail/:id" component={SpikeDetail} />
                        {/* 我的 */}
                        <Route exact path="/mine" component={Mine} />
                        {/* 修改个人信息 */}
                        <Route exact path="/mine/changePersonInfo" component={MineChangePInfo} />
                        {/* 找师傅 --- 登录拦截 */}
                        {/* <Route exact path="/findDecorator" component={FindDecorator} /> */}
                        <AuthRouter path="/findDecorator" component={FindDecorator} />
                        {/* 商品分类列表 */}
                        <Route exact path="/goodsTypeList" component={goodsTypeList} />
                        {/* 商品列表 */}
                        <Route exact path="/goodsList/:genreId" component={GoodsList} />
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
                        (header === "登录" ||  header === "注册") ? null : <FootNav />
                    }
                </React.Fragment>
            </HashRouter>
        )
    }
}
