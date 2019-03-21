//renderRoutes.js
import React, { Component } from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import AnimatedRouter from 'react-animated-router'; //导入我们的的AnimatedRouter组件
import 'react-animated-router/animate.css'; //导入默认的切换动画样式，如果需要其它切换样式，可以导入自己的动画样式定义文件
import FrontendAuth from '@/components/FrontendAuth'
import FootNav from '@/components/FootNav'
import routerConfig from './routes'
/*
 * renderRoutes 渲染路由
 * @param  {array}      routes              路由列表
 * @param  {object}     extraProps  = {}    extra的属性
 * @param  {object}     switchProps = {}    switch的属性
 */
const renderRoutes = ({ routes, extraProps = {}, switchProps = {} }) => (
    <BrowserRouter>
      <React.Fragment>
        <AnimatedRouter>
          {
            routerConfig.map((route, index) => {
              return <FrontendAuth config={route} key={index} />
            })
          }
        </AnimatedRouter>
        <FootNav />
      </React.Fragment>
    </BrowserRouter>
)

export default renderRoutes


