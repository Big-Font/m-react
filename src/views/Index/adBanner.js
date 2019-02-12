/* ========================================================

    李雪魁
    2018/12/31
    首页banner
   ====================================================== */
import React, { Component } from 'react';
import Swiper from 'swiper/dist/js/swiper.js';
import 'swiper/dist/css/swiper.min.css';
import {homeBannerPic} from '@/config/homeBanner';
import { getBanner } from '@/apis/modules';
import './index.scss';

class AdBanner extends Component {
  constructor(props) {
    super();
    this.swiper = null;
    this.state = {
      homeBannerPic: []
    }
  }
  async componentDidMount(){
    if(this.swiper){
        this.swiper.destroy();
        this.swiper = null;
    }
    this.swiper = new Swiper('.swiper-container', {
        centeredSlides: true,
        autoplay: {
          delay: 2500,
          disableOnInteraction: false,
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
     });
     await this.init();
  }

  async init() {
    let res = await getBanner();
    this.setState({
      homeBannerPic:res.data.list
    })
  }

  componentWillUnmount(){
    if(this.swiper){
        this.swiper.destroy()
        this.swiper = null;
    }
  }
  render() {
    return (
        <div className='swiper-container'>
            <div className='swiper-wrapper'>
                {
                    this.state.homeBannerPic.map((item,index)=>{
                        let pic = item.banner_url;
                        let title = item.banner_name;
                        return(
                           <div className="swiper-slide" key={title + index}>
                                <img src={pic} alt={title} />
                           </div>
                        )
                    })
                }
            </div>
            <div className="swiper-pagination"></div>
        </div>
    );
  }
}
export default AdBanner;
