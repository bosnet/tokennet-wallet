import React, { Component } from 'react';
import copyComplete from 'assets/imgs/copy-complete.png';
import './CopyComplete.scss';

class CopyComplete extends Component {
	render() {
		return (
			<div className={
				'copy-complete-container ' +
				(this.props.show ? 'show' : '')
			}>
				<img src={copyComplete} alt="Copy Complete"/>
			</div>
		)
	}
}

export default CopyComplete;