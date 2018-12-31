import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './index.scss'
//引进全局状态管理
import {inject,observer} from 'mobx-react';
import menus from "@/config/menu";
//把需要的全局状态inject过来
@inject('commonState')
@observer class FootNavList extends Component {
  constructor(props) {
    super();
    this.state={
        titleName:""
    }
    this.getHeaderTitleFn = this.getHeaderTitleFn.bind(this);

  }
  getHeaderTitleFn = (title)=> (event) => {
    const {commonState} = this.props;
    commonState.handleStoreHeaderTitle(title);
    this.setState({
        titleName:title
    })
  }
  render() {
    return (
     <div className="foot-nav">
         {
              menus.map((item,i)=>{
                let titleName = item.title;
                let classN = item.class;
                let iconClass = item.iconClass;
                let keyR = item.keyR;
                return (
                   <NavLink 
                    to={keyR}  
                    className={classN} 
                    key={titleName+i} 
                    onClick={this.getHeaderTitleFn(titleName)}
                    isActive={(match, location)=>{//选择函数
                        if (!match) {
                            return false
                        }
                        let locationPathName = location.pathname;
                        if(locationPathName === keyR){
                            return true;
                        }else{
                            return false;
                        }
                        
                    }}
                   >
                       <div className={iconClass}></div>
                       <p>{titleName}</p>
                   </NavLink>
                )
            })
         }
     </div>
    );
  }
}

export default FootNavList;