import React, { Component } from 'react';
import './App.css';
import './assets/sass/App.scss';
import Header from './Header';
import WalletView from './WalletView';
import T from 'i18n-react';
import * as actions from './actions';
import { connect } from 'react-redux';

class App extends Component {
	constructor() {
		super();

		const userLang = navigator.language || navigator.userLanguage;
		this.selectLang( userLang );
	}

	selectLang( $lang ) {
		let lang = 'en';
		switch ( $lang ) {
			case 'ko' :
				lang = 'ko';
				break;
		}
		T.setTexts( require( './languages/' + lang + '.json' ) );
	}

	render() {
		return (
			<div className="App">
				<Header/>
				{/*<MainPageView/>*/}
				<WalletView/>
			</div>
		);
	}

	componentWillReceiveProps( nextProps ) {
		this.selectLang( nextProps.language );
	}

	componentDidMount() {
		let height = document.documentElement.clientHeight || document.body.clientHeight;
		height = Math.max( height, window.outerHeight );
		document.querySelector( '.App' ).style.height = height + 'px';
	}
}

const mapStateToProps = ( state ) => ({
	language: state.language,
});

App = connect( mapStateToProps, null )( App );

export default App;
