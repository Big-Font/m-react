import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import IconFont from '@/components/Iconfont';
import './index.scss'

@withRouter
class DecoratonsList extends Component {
  constructor(props) {
    super();
    this.state={

    }
    this.goCaseDetail = this.goCaseDetail.bind(this)
  }

  goCaseDetail(id) {
    // this.props.history.push({
    //   path: '/casesDetail',
    //   params: id
    // })
    this.props.history.push(`/casesDetail/${id}`);
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
                  backgroundRepeat:"no-repeat",
                  borderRadius: '0.2rem'
                }
                let title = item.caselist_title;
                let caselist_pageview = item.caselist_pageview;
                return (
                  <li
                    key={i + item}
                    className="clearfix"
                    onClick={()=>{this.goCaseDetail(item.caselist_id)}}
                  >
                        <div className="fl clearfix decorationCase-list-title"
                        > {title}
                            <div className="scanNum clearfix">
                                <i className="fl">{item.caselist_author}</i>
                                <IconFont className="fl" type='icon-liulan' style={{ fontSize: '0.4rem', marginRight: '0.1rem', marginLeft: '0.1rem'}}/>
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
