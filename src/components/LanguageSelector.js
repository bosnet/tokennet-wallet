import React, { Component } from 'react';
import * as actions from 'actions';
import { connect } from 'react-redux';
import './LanguageSelector.scss';
import { find, indexOf } from 'underscore';
import classNames from 'classnames';

class LanguageSelector extends Component {
	constructor() {
		super();

		const state = {
			currentLanguageIndex: 0,
			languageList: [
				[ '한국어', 'ko' ],
				[ 'English', 'en' ],
				[ '中文', 'zh' ]
			],
			selectBoxOpen: false
		};

		this.state = state;
	}

	setLanguage = ( $language ) => {
		this.setState( {
			currentLanguageIndex: $language
		} );

		const html = document.querySelector( 'html' );
		if( html ) {
			html.lang = this.state.languageList[ $language ][ 1 ];
		}
		this.props.changeLanguage( this.state.languageList[ $language ][ 1 ] );
		this.selectBoxToggle();
	};

	renderLanguageList = () => {
		const listDom = [];
		let length = this.state.languageList.length;

		for ( let i = 0; i < length; i++ ) {
			listDom.push( <p key={i} onClick={() => this.setLanguage( i )}>{this.state.languageList[ i ][ 0 ]}</p> );
		}

		return listDom;
	};

	selectBoxToggle = () => {
		this.setState( {
			selectBoxOpen: !this.state.selectBoxOpen
		} );
	};

	render() {
		return (
			<div className={ classNames( { 'select-box-styled': true, 'is-open': this.state.selectBoxOpen }) } onClick={this.selectBoxToggle}>
				<div>{this.state.languageList[ this.state.currentLanguageIndex ][ 0 ]}</div>
				<div className={this.state.selectBoxOpen ? 'select-box-list  select-box-open' : 'select-box-list'}>
					{this.renderLanguageList()}
				</div>
			</div>
		)
	}

	componentDidMount() {
		const userLang = ( navigator.language || navigator.userLanguage ).substr( 0, 2 );
		let index = indexOf( this.state.languageList, find( this.state.languageList, $element => $element[ 1 ] === userLang ) );
		if ( index < 0 ) {
			index = 0;
		}
		this.setState( {
			currentLanguageIndex: index,
		} );
		this.props.changeLanguage( userLang );
	}
}

const mapDispatchToProps = ( dispatch ) => ({
	changeLanguage: ( $language ) => {
		const language = $language;
		dispatch( actions.setLanguage( language ) );
	}
});

LanguageSelector = connect( null, mapDispatchToProps )( LanguageSelector );

export default LanguageSelector;