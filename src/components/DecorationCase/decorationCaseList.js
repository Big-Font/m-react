import React, { Component } from 'react';
import './index.scss'
class DecoratonsList extends Component {
  constructor(props) {
    super();
    this.state={
        
    }
  }
  render() {
    const {data} = this.props;
    return (
     <ul className="decorationCase-list">
         {
              data.map((item,i)=>{
                let styleS = {
                  backgroundImage:"url("+item.caselist_img+")",
                  backgroundSize:"100% 100%",
                  backgroundRepeat:"no-repeat"
                }
                let title = item.caselist_title;
                let caselist_pageview = item.caselist_pageview;
                return (
                  <li 
                    key={i + item}
                    className="clearfix"
                  >
                        <div className="fl clearfix decorationCase-list-title"
                        > {title}
                            <div className="scanNum clearfix">
                                <i className="fl">图标眼</i>
                                <b  className="fl">{caselist_pageview}</b>
                                <span  className="fl">浏览</span>
                            </div>
                        </div>
                        <div className="decorationCase-list-casePic fr" style={styleS}></div>
                  </li>
                )
            })
         }
     </ul>
    );
  }
}

export default DecoratonsList;