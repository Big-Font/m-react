import React, { Component } from 'react';
import { Route, HashRouter, Switch, } from 'react-router-dom';

import Index from '@/views/Index';
import DecoratorsList from '@/views/DecoratorsList';
import CasesDetail from '@/views/CasesDetail';
import SpikeDetail from '@/views/SpikeDetail';
import Mine from '@/views/Mine';
import Page404 from '@/views/Page404';
import HeadNav from '@/components/HeadNav'
import FootNav from '@/components/FootNav'
import Login from '@/views/Login'
import Register from '@/views/Register'
import FindDecorator from '@/views/FindDecorator'
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
                <div>
                    <HeadNav />
                    <Switch>
                        <Route exact path="/" component={Index} />
                        {/* 装修案例 */}
                        <Route exact path="/decorationCases" component={DecoratorsList} />
                        {/* 装修案例详情 */}
                        <Route exact path="/casesDetail/:id" component={CasesDetail} />
                        {/* 秒杀活动详情 */}
                        <Route exact path="/spikeDetail/:id" component={SpikeDetail} />
                        {/* 我的 */}
                        <Route exact path="/mine" component={Mine} />
                        <Route exact path="/findDecorator" component={FindDecorator} />
                        <Route exact path="/register" component={Register} />
                        <Route exact path="/login" component={Login} />
                        <Route component={Page404} />
                    </Switch>
                    {
                        (header === "登录" ||  header === "注册") ? "" : <FootNav />
                    }
                </div>
            </HashRouter>
        )
    }
}
