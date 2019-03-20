import React, { Component } from 'react';
import { Route, HashRouter, BrowserRouter, Switch } from 'react-router-dom';

import 'react-animated-router/animate.css'; //导入默认的切换动画样式，如果需要其它切换样式，可以导入自己的动画样式定义文件
import AuthRouter from '@/components/AuthRouter';
import RouterGuard from '@/components/RouterGuard'
import AnimatedRouter from 'react-animated-router'; //导入我们的的AnimatedRouter组件
import { inject, observer } from 'mobx-react';
import routes from './routerConfig';

// const DecoratorsList = Loadable({
//   loader: () => import(/* webpackChunkName: "DecoratorsList" */ '@/views/DecoratorsList'),
//   loading: Loading,
//   delay: 300
// });

//引进全局状态管理
//把需要的全局状态inject过来
const renderRoutesMap = (routes) => (
  routes.map((route, index) => {
      return (
          <Route key={index} path={route.path}  render={props => (
              <RouterGuard {...route} {...props} />
          )}
          />
      )
  })
)

export default renderRoutesMap
