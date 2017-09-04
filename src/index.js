import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// Redux 관련 불러오기
import { createStore } from 'redux'
import reducers from './reducers';
import { Provider } from 'react-redux';

// 스토어 생성
const store = createStore( reducers );
const DOM = <Provider store={store}>
	<App/>
</Provider>;

ReactDOM.render( DOM, document.getElementById( 'root' ) );
registerServiceWorker();
