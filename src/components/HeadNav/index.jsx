import React, { Component } from 'react';
import { withRouter } from 'react-router';
import IconFont from '@/components/Iconfont';
import './index.scss'
//引进全局状态管理
import {inject,observer} from 'mobx-react';
//把需要的全局状态inject过来
@inject('commonState')
@observer class HeadNav extends Component {
    constructor(props) {
        super();
        this.forBack = this.forBack.bind(this);
    }
    forBack() {
        // console.log(this.props)
        this.props.history.go(-1);
        //修改title 名字
        // await this.props.commonState.selectKey();
    }
    render() {
        const {commonState} = this.props;
        let header = commonState.getHeaderTitleFromStore;
        return (
            <div className="header-view">
                <div className="header clearfix">
                    <IconFont type='icon-guifandaohanglanfanhui' onClick={this.forBack} className="fl back" />
                    {/* <i className="fl" onClick={this.forBack}></i> */}
                    <h3 className="fl">{header}</h3>
                </div>
                <div className="stance"></div>
            </div>
        )
    }
}

export default withRouter(HeadNav);
