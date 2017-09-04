import React, {Component} from 'react';
import './BlueButton.scss';

class BlueButton extends Component {
  render () {
    return (
      <button className={
        'blue-button ' +
        (this.props.big ? 'big' : '') +
        (this.props.filled ? ' filled' : '') +
        (this.props.medium ? ' medium' : '') +
        (this.props.small ? ' small' : '') +
        (this.props.tiny ? ' tiny' : '') +
        (this.props.nonAction ? ' non-action' : '')
      }>
        {this.props.children}
      </button>
    )
  }
}

export default BlueButton;