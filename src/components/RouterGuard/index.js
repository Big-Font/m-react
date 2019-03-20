//routerGuard.js
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { inject, observer } from 'mobx-react';
import Loadable from 'react-loadable';
import AnimatedRouter from 'react-animated-router'; //导入我们的的AnimatedRouter组件
import Loading from '@/components/Loading';
import renderRoutesMap from '@/router/renderRoutesMap'

@inject('commonState')
@observer
@withRouter
class RouterGuard extends Component {
    constructor(props) {
        super()
    }
    componentWillMount() {
      console.log('react路由守卫执行了')
        // let { history: { replace }, authorization, location } = this.props
        // if (authorization) replace('./login')
        // if (location.pathname === '/') replace('./asd')
        // console.log('路由跳转前的拦截', this.props)
    }
    render() {
        let { component, routes = [] } = this.props
        console.log('准备渲染compoent前', this.props)
        const LoadableComponent = Loadable({
          loader: () => import(`${component}`),
          loading: Loading,
          delay: 300
        });

        console.log(LoadableComponent)
        // const LoadableComponent = Loadable({
        //     loader: () => import(`${component}`),
        //     loading: Loading,
        //     delay: 300
        // })
        return (
            <div>
                <LoadableComponent {...this.props} />
                {renderRoutesMap(routes)}
            </div>

        )
    }
}

export default RouterGuard
