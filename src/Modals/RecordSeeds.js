import React, {Component} from 'react';
import ModalContainer from './ModalContainer';
import KeyDisplayer from '../UiComponents/KeyDisplayer';
import BlueButton from '../UiComponents/BlueButton';
import './RecordSeeds.scss';
import { connect } from 'react-redux';
import * as actions from '../actions/index';

class RecordSeeds extends Component {
  constructor () {
    super();

    this.renderWarningMessage = this.renderWarningMessage.bind(this);
    this.closeRecordSeed = this.closeRecordSeed.bind(this);
    this.nextStep = this.nextStep.bind(this);

    const state = {
      step: 0
    };

    this.state = state;
  }

  closeRecordSeed () {
    this.props.showRecordSeed( false );
  }

  warningMessages = [
    [
      <span>Record your Seeds</span>,
      <span>Be sure to record your Public Address and Secret Seeds securely.<br />Be sure not to lose or share your Secret Seed. This is the key to your Wallet.</span>
    ],
    [
      <span>Record your Seeds <span className="red-and-bold">NOW!</span></span>,
      <span>PLEASE double check if you have the right Seeds.<br />You are solely responsible for the security of your Seeds.</span>
    ],
    [
      <span className="red-and-bold">DO NOT LOSE YOUR SEEDS!!!</span>,
      <span>Please confirm your seeds again. You may lose all of your<br/>You may lose all of your funds if you lose your Seeds. <span className="red-and-bold">Final warning.</span></span>
    ]
  ];

  renderWarningMessage () {
    let message = <div>
      <h1 className="warn-header">{this.warningMessages[this.state.step][0]}</h1>
      <span className="under-line"> </span>
      <p className="warn-body">{this.warningMessages[this.state.step][1]}</p>
    </div>;

    return message;
  }

  nextStep () {
    if (this.state.step === this.warningMessages.length - 1) {
      this.closeRecordSeed();
      this.setState({
        step: 0
      });
    } else {
      this.setState({
        step: this.state.step + 1
      });
    }
  }

  render () {
    return (
      <ModalContainer doClose={ this.closeRecordSeed } modalOpen={this.props.modalOpen}>
        <div className="record-seed-container">
          {this.renderWarningMessage()}
          <KeyDisplayer/>
            <BlueButton medium onClick={this.nextStep}>Yes</BlueButton>
        </div>
      </ModalContainer>
    )
  }
}

const mapDispatchToProps = ( dispatch ) => ({
  showRecordSeed: ( $isShow ) => {
    dispatch( actions.showRecordSeed( $isShow ));
  }
});

RecordSeeds = connect( null, mapDispatchToProps )(RecordSeeds);

export default RecordSeeds;