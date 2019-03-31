import React, { Component } from 'react';
import { decoratorlists, delDecoratorlist, hurryDecoratorlist } from '@/apis/modules/findDecorator';
import { Card, WingBlank, WhiteSpace, Button } from 'antd-mobile';
import './index.scss'
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
        this.buttonStyleL = {
            padding: 0,
            border: "none",
            boxShadow: "none",
            width: "100%"
        }
    }
    async delDecoratorlistInit(id) {
        let data = {
           id:id
        }
        let res = await delDecoratorlist(data);
        if (res.data.code === 0) {//成功
            this.decoratorlistInit();
            data = null;
        }
    }
    async hurryDecoratorlistInit(id) {
        let data = {
            id:id
         }
        let res = await hurryDecoratorlist(data);
        if (res.data.code === 0) {//成功
            this.decoratorlistInit();
            data = null;
        }
    }
    async decoratorlistInit() {
        let res = await decoratorlists();
        if (res.data.code === 0) {//成功
            this.setState({
                decoratorList: res.data.list
            })
        }
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
        const { ...rest } = this.props;
        return (
            <div className="decoratorList" >
                {
                    decoratorList.length > 0 ? (
                        <WingBlank size="lg">
                            <WhiteSpace size="lg" />
                            {
                                decoratorList.map((item, ind) => {
                                    let details = item.details;
                                    let title = item.title;
                                    let isOver = item.isOver;
                                    let img = item.imgs.length ? item.imgs[0] : "https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg";
                                    let ishurry = !item.ishurry ? false : true;
                                    let id = item.id;
                                    return (
                                        <Card className="decoratorList-card" key={title + ind}>
                                            <Card.Header
                                                title={<span className="decoratorList-card-title">{title}</span>}
                                                thumb={<img src={img} />}
                                                extra={<span className={isOver == 1 ? "decorator-no" : "decorator-yes"}>{isOver == 1 ? "等待联系" : "已有联系"}</span>}
                                            />
                                            <Card.Body>
                                                <div>{details}</div>
                                            </Card.Body>
                                            <Card.Footer content={
                                                <Button
                                                    type="primary"
                                                    size="small"
                                                    style={this.buttonStyleL}
                                                    disabled={ishurry}
                                                    onClick={isOver == 1 ? this.hurryDecoratorlistInit.bind(this,id) : this.delDecoratorlistInit.bind(this,id)}
                                                >{isOver == 1 ? ishurry ? "已催单" : "我要催单" : "删除"}</Button>}
                                            />
                                        </Card>
                                    )
                                })
                            }

                            <WhiteSpace size="lg" />
                        </WingBlank>
                    ) : (
                            <p className="decorator-nodata">( 暂未数据 )</p>
                        )
                }
            </div>
        );
    }
}
export default DecoratorLists;