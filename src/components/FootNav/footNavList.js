import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './index.scss'
//引进全局状态管理
import {inject,observer} from 'mobx-react';
import menus from "@/config/menu";
import IconFont from '@/components/Iconfont';

//把需要的全局状态inject过来
@inject('commonState')
@observer
class FootNavList extends Component {
  constructor(props) {
    super();
    this.state={
        titleName: ""
    }
    this.getHeaderTitleFn = this.getHeaderTitleFn.bind(this);
  }

  getHeaderTitleFn = (title) => (event) => {
    console.log(111)
    const { commonState } = this.props;
    commonState.handleStoreHeaderTitle(title);
    this.setState({
        titleName:title
    })
  }

  render() {
    const {commonState} = this.props;
    let num = commonState._keyNum;
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
                  // className={classN}
                  key={titleName+i}
                  activeClassName="active"
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
                    <IconFont type={iconClass} style={{ fontSize: '0.4rem'}}/>
                    {/* <div className={iconClass}></div> */}
                    <p>{titleName}</p>
                </NavLink>
              )
            })
          }
      </React.Fragment>
    );
  }
}

export default FootNavList;
