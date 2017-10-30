import Decimal from 'decimal.js';

export default ( value ) => {
	const string = new Decimal( value ).toFixed( 9 );
	const number = string.split( '.' );
	if( number.length > 1 ) {
		let integer = number[ 0 ];
		integer = integer.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

		let decimal = number[ 1 ];
		while( decimal.length > 4 && decimal.split( '' ).pop() === '0' ) {
			decimal = decimal.substr( 0, decimal.length - 1 );
		}
		return integer + '.' + decimal;
	}
	else {
		return string;
	}
};