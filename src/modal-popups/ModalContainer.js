import React, { Component } from 'react';
import { isFunction } from 'underscore';
import './ModalContainer.scss';

class ModalContainer extends Component {
	constructor( props ) {
		super( props );

		const state = {
			modalOpen: this.props.modalOpen
		};

		this.state = state;
	}

	closeModal = () => {
		// 부모 컴포넌트로부터 doClose 함수를 받았을 경우 실행하고 아닐 경우 스스로 state를 변경해 닫힌다
		if ( isFunction( this.props.doClose ) ) {
			this.props.doClose();
		}
		else {
			this.setState( {
				modalOpen: false
			} );
		}
	}

	render() {
		return (
			<div className={
				'modal-container ' +
				(this.state.modalOpen ? 'open' : '')
			}>
				<div className="modal-wrapper">
					<button
						className="close-modal-button-x"
						onClick={this.closeModal}
					></button>

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
		)
	}

	componentWillReceiveProps( nextProps ) {
		this.setState( { modalOpen: nextProps.modalOpen } );
	}
}

export default ModalContainer;