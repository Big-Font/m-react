import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Carousel, WingBlank } from 'antd-mobile';

@withRouter
class Swiper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // imgHeight: 176,
    }
    this.goInfo = this.goInfo.bind(this);
  }

  goInfo(item) {
    //type：跳转链接的类型  0-外部链接， 1-装修案例，2-秒杀活动，3-资讯，
    switch(item.type) {
      case '0':
        window.location.href = item.banner_path;
        break;
      case '1':
        this.props.history.push(`/casesDetail/${item.infoId}`);
        break;
      case '2':
        this.props.history.push(`/spikeDetail/${item.infoId}`);
      default:
        console.log(`banner type err`)
    }
  }

  render() {
    let { banners } = this.props;
    return (
      <Carousel
        autoplay={true}
        infinite={true}
        autoplayInterval={4000}
        // beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
        // afterChange={index => console.log('slide to', index)}
      >
        {banners.map(val => (
          <div
            onClick={() => {this.goInfo(val)}}
            style={{ width: '100%', touchAction: 'none'}}
            key={val.banner_id}>
            <img
              src={val.banner_url}
              alt=""
              style={{ width: '100%', verticalAlign: 'top' }}
              onLoad={() => {
                // fire window resize event to change height
                window.dispatchEvent(new Event('resize'));
                // this.setState({ imgHeight: '' });
              }}
            />
          </div>
        ))}
      </Carousel>
    );
  }
}

export default Swiper;
