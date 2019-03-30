import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { decoratorlists } from '@/apis/modules/findDecorator';
import IconFont from '@/components/Iconfont';
import { Collapse,Icon  } from 'antd';
import './index.scss'
const Panel = Collapse.Panel;
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
        this.decoratorlistInit = this.decoratorlistInit.bind(this);
        this.customPanelStyle = {
            background: '#f7f7f7',
            borderRadius: 4,
            marginBottom: 24,
            overflow: 'hidden',
        }
    }
    async decoratorlistInit() {
        let res = await decoratorlists();
        if (res.data.code === 0) {//成功
        this.setState({
            decoratorList:res.data.list
        })}
    }
    async componentDidMount() {
        if (localStorage.getItem('QR_TOKEN')) {
            //请求个人信息
            await this.decoratorlistInit();
        }
    }
    componentWillUnmount() {

    }
    render() {
        const { decoratorList } = this.state;
        const {...rest } = this.props;
        return (
            <div className="decoratorList" >
                <Collapse  >
                    {
                        decoratorList.length > 0 ?
                            (
                                decoratorList.map((item, ind) => {
                                    let details = item.details;
                                    let title = item.title;
                                    let isOver = item.isOver
                                    return(
                                        <Panel 
                                            header={title}
                                            key={ind+""}
                                            extra={isOver == 1 ? <p className="decorator-no">等待师傅联系</p> : <p className="decorator-yes">已有师傅联系</p>}
                                            style={this.customPanelStyle}
                                        >
                                            <p >{details}</p>
                                        </Panel>
                                    )
                                })
                            ) : <p className="decorator-nodata">( 暂未数据 )</p>
                    }
                </Collapse>
            </div>
        );
    }
}
export default DecoratorLists;