import React, {Component} from 'react';
import './KeyGeneratorMessage.scss';

class KeyGeneratorMessage extends Component {
  render () {
    return (
      <div>
        <h1>
          Click on generate to get a new keypair
        </h1>

        <span className="black-line"> </span>

        <p>
          This tool does not create an account. <br/>
          You have to send create_account operation to the following <br/>
          address with a starting balance so it can exist. <br/>
          <span>Keep your seed safe.</span>
        </p>
      </div>
    )
  }
}

export default KeyGeneratorMessage;