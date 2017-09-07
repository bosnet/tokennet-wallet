import React, { Component } from 'react';
import ModalContainer from './ModalContainer';
import BlueButton from '../UiComponents/BlueButton';
import SymbolWhiteBack from '../assets/imgs/boscoin-symbol-image-white.png';
import KeyGeneratorMessage from './KeyGeneratorMessage';
import './ConfirmGeneratorOpen.scss';
import * as actions from "../actions/index";
import { connect } from "react-redux";

class ConfirmGeneratorOpen extends Component {
  constructor() {
    super();

    this.openKeyGenerator = this.openKeyGenerator.bind( this );
    this.doClose = this.doClose.bind( this );
  }

  openKeyGenerator() {
    this.props.showGeneratorConfirm( false );
    this.props.showKeyGenerator( true );
  }

  doClose() {
    this.props.showGeneratorConfirm( false );
  }

  render() {
    return (
        <ModalContainer doClose={ this.doClose } modalOpen={this.props.modalOpen}>
          <div className="confirm-open-container">
            <KeyGeneratorMessage/>

            <img src={SymbolWhiteBack} alt="BOSCoin wallet symbol"/>
            <p className="button-wrapper">
              <BlueButton medium onClick={ this.openKeyGenerator }>Generator</BlueButton>
              <BlueButton medium onClick={ this.doClose }>Close</BlueButton>
            </p>
          </div>
        </ModalContainer>
    )
  }
}

// 리덕스 연결
const mapDispatchToProps = ( dispatch ) => ({
  showKeyGenerator: ( $isShow ) => {
    dispatch( actions.showKeyGenerator( $isShow ) );
  },
  showGeneratorConfirm: ( $isShow ) => {
    dispatch( actions.showGeneratorConfirm( $isShow ) );
  },
});

ConfirmGeneratorOpen = connect( null, mapDispatchToProps )( ConfirmGeneratorOpen );

export default ConfirmGeneratorOpen;