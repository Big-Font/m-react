/* ========================================================
    jason
    2019/3/24
    回到顶部组件
======================================================== */
import React, { Component } from 'react';
import IconFont from '@/components/Iconfont';
require('./index.scss');

class ToTop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      changeLite: false,
    }
  }

  componentDidMount() {
    window.onscroll = this.scroll;
  }

  scroll = () => {
    this.setState({
      changeLite: document.documentElement.scrollTop+document.body.scrollTop > 300
    })
  }

  toTop = () => {
    let scrollToptimer = setInterval(function () {
        // console.log("定时循环回到顶部")
        let top = document.body.scrollTop || document.documentElement.scrollTop;
        let speed = top / 4;
        if (document.body.scrollTop!=0) {
            document.body.scrollTop -= speed;
        }else {
            document.documentElement.scrollTop -= speed;
        }
        if (top <= 0) {
            clearInterval(scrollToptimer);
        }
    }, 30);
  }

  render() {
    return (
      <IconFont onClick={this.toTop} type="icon-huidaodingbu1" className={`to-top-common ${this.state.changeLite? '':'not-show-top'}`} />
    );
  }
}

export default ToTop;
