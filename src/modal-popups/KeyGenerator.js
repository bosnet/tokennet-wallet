import React, { Component } from 'react';
import ModalContainer from './ModalContainer';
import KeyGeneratorMessage from './KeyGeneratorMessage';
import KeyDisplayer from 'components/KeyDisplayer'
import BlueButton from 'components/BlueButton';
import './KeyGenerator.scss';
import { connect } from "react-redux";
import * as actions from "../actions/index";
import T from 'i18n-react';
import pageview from "utils/pageview";

class KeyGenerator extends Component {
	closeKeyGenerator = () => {
		this.props.showKeyGenerator( false );
		this.props.showRecordSeed( true );
	};

	render() {
		return (
			<ModalContainer doClose={this.closeKeyGenerator} modalOpen={this.props.modalOpen}>
				<KeyGeneratorMessage simple/>

				<div className="key-displayer-wrapper">
					<KeyDisplayer setOpenSecretKey={true}/>
				</div>

				<p className="warn-message">
					{T.translate( 'key_generator.warn_line1' )}<br/>
					{T.translate( 'key_generator.warn_line2' )}<br className="only-mobile"/>
					{T.translate( 'key_generator.warn_line3' )}
				</p>
				<p className="button-wrapper">
					<BlueButton onClick={() => this.closeKeyGenerator()} medium>
						{T.translate( 'common.close' )}
					</BlueButton>
				</p>
			</ModalContainer>
		)
	}

	componentDidMount() {
		pageview( '/popup/key-generator' );
	}
}

// Redux
const mapDispatchToProps = ( dispatch ) => ({
	showKeyGenerator: ( $isShow ) => {
		dispatch( actions.showKeyGenerator( $isShow ) );
	},
	showRecordSeed: ( $isShow ) => {
		dispatch( actions.showRecordSeed( $isShow ) )
	},
});

KeyGenerator = connect( null, mapDispatchToProps )( KeyGenerator );

export default KeyGenerator;