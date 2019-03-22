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
      this.props.history.length > 1 ? this.props.history.go(-1) : this.props.history.push('/');
    }
    render() {
        const {commonState} = this.props;
        let header = commonState.getHeaderTitleFromStore;
        return (
            <div className="header-view">
                <div className="header clearfix">
                    <IconFont type='icon-guifandaohanglanfanhui' onClick={this.forBack} className="fl back" />
                    <h3 className="fl">{header}</h3>
                </div>
                <div className="stance"></div>
            </div>
        )
    }
}

export default withRouter(HeadNav);
