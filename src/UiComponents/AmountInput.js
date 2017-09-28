import React, { Component } from 'react';

class AmountInput extends Component {
  onKeyDown( $event ) {
    const keyCode = $event.keyCode;
    const map = [ 8, 37, 38, 39, 40, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 190 ];
    if( map.indexOf( keyCode ) === -1 ) {
      $event.preventDefault();
    }
  }
  render() {
    return (
      <input onKeyDown={ this.onKeyDown }
             onChange={ this.props.onChange }
             className={ this.props.className }
             type="tel"
             placeholder="0.0001" />
    )
  }
}

export default AmountInput;