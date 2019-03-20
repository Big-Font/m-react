//renderRoutes.js
import React, { Component } from 'react';
import { Route, HashRouter, BrowserRouter, Switch } from 'react-router-dom';
import renderRoutesMap from './renderRoutesMap'
/*
 * renderRoutes 渲染路由
 * @param  {array}      routes              路由列表
 * @param  {object}     extraProps  = {}    extra的属性
 * @param  {object}     switchProps = {}    switch的属性
 */
const renderRoutes = ({ routes, extraProps = {}, switchProps = {} }) => (
    <BrowserRouter>
        <Switch {...switchProps}>
            {renderRoutesMap(routes)}
        </Switch>
    </BrowserRouter>
)

export default renderRoutes


