import React, {Component} from 'react';
import BlueButton from '../UiComponents/BlueButton';
import ModalContainer from './ModalContainer';
import './SeedLogin.scss';
import * as actions from "../actions/index";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class SeedLogin extends Component {
  constructor() {
    super();

    this.state = {
      redirect: null,
    };

    this.doClose = this.doClose.bind( this );
    this.clickLogin = this.clickLogin.bind( this );
    this.renderRedirect = this.renderRedirect.bind( this );
  }

  doClose() {
    this.props.showSeedLogin( false );
  }

  clickLogin() {
    this.doClose();
    this.setState( { redirect: '/wallet' } );
  }

  renderRedirect() {
    if( this.state.redirect ) {
      return <Redirect to={ this.state.redirect }/>;
    }
    else {
      return '';
    }
  }

  render () {
    return (
      <ModalContainer doClose={ this.doClose } modalOpen={ this.props.modalOpen }>
        { this.renderRedirect() }
        <div className="seed-login-container">
          <p>
            Please input your secret seed to open your account <br/>
            Make sure that don't forget or leak your seed. <br/>
            <span className="warn">You can loose your whole coins.</span>
          </p>
          <p>
            Input your seed
          </p>
          <input className="secret-seed" type="text"/>
          <p className="button-wrapper">
            <BlueButton medium onClick={ this.clickLogin }>Open</BlueButton>
          </p>
        </div>
      </ModalContainer>
    )
  }
}

// 리덕스 연결
const mapDispatchToProps = ( dispatch ) => ({
  showSeedLogin: ( $isShow ) => {
    dispatch( actions.showSeedLogin( $isShow ) );
  },
});

SeedLogin = connect( null, mapDispatchToProps )( SeedLogin );

export default SeedLogin;