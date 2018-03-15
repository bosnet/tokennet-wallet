const trimDecimal = value => {
    value = value.toString();
    if( value.indexOf( '.' ) > -1 ) {
        const array = value.split( '.' );
        const integer = array.shift().toString();
        let decimal = array.pop().toString();
        if( decimal.length > 7 ) {
            decimal = decimal.substr( 0, 7 );
        }
        return Number( [ integer, decimal ].join( '.' ) );
    }
    else {
        return Number( value );
    }
};

export default trimDecimal;