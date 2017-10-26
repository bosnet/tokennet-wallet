import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// Redux 관련 불러오기
import { createStore } from 'redux'
import reducers from './reducers';
import { Provider } from 'react-redux';

// Router 관련
import { BrowserRouter } from 'react-router-dom';

require( 'libs/ie-checker' );

// 스토어 생성
const store = createStore( reducers );
const DOM = <Provider store={store}>
	<BrowserRouter>
		<App/>
	</BrowserRouter>
</Provider>;

ReactDOM.render( DOM, document.getElementById( 'root' ) );
registerServiceWorker();
