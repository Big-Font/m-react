import React, { Component } from 'react';

import { inject, observer } from 'mobx-react';


@inject('commonState')
@observer
class Index extends Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <div>
         <div>我是首页</div>
         <div>{this.props.commonState.getUserNameFromStore}</div>
         
      </div>
    );
  }
}

export default Index;
