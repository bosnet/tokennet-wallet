import React, { Component } from 'react';
import ModalContainer from './ModalContainer';
import KeyDisplayer from '../UiComponents/KeyDisplayer';
import BlueButton from '../UiComponents/BlueButton';
import './RecordSeeds.scss';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import T from 'i18n-react';

class RecordSeeds extends Component {
	constructor() {
		super();

		this.renderWarningMessage = this.renderWarningMessage.bind( this );
		this.closeRecordSeed = this.closeRecordSeed.bind( this );
		this.nextStep = this.nextStep.bind( this );

		const state = {
			step: 0
		};

		this.state = state;
	}

	closeRecordSeed() {
		this.props.showRecordSeed( false );
	}

	warningMessages = [
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

	renderWarningMessage() {
		let message = <div>
			<h1 className="warn-header">{this.warningMessages[ this.state.step ][ 0 ]}</h1>
			<span className="under-line"> </span>
			<p className="warn-body">{this.warningMessages[ this.state.step ][ 1 ]}</p>
		</div>;

		return message;
	}

	nextStep() {
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
	}

	render() {
		return (
			<ModalContainer data-lang={ this.props.language } doClose={this.nextStep} modalOpen={this.props.modalOpen}>
				<div className="record-seed-container">
					{this.renderWarningMessage()}
					<KeyDisplayer/>
					<BlueButton medium onClick={this.nextStep}>Yes</BlueButton>
				</div>
			</ModalContainer>
		)
	}
}

const mapStoreToProps = ( store ) => ( {
	language: store.language.language,
} );

const mapDispatchToProps = ( dispatch ) => ({
	showRecordSeed: ( $isShow ) => {
		dispatch( actions.showRecordSeed( $isShow ) );
	}
});

RecordSeeds = connect( mapStoreToProps, mapDispatchToProps )( RecordSeeds );

export default RecordSeeds;