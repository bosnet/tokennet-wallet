import React, { Component } from 'react';
import './BlueButton.scss';

class BlueButton extends Component {
	render() {
		const style = {
			opacity: 1,
		};
		if ( this.props.disabled === true ) {
			style.opacity = 0.2;
		}
		return (
			<button className={
				'blue-button ' +
				(this.props.big ? 'big' : '') +
				(this.props.filled ? ' filled' : '') +
				(this.props.medium ? ' medium' : '') +
				(this.props.small ? ' small' : '') +
				(this.props.tiny ? ' tiny' : '') +
				(this.props.nonAction ? ' non-action' : '')
			} disabled={ this.props.disabled } onClick={this.props.onClick} style={style}>
				{this.props.children}
			</button>
		)
	}
}

export default BlueButton;