/* ========================================================

    李雪魁
    2018/12/31
    首页装修案例---可作为公共组件
   ====================================================== */
   import React, { Component } from 'react';
   import { NavLink } from 'react-router-dom';
   import './index.scss';
   import AdsList from './AdCaseList';
   import IconFont from '@/components/Iconfont';

   class AdsCase extends Component {
     constructor(props) {
       super();
     }

     render() {
       const {titleName, spikeList } = this.props;
       return (
           <div className='adCase'>
               <div className="adCase-head clearfix">
                    <i className="fl adCase-head-i"></i>
                    <h4 className="fl">{titleName}</h4>
                    <div className="fr clearfix">
                      <NavLink to="/spikeList" className="fl">查看更多</NavLink>
                      <IconFont type={"icon-more"} style={{float:"left"}} />
                    </div>
               </div>
               <AdsList spikeList={spikeList} />
           </div>
       );
     }
   }
   export default AdsCase;
