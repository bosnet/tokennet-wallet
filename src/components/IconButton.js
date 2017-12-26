import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './IconButton.scss';
import * as actions from "actions/index";
import { connect } from "react-redux";

class IconButton extends Component {
	render() {
		return <span className="icon-button">
			<Link to={ this.props.to } onClick={ () => this.props.postponeTimer( true ) }>
				{ this.props.iconLeft &&
				<img className="icon left" src={ this.props.image } alt={ this.props.label }/>
				}
				<span className="label">{ this.props.label }</span>
				{ this.props.iconRight &&
				<img className="icon right" src={this.props.image} alt={this.props.label}/>
				}
			</Link>
		</span>;
	}
}

// Redux
const mapDispatchToStore = ( dispatch ) => ( {
	postponeTimer: ( postpone ) => {
		dispatch( actions.postponeTimer( postpone ) );
	},
} );

IconButton = connect( null, mapDispatchToStore )( IconButton );

export default IconButton;