/* ========================================================

    李雪魁
    2018/12/31
    首页装修案例---可作为公共组件
   ====================================================== */
   import React, { Component } from 'react';
   import './index.scss';
   import DecoratonsList from './decorationCaseList';
   class DecorationCase extends Component {
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
           <div className='decorationCase'>
               <div className="decorationCase-head clearfix">
                    <i className="fl"></i>
                    <h4 className="fl">{titleName}</h4>
                    <div className="fr clearfix">
                        <a href="javascript:;" className="fl">查看更多 ></a>
                        {/* <b>图标todo</b> */}
                    </div>
                    
               </div>
               <div className="decorationCase-ad">
                    受到激发教师的客户房间看电视但是就是科技孵化的健身卡
               </div>
               <DecoratonsList data={data} />
           </div>
       );
     }
   }
   export default DecorationCase;
   