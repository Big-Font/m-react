import React, { Component } from 'react';
import { Route, HashRouter, Switch } from 'react-router-dom';

import Index from '@/views/Index';
import NewsList from '@/views/NewsList';
import Mine from '@/views/Mine';
import Page404 from '@/views/Page404';
import HeadNav from '@/components/HeadNav'
import FootNav from '@/components/FootNav'
import Login from '@/views/Login'
import Register from '@/views/Register'
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
                        <Route exact path="/decorationCases" component={NewsList} />
                        <Route exact path="/mine" component={Mine} />
                        <Route exact path="/register" component={Register} />
                        <Route exact path="/login" component={Login} />
                        <Route component={Page404} />
                    </Switch>
                    {
                        (header == "登录" ||  header == "注册") ? "" : <FootNav /> 
                    }
                </div>
            </HashRouter>
        )
    }
}