import React, { Component } from 'react';
import { Provider } from 'mobx-react';
import Routers from '@/router/newIndex';
import stores from './store';

class App extends Component {

  componentDidMount(){
    // 去除splash
    let el=document.getElementById('splash'); //html标签
    el.className='loaded';
    setTimeout(()=>{
        if(!!el) el.remove();
        // 显示 header
        // this.props.commonState.handleHeaderStatus(true);
    },600);
  }


  render() {
    return (
      <Provider {...stores}>
          <Routers />
      </Provider>
    );
  }
}

export default App;
