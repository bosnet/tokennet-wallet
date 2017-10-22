import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './ErrorPopup.scss';

const modalRoot = document.querySelector( '#popup-root' );

class ErrorPopup extends Component {
	constructor() {
		super();

		this.el = document.createElement( 'div' );
	}

	componentDidMount() {
		modalRoot.appendChild(this.el);
	}

	componentWillUnmount() {
		modalRoot.removeChild(this.el);
	}

	renderContainer = () => {
		return <div className={ 'error-popup__background' }>
			<div className={ 'error-popup__container' }>
				{this.props.children}
			</div>
		</div>;
	};

	render() {
		return ReactDOM.createPortal(
			this.renderContainer(),
			this.el,
		);
	}
}

export default ErrorPopup;