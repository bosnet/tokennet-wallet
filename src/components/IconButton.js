import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './IconButton.scss';

class IconButton extends Component {
	render() {
		return <span className="icon-button">
			<Link to={ this.props.to }>
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

export default IconButton;