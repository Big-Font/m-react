/* ========================================================

    李雪魁
    2018/12/31
    首页banner
   ====================================================== */
   import React, { Component } from 'react';
   import { NavLink } from 'react-router-dom'
   import {simbleToolArr} from '@/config/homeBanner';
   import IconFont from '@/components/Iconfont';
   import '../index.scss';

   class SimbleTool extends Component {
     constructor(props) {
       super();
     }

     render() {
       return (
          <ul className="home-simbleTool clearfix">
            {
              simbleToolArr.map((item,index)=>{
                  let classPic = item.classPic;
                  let title = item.title;
                  let name = item.name;
                  let path = item.path;
                  return(
                      <li className={index === 3 ? "noMarRight  fl" : "fl"} key={title + index}>
                        <NavLink to={path} >
                          <i className={classPic}></i>
                          <span>{name}</span>
                        </NavLink>
                      </li>
                  )
              })
            }
          </ul>
       );
     }
   }
   export default SimbleTool;
