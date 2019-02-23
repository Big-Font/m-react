/* ========================================================

    李雪魁
    2018/12/31
    首页装修案例---可作为公共组件
   ====================================================== */
import React, { Component } from 'react';
import './index.scss';
import DecoratonsList from './decorationCaseList';
import { decoration } from '@/apis/modules/decoration';
import IconFont from '@/components/Iconfont';
class DecorationCase extends Component {
  constructor(props) {
    super();
    this.state = {
      decorationList: [],
    }
    this.geDecorationListInit = this.geDecorationListInit.bind(this);
  }
  async geDecorationListInit() {
    let res = await decoration();
    console.log(res.data)
    this.setState({
      decorationList: res.data.list
    })
  }
  componentDidMount() {
    this.geDecorationListInit()
  }
  componentWillUnmount() {

  }
  render() {
    const { titleName } = this.props;
    const { decorationList } = this.state;
    let styleS = decorationList.length > 0 ? {
      backgroundImage: "url(" + decorationList[0].caselist_img + ")",
      backgroundSize: "100% 100%",
      backgroundRepeat:"no-repeat"
    } : {};
    let title = decorationList.length > 0 ? decorationList[0].caselist_title : "";
    return (
      <div className='decorationCase'>
        <div className="decorationCase-head clearfix">
          <i className="fl decorationCase-head-i"></i>
          <h4 className="fl">{titleName}</h4>
          <div className="fr clearfix">
            <a href="javascript:;" className="fl">查看更多</a>
            <IconFont type={"icon-more"} style={{float:"left"}} />
          </div>

        </div>
        <div className="decorationCase-ad" style={styleS}>
          {title}
        </div>
        <DecoratonsList data={decorationList} />
      </div>
    );
  }
}
export default DecorationCase;
