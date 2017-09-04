import React, {Component} from 'react';
import BlueButton from './BlueButton';
import ArrowDown from '../assets/imgs/blue-arrow-head-down.png';
import T from 'i18n-react';
import './keyDisplayer.scss';

class KeyDisplayer extends Component {
  constructor () {
    super();

    this.toggleSecretSeed = this.toggleSecretSeed.bind(this);

    const state = {
      secretSeedOpen: false
    };

    this.state = state;
  }

  toggleSecretSeed () {
    this.setState({
      secretSeedOpen: !this.state.secretSeedOpen
    })
  }

  render () {
    return (
      <div className={
        'seed-container ' +
        (this.state.secretSeedOpen ? 'secret-seed-open' : '')
      }>
        <p className="open-seed-wrapper">
          <button onClick={this.toggleSecretSeed} className="open-seed"><T.span text="wallet_view.open_secret_seed"/> <img src={ArrowDown} alt="arrow"/></button>
        </p>
        <p>Account Address</p>
        <div className="keys-box">
          <div className="public-key-box">
            <p>Public address</p>
            <div className="public-key-wrapper">
              <div>
                <p className="public-key">fjief99dafadsfadsfasdfadsfasf3243rj21jj0jfdfjf902023ijfidsfjijfeiaerrqrefjiej290f09fjasjfijeajfaf</p>
              </div>
              <div>
                <BlueButton tiny filled><T.span text="common.copy"/></BlueButton>
              </div>
            </div>
          </div>

          <div className="secret-key-box">
            <p>Secret seed</p>
            <div className="secret-key-wrapper">
              <div>
                <p className="secret-key">fjief99dafadsfadsfasdfadsfasf3243rj21jj0jfdfjf902023ijfidsfjijfeiaerrqrefjiej290f09fjasjfijeajfaf</p>
              </div>
              <div>
                <BlueButton tiny filled><T.span text="common.copy"/></BlueButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default KeyDisplayer;