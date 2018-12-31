/* ========================================================

    李雪魁
    2018/12/31
    首页banner
   ====================================================== */
   import React, { Component } from 'react';
   import {simbleToolArr} from '@/config/homeBanner';
   import './index.scss';
   class SimbleTool extends Component {
     constructor(props) {
       super();
     }
     componentDidMount(){
      
     }
     componentWillUnmount(){
      
     }
     render() {
       return (
           <ul className="home-simbleTool clearfix">
                 {
                    simbleToolArr.map((item,index)=>{ 
                        let classPic = item.classPic;
                        let title = item.title;
                        let name = item.name;
                        return(                                    
                           <li className={index === 3 ? "noMarRight  fl" : "fl"} key={title + index}>
                                <i className={classPic}></i>
                                <span>{name}</span>
                           </li>
                        )
                    })
                }
           </ul>
       );
     }
   }
   export default SimbleTool;
   