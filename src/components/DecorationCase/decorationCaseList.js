import React, { Component } from 'react';
import './index.scss'
class DecoratonsList extends Component {
  constructor(props) {
    super();
    this.state={
        
    }
  }
  render() {
    const {titleName,data} = this.props;
    return (
     <ul className="decorationCase-list">
         {
              data.map((item,i)=>{
                return (
                  <li 
                    key={i}
                    className="clearfix"
                  >
                        <div className="fl clearfix decorationCase-list-title"
                        > 犯得上反对范德萨范德萨范德萨
                            <div className="scanNum clearfix">
                                <i className="fl">图标眼</i>
                                <b  className="fl">1920</b>
                                <span  className="fl">浏览</span>
                            </div>
                        </div>
                        <div className="decorationCase-list-casePic fr"></div>
                  </li>
                )
            })
         }
     </ul>
    );
  }
}

export default DecoratonsList;