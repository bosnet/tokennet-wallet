import React, { Component } from 'react';
import './Timer.scss';
import * as actions from "actions/index";
import { connect } from "react-redux";
import postponeImage from '../assets/imgs/postpone-timer.png';

class Timer extends Component {
	constructor() {
		super();

		this.state = {
			time: 180,
		}
	}

	postpone = () => {
		this.props.postponeTimer( true );
	};

	render() {
		return (
			<div className="bos-timer">
				{ parseInt( this.state.time / 60, 10 ) }
				:
				{ this.state.time % 60 < 10 &&
				'0'
				}
				{ this.state.time % 60 }

				<button onClick={ this.postpone }>
					<img src={ postponeImage } alt="로그아웃 연장"/>
				</button>
			</div>
		)
	}

	componentWillReceiveProps( nextProps ) {
		if( nextProps.timer.hasPostpone ) {
			this.setState( { time: 180 } );
			this.props.postponeTimer( false );
		}
	}

	componentWillUnmount() {
		if( this.timer ) {
			clearInterval( this.timer );
		}
	}

	componentDidMount() {
		this.timer = setInterval( () => {
			if( this.state.time === 0 ) {
				clearInterval( this.timer );
				window.location.href = '/';
				return false;
			}
			this.setState( { time: this.state.time - 1 } );
		}, 1000 );
	}
}

const mapStoreToProps = ( store ) => ({
	timer: store.timer,
});

// Redux
const mapDispatchToStore = ( dispatch ) => ( {
	postponeTimer: ( postpone ) => {
		dispatch( actions.postponeTimer( postpone ) );
	},
} );

Timer = connect( mapStoreToProps, mapDispatchToStore )( Timer );

export default Timer;