/* ========================================================

    李雪魁
    2018/12/31
    首页banner
   ====================================================== */
import React, { Component } from 'react';
import Swiper from 'swiper/dist/js/swiper.js';
import 'swiper/dist/css/swiper.min.css';
import {homeBannerPic} from '@/config/homeBanner';
import './index.scss';
class AdBanner extends Component {
  constructor(props) {
    super();
    this.swiper = null;
  }
  componentDidMount(){
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
                    homeBannerPic.map((item,index)=>{ 
                        let pic = item.pic;
                        let title = item.title;
                        return(                                    
                           <div className="swiper-slide" key={title + index}>
                                <img  src={pic} alt={title} />
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
