import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './ErrorPopup.scss';
import pageview from "utils/pageview";

const modalRoot = document.querySelector( '#popup-root' );

class ErrorPopup extends Component {
	constructor() {
		super();

		this.el = document.createElement( 'div' );
	}

	componentDidMount() {
		modalRoot.appendChild(this.el);
		pageview( '/popup/error-popup' );
	}

	componentWillUnmount() {
		modalRoot.removeChild(this.el);
	}

	renderContainer = () => {
		return <div className="modal-container open error-popup__container">
			<div className="modal-wrapper">

				<div className="content-container">
					<div className="content-middle-wrapper">
						<div className="content-wrapper">
							<div>
								{this.props.children}
							</div>
						</div>
					</div>
				</div>

			</div>
		</div>
	};

	render() {
		return ReactDOM.createPortal(
			this.renderContainer(),
			this.el,
		);
	}
}

export default ErrorPopup;