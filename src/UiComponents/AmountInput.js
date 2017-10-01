import React, { Component } from 'react';

class AmountInput extends Component {
  onKeyDown( $event ) {
    const keyCode = $event.keyCode;
    const BACKSPACE = 8;
    const HOME = 36;
    const END = 35;
    const DELETE = 46;
    const POINT = 190;
    const POINT_NUMPAD = 110;
    const map = [ 37, 38, 39, 40, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, BACKSPACE, HOME, END, DELETE, POINT, POINT_NUMPAD ];
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