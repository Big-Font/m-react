import React, { Component } from 'react';
import { Provider } from 'mobx-react';
import Routers from '@/router';
import stores from './store';

class App extends Component {
  render() {
    return (
      <Provider {...stores}>
          <Routers />
      </Provider>
    );
  }
}

export default App;
