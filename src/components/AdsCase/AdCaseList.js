import React, { Component } from 'react';
import './index.scss'
import imgSrc from '@/images/decoration/ad.png'
class AdsList extends Component {
  constructor(props) {
    super();
    this.state={
        
    }
  }
  render() {
    const {data} = this.props;
    return (
     <ul className="adCase-list">
         {
              data.map((item,i)=>{
                return (
                  <li 
                    key={i + item}
                  >
                        <div className=" clearfix adCase-list-title"> 
                            <b className="fl">打鸡鸡</b>
                            <i className="fr">进行中</i>
                        </div>
                        <img className="adCase-list-casePic" src={imgSrc} alt="" />
                        <div className="adCase-list-caseTime">活动时间：02月12日 - 02月20日</div>
                  </li>
                )
            })
         }
     </ul>
    );
  }
}

export default AdsList;