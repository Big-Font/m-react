import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import FootNav from '@/components/FootNav';
import { getGoodsTypeListAPI, getGoodsAPI } from '@/apis/modules/goods';
require('./index.scss')

@inject('commonState')
@observer
@withRouter
class goodsTypeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      active: 0,
      appendBlock: false,
      queryGoods: {
        page: 1,
        typeId: 0,
      },
      goodList: []
    }
    this.handleNav = this.handleNav.bind(this);
    this.goGoodsList = this.goGoodsList.bind(this);
    this.getGoods = this.getGoods.bind(this);
    this.twoNavInit = this.twoNavInit.bind(this);
  }

  async componentDidMount() {
    this.props.commonState.handleFooterStatus(true);
    let res = await getGoodsTypeListAPI();
    if(res.data.code === 0) {
      let list = res.data.result;
      let appendBlock = list[0].children.length%3 === 2 ? true : false;
      this.twoNavInit(appendBlock, list);
    }
  }

  componentDidUpdate() {
    this.props.commonState.handleFooterStatus(true);
  }

  componentWillUnmount() {
    this.props.commonState.handleFooterStatus(false);
  }

  // 初始化二级分类
  twoNavInit(appendBlock, list){
    this.setState({
      appendBlock,
      list,
      queryGoods: {...this.state.queryGoods, typeId: list.length ? (list[0].children && list[0].children.length ? list[0].children[0].value : list[0].value) : 0}
    }, async () => {
      let res = await this.getGoods();
    })
  }
  // 请求商品列表
  getGoods() {
    return new Promise( async (resolve, reject) => {
      let res = await getGoodsAPI(this.state.queryGoods);
      if(res.data.code === 0) {
        this.setState({
          goodList: res.data.list
        }, () => {
          resolve();
        })
      }else {
        reject();
      }
    })
  }
  // 点击切换第一级类别
  handleNav(index) {
    let list = this.state.list[index].children ? this.state.list[index].children : [], appendBlock = false;
    if(list.length) {
      appendBlock = list.length%3 === 2 ? true : false;
    }else {
      appendBlock = false;
    }
    let typeId = list.length ? list[0].value : this.state.list[index].value;
    this.setState({
      active: index,
      appendBlock,
      queryGoods: {...this.state.queryGoods, typeId}
    }, async () => {
      let res = await this.getGoods();
    })
  }
  // 点击二级类别 重新筛选产品
  goGoodsList(item) {
    this.setState({
      queryGoods: {...this.state.queryGoods, typeId: item.value}
    }, async () => {
      let res = await this.getGoods();
    })
  }

  render() {
    let { list, active, appendBlock, goodList, queryGoods } = this.state;
    let childTypeArrObject = list.length ? list[active] : {} ;
    return (
      <div className="goods-type-list">
        {/* 一级分类列表 */}
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
          {/* 二级分类列表 */}
          <div className="two-genre">
            {
              childTypeArrObject.children
              ?
              childTypeArrObject.children.map((item, index) => {
                return (
                  <div key={item.value} onClick={() => {this.goGoodsList(item)}}>
                    <img className="type-img" src={item.img} alt={item.label} />
                    <div className={item.value === queryGoods.typeId ? 'active' : ''}>{item.label}</div>
                  </div>
                )
              })
              :
              null
            }
            <div className={ appendBlock? '' : 'appendBlock'}></div>
          </div>
          {/* 商品列表 */}
          <div className="goods-list">
            {/* 商品列表组件，可以抽象 */}
            {
              goodList.map((item, index) => {
                return (
                  <Link to={`/goodDetail/${item.id}`} className="good-cell" key={`${item.id}-${item.genreId}`}>
                    <div className="good-img">
                      <img className="img-bg" src={item.img} alt=""/>
                      <p>{item.seller}</p>
                    </div>
                    <div className="good-info">
                      <h4>{item.name}</h4>
                      <p className="introduce">{item.introduce}</p>
                      <p className="price">￥{item.price}</p>
                    </div>
                  </Link>
                )
              })
            }
          </div>
        </aside>
        {/* <FootNav /> */}
      </div>
    );
  }
}

export default goodsTypeList;
