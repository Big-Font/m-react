import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import IconFont from '@/components/Iconfont';
import { caseDetail } from '@/apis/modules/decoration';
require('./index.scss');

@withRouter
class CasesDetail extends Component {
  constructor(props) {
    super();
    this.state= {
      id: props.match.params.id,
      resInfo: {}
    }
  }

  async componentWillMount() {
    let res = await caseDetail({id: this.state.id});
    if(res.data.code === 0) {
      this.setState({
        resInfo: res.data.data
      })
    }
  }

  render() {
    let resInfo = this.state.resInfo;
    let fontStyle = {fontSize: '0.3rem', color: '#5e5346', marginRight: '0.1rem'}
    return (
      <div className="cases-detail">
        {/* 头部图片+作者 */}
        <div className="title">
          <img className="title-img" src={resInfo.img} alt=""/>
          <div className="detail-info">
            <div>
              <IconFont type='icon-wode1' />
              <h2>{resInfo.author}</h2>
            </div>
          </div>
        </div>
        {/* 标题 */}
        <h1>{resInfo.title}</h1>
        {/* 基本信息 */}
        <div className="info">
          <h3>基本信息</h3>
          <div>
            <div>
              <IconFont type='icon-fl-huxing' />
              <h5>户型</h5>
              <p>{resInfo.apartment}</p>
            </div>
            <div>
              <IconFont type='icon-fangwumianji' />
              <h5>室内面积</h5>
              <p>{resInfo.area}</p>
            </div>
          </div>
          <div>
            <div>
              <IconFont type='icon-fengge' />
              <h5>装修风格</h5>
              <p>{resInfo.style}</p>
            </div>
            <div>
              <IconFont type='icon-feiyong' />
              <h5>装修费用</h5>
              <p>{resInfo.spend}</p>
            </div>
          </div>
        </div>
        {/* 内容 */}
        <div className="content" dangerouslySetInnerHTML={{__html: resInfo.content}}></div>
      </div>
    );
  }
}

export default CasesDetail;
