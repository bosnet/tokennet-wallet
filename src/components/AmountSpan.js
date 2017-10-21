import React, { Component } from 'react';
import './AmountSpan.scss';

class AmountSpan extends Component {
	render() {
		const array = this.props.value.toString().split( '.' );
		const integer = array[ 0 ];
		const decimal = array[ 1 ] !== undefined ? array[ 1 ] : '0';
		return <span className={ 'amount-span' }>
			<span className={ 'amount-span-integer' }>{ integer }</span>
			.
			<span className={ 'amount-span-decimal' }>{ decimal }</span>
		</span>;
	}
}

export default AmountSpan;