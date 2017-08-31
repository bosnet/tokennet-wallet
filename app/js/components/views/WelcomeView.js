import React, { Component } from 'react';

import { Container, Header, List, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import T from 'i18n-react';

import logo from '../../../../content/assets/images/logo.png';

import { openKeypairModal, closeKeypairModal } from '../../actions/ui';
import { isModalKeypairOpen } from '../../selectors/ui';

const styles = {
	logo: {
		// height: '16rem',
		width: '331px'
	},
	title: {
		fontSize: '3.5rem',
		color: 'white',
		fontWeight: 400,
		paddingTop: '0.5rem',
		paddingBottom: '2.5rem',
	},
	paragraph: {
		fontSize: '1.3rem',
		padding: '0.6rem',
		color: 'white',
	},
	paragraphE: {
		fontSize: '1.4rem',
		padding: '0.6rem',
		color: 'white',
	},
	link: {
		color: '#50a4f5',
		fontWeight: 600,
	},
	description: {
		paddingTop: '6rem',
		paddingBottom: '6rem',
	},
	subtitle: {
		fontSize: '2.5rem',
		color: 'white',
		fontWeight: 400,
		paddingTop: '0.5rem',
		paddingBottom: '0.5rem',
	},
	screen: {
		height: '32rem',
	},
	featuresItem: {
		fontSize: '1.3rem',
		color: 'white',
		fontWeight: 300,
	},
};

const mapStateToProps = state => ({
	keypairModalOpen: isModalKeypairOpen( state ),
});

const mapDispatchToProps = dispatch => ({
	openKeypairModal: () => dispatch( openKeypairModal() ),
	closeKeypairModal: () => dispatch( closeKeypairModal() ),
});

class WelcomeScreen extends Component {
	constructor() {
		super();

		this.state = {
			currentLang: 'en',
		}

		this.setLang( this.state.currentLang );
	}

	setLang( $lang ) {
		T.setTexts( require( '../../languages/' + $lang + '.json' ) );
	}

	changeLang( $lang ) {
		this.setLang( $lang );
		this.setState( { currentLang: $lang } );
	}

	onChange( $event ) {
		const lang = $event.currentTarget.value;
		this.changeLang( lang );
	}

	render() {
		return (
			<div className="welcome-container">
				<div className="welcome-container-overlay"/>
				<Container textAlign="center">
					<div style={({ marginBottom: '2em' })}>
						<select onChange={this.onChange.bind( this )}>
							<option value="en">English</option>
							<option value="ko">한국어</option>
						</select>
					</div>
					<img src={logo} style={styles.logo} className="" alt="welcome"/>
					<Header style={styles.title}>
						<T.text text='welcome_view.title'/>
					</Header>
					<p style={styles.paragraph}>
						<T.text text='welcome_view.title_description'/>
					</p>
					<div>
						<button><T.text text="welcome_view.button_make"/></button>
					</div>
					<div>
						<button><T.text text="welcome_view.button_open"/></button>
					</div>
				</Container>
			</div>
		);
	}
}

export default connect( mapStateToProps, mapDispatchToProps )( WelcomeScreen );
