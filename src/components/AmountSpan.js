import React, { Component } from 'react';

class AmountSpan extends Component {
	render() {
		const array = this.props.value.toString().split( '.' );
		const integer = array[ 0 ];
		const decimal = array[ 1 ] !== undefined ? array[ 1 ] : '0';
		return <span>
			<strong>{ integer }</strong>
			.
			{ decimal }
		</span>;
	}
}

export default AmountSpan;