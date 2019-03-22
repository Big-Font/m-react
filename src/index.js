import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import "antd-mobile/dist/antd-mobile.less";
// import VConsole from 'vconsole/dist/vconsole.min.js'
require('@/config/rem');
require('./styles/index.scss');

// let vConsole = new VConsole()

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
