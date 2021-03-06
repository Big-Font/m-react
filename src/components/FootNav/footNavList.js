import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import './index.scss'
//引进全局状态管理
import {inject,observer} from 'mobx-react';
import menus from "@/config/menu";
import IconFont from '@/components/Iconfont';

//把需要的全局状态inject过来
@inject('commonState')
@observer
@withRouter
class FootNavList extends Component {
  constructor(props) {
    super();
    this.state={
        titleName: ""
    }
    this.getHeaderTitleFn = this.getHeaderTitleFn.bind(this);
  }

  getHeaderTitleFn = (title) => (event) => {
    const { commonState } = this.props;
    commonState.handleStoreHeaderTitle(title);
    this.setState({
        titleName:title
    })
  }

  render() {
    return (
      <React.Fragment>
          {
            menus.map((item,i)=>{
              let titleName = item.title;
              let classN = item.class;
              let iconClass = item.iconClass;
              let keyR = item.keyR;
              return (
                <NavLink
                  exact
                  to={keyR}
                  className={classN}
                  key={titleName+i}
                  // activeClassName="active"
                  onClick={this.getHeaderTitleFn(titleName)}
                  // isActive={(match, location)=>{//选择函数
                  //     if (!match) {
                  //         return false
                  //     }
                  //     if(i === num){
                  //         return true;
                  //     }else{
                  //         return false;
                  //     }
                  // }}
                >
                  {
                    classN === 'acs-list-goods'
                    ?
                    <img className="icon" src={require('@/images/icon/16.png')} alt=""/>
                    :
                    <React.Fragment>
                      <IconFont type={iconClass} style={{ fontSize: '0.4rem'}}/>
                      <p>{titleName}</p>
                    </React.Fragment>
                  }
                </NavLink>
              )
            })
          }
      </React.Fragment>
    );
  }
}

export default FootNavList;
