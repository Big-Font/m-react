import React, { Component } from 'react';
require('./index.scss');

class NewLogin extends Component {
  render() {
    return (
      <div className="splash">
        <section>
          <img src={require('@/images/icon/16.png')} alt=""/>
          <div></div>
        </section>
      </div>
    );
  }
}

export default NewLogin;
