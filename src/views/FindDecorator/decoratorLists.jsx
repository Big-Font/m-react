import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { decoratorlists } from '@/apis/modules/findDecorator';
import IconFont from '@/components/Iconfont';
import { List } from 'antd-mobile';
import './index.scss'
@inject('commonState')
@observer
@withRouter
//把需要的全局状态inject过来
@inject('commonState')
class DecoratorLists extends Component {
    constructor(props) {
        super();
        this.state = {
            decoratorList: [
               
            ]
        }

    }

    async componentDidUpdate() {
        let res = await decoratorlists();
        console.log(res)
    }

    componentWillUnmount() {

    }

    render() {
        const { decoratorList } = this.state;
        return (
            <ul className="decoratorList">
                {
                    decoratorList.length > 0 ?
                    (decoratorList.map((item, ind) => {
                        let state = item.state;
                        let title = item.title;
                        return (
                            <List className="clearfix decorator-list" key={title}>
                                <div className="clearfix fl">
                                    <IconFont
                                        type={state ? 'icon-iconfontroundcheck' : 'icon-jinggao'}
                                        className="fl"
                                        style={{ fontSize: '1rem', marginTop: "0.3rem", color: state ? "#1890ff" : "#f00" }}
                                    />
                                    <span className="fl">{title}</span>
                                </div>
                                <IconFont
                                    type={'icon-shanchu'}
                                    className="fr decorator-delIcon"
                                />
                            </List>
                        )
                    })) : <p className="decorator-nodata">( 暂未数据 )</p>
                }
            </ul>
        );
    }
}
export default DecoratorLists;
