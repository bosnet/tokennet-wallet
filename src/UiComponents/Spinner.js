import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Spinner.scss';

class Spinner extends Component {
	render() {
		return (
			<div className={
				'spinner-container ' +
				(this.props.spinnerShow ? 'show' : '')
			}>
				<div className="spinner"></div>
			</div>
		)
	}
}

Spinner.propTypes = {
	spinnerShow: PropTypes.bool
};

export default Spinner;