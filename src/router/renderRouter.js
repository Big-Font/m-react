//renderRoutes.js
import React, { Component } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import renderRoutesMap from './renderRoutesMap'
import FootNav from '@/components/FootNav'
/*
 * renderRoutes 渲染路由
 * @param  {array}      routes              路由列表
 * @param  {object}     extraProps  = {}    extra的属性
 * @param  {object}     switchProps = {}    switch的属性
 */
const renderRoutes = ({ routes, extraProps = {}, switchProps = {} }) => (
    <BrowserRouter>
      <React.Fragment>
        <Switch {...switchProps}>
            {renderRoutesMap(routes)}
        </Switch>
        <FootNav />
      </React.Fragment>
    </BrowserRouter>
)

export default renderRoutes


