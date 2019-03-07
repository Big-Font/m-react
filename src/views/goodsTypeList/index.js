import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { getGoodsTypeList } from '@/apis/modules/goods';
require('./index.scss')

@withRouter
class goodsTypeList extends Component {
  constructor(props) {
    super();
    this.state = {
      list: [],
      active: 0,
      appendBlock: false
    }
    this.handleNav = this.handleNav.bind(this);
    this.goGoodsList = this.goGoodsList.bind(this);
  }

  async componentDidMount() {
    let res = await getGoodsTypeList();
    if(res.data.code === 0) {
      this.setState({
        list: res.data.result
      })
    }
  }
  // 点击切换第一级类别
  handleNav(index) {
    let list = this.state.list[index].children, appendBlock = false;
    if(list) {
      appendBlock = this.state.list[index].children.length%3 === 2 ? true : false;
    }
    // let appendBlock = this.state.list[index].children ?
    this.setState({
      active: index,
      appendBlock
    })
  }
  // 点击二级类别跳转到商品列表
  goGoodsList(item) {
    this.props.history.push(`/goodsList/${item.value}`)
  }

  render() {
    let { list, active, appendBlock } = this.state;
    let childTypeArrObject = list.length ? list[active] : {} ;
    return (
      <div className="goods-type-list">
        <nav className="nav">
          {
            list.map((item, index) => {
              return (
                <div
                  className={active === index ? 'active': ''}
                  onClick={() => {this.handleNav(index)}}
                  key={item.value}>{item.label}</div>
              )
            })
          }
        </nav>
        <aside className="two-nav">
          {
            childTypeArrObject.children
            ?
            childTypeArrObject.children.map((item, index) => {
              return (
                <div key={item.value} onClick={() => {this.goGoodsList(item)}}>
                  <img className="type-img" src={item.img} alt={item.label} />
                  <div>{item.label}</div>
                </div>
              )
            })
            :
            null
          }
          <div className={ appendBlock? '' : 'appendBlock'}></div>
        </aside>
      </div>
    );
  }
}

export default goodsTypeList;
