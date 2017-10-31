import React, { Component } from 'react';
import ModalContainer from './ModalContainer';
import KeyDisplayer from 'components/KeyDisplayer';
import BlueButton from 'components/BlueButton';
import './RecordSeeds.scss';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import T from 'i18n-react';
import pageview from "utils/pageview";

class RecordSeeds extends Component {
	constructor() {
		super();

		const state = {
			step: 0
		};

		this.state = state;
	}

	closeRecordSeed = () => {
		this.props.showRecordSeed( false );
		this.props.updateKeypair( null );
	};

	renderWarningMessage = () => {
		this.warningMessages = [
			[
				<span>{T.translate( "record_seed.warn_header1" )}</span>,
				<span>{T.translate( "record_seed.warn_text1_1" )}<br/>{T.translate( "record_seed.warn_text1_2" )}</span>
			],
			[
				<span>{T.translate( "record_seed.warn_header2_1" )}<span
					className="red-and-bold">{T.translate( "record_seed.warn_header2_2" )}</span></span>,
				<span>{T.translate( "record_seed.warn_text2_1" )}<br/>{T.translate( "record_seed.warn_text2_2" )}</span>
			],
			[
				<span className="red-and-bold">{T.translate( "record_seed.warn_header3" )}</span>,
				<span>{T.translate( "record_seed.warn_text3_1" )}<br/>{T.translate( "record_seed.warn_text3_2" )}<span
					className="red-and-bold">{T.translate( "record_seed.warn_text3_3" )}</span></span>
			]
		];

		return <div>
			<h1 className="warn-header">{this.warningMessages[ this.state.step ][ 0 ]}</h1>
			<span className="under-line"> </span>
			<p className="warn-body">{this.warningMessages[ this.state.step ][ 1 ]}</p>
		</div>;
	};

	nextStep = () => {
		if ( this.state.step === this.warningMessages.length - 1 ) {
			this.closeRecordSeed();
			this.setState( {
				step: 0
			} );
		} else {
			this.setState( {
				step: this.state.step + 1
			} );
		}
	};

	render() {
		return (
			<ModalContainer data-lang={this.props.language} doClose={this.nextStep} modalOpen={this.props.modalOpen}>
				<div className="record-seed-container">
					{this.renderWarningMessage()}
					<KeyDisplayer setOpenSecretKey={true}/>
					<div className="button-wrapper">
						<BlueButton medium onClick={this.nextStep}>{ T.translate( 'record_seed.yes' ) }</BlueButton>
					</div>
				</div>
			</ModalContainer>
		)
	}

	componentDidMount() {
		pageview( '/popup/record-seeds' );
	}
}

const mapStoreToProps = ( store ) => ( {
	language: store.language.language,
} );

const mapDispatchToProps = ( dispatch ) => ({
	showRecordSeed: ( $isShow ) => {
		dispatch( actions.showRecordSeed( $isShow ) );
	},
	updateKeypair: ( $keypair ) => {
		dispatch( actions.updateKeypair( $keypair ) );
	},
});

RecordSeeds = connect( mapStoreToProps, mapDispatchToProps )( RecordSeeds );

export default RecordSeeds;