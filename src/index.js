import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import "antd-mobile/dist/antd-mobile.less";
require('@/config/rem');
require('./styles/index.scss');


ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
