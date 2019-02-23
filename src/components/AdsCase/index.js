/* ========================================================

    李雪魁
    2018/12/31
    首页装修案例---可作为公共组件
   ====================================================== */
   import React, { Component } from 'react';
   import './index.scss';
   import AdsList from './AdCaseList';
   import IconFont from '@/components/Iconfont';
   class AdsCase extends Component {
     constructor(props) {
       super();
       
     }
     componentDidMount(){
       
     }
     componentWillUnmount(){
       
     }
     render() {
       const {titleName,data} = this.props;
       return (
           <div className='adCase'>
               <div className="adCase-head clearfix">
                    <i className="fl adCase-head-i"></i>
                    <h4 className="fl">{titleName}</h4>
                    <div className="fr clearfix">
                        <a href="javascript:;" className="fl">查看更多</a>
                        <IconFont type={"icon-more"} style={{float:"left"}} />
                    </div>
               </div>
               <AdsList data={data} />
           </div>
       );
     }
   }
   export default AdsCase;
   