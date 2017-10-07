import React, { Component } from 'react';
import './TextAlert.scss';

class TextAlert extends Component {
	render() {
		return (
			<p className="text-alert">
				{this.props.children}
			</p>
		)
	}
}

export default TextAlert;