import React, { Component } from 'react';
import ModalContainer from './ModalContainer';
import KeyGeneratorMessage from './KeyGeneratorMessage';
import KeyDisplayer from '../UiComponents/KeyDisplayer'
import BlueButton from '../UiComponents/BlueButton';
import './KeyGenerator.scss';
import { connect } from "react-redux";
import * as actions from "../actions/index";

class KeyGenerator extends Component {
  constructor() {
    super();

    this.closeKeyGenerator = this.closeKeyGenerator.bind( this );
  }

  closeKeyGenerator() {
    this.props.showKeyGenerator( false );
  }

  render() {
    return (
        <ModalContainer doClose={ this.closeKeyGenerator } modalOpen={this.props.modalOpen}>
          <KeyGeneratorMessage/>

          <div className="key-displayer-wrapper">
            <KeyDisplayer/>
          </div>

          <p className="warn-message">
            Please write down your Public Address and Secret Seed at safe place. <br/>
            Make sure that you don't forget or leak your Seed. <br/>
            You can lose your whole coins!
          </p>
          <p className="button-wrapper">
            <BlueButton onClick={ () => this.closeKeyGenerator() } medium>Close</BlueButton>
          </p>
        </ModalContainer>
    )
  }
}

// 리덕스 연결
const mapDispatchToProps = ( dispatch ) => ({
  showKeyGenerator: ( $isShow ) => {
    dispatch( actions.showKeyGenerator( $isShow ) );
  }
});

KeyGenerator = connect( null, mapDispatchToProps )( KeyGenerator );

export default KeyGenerator;