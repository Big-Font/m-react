import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import AdBanner from './adBanner';//banner
import DecorationCase from '@/components/DecorationCase';//banner
import SimbleTool from './simbleTool';//banner
import './index.scss'
@inject('commonState')
@observer
class Index extends Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <div className="home">
         <AdBanner />
         <div className="home-importADShow clearfix">
            <div className="fl home-importADShow-left"></div>
            <div className="fl home-importADShow-right">
              <p></p>
              <p></p>
            </div>
         </div>
         <SimbleTool />
         <DecorationCase titleName="经典装修" data={[1,2,3,4,5,6,7]} />
         <DecorationCase titleName="设计美学" data={[1,2,3,4,5]} />
      </div>
    );
  }
}

export default Index;
