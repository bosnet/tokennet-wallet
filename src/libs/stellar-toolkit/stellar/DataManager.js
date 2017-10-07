var _defineProperty2 = require( 'babel-runtime/helpers/defineProperty' );

var _defineProperty3 = _interopRequireDefault( _defineProperty2 );

var _keys = require( 'babel-runtime/core-js/object/keys' );

var _keys2 = _interopRequireDefault( _keys );

var _assign = require( 'babel-runtime/core-js/object/assign' );

var _assign2 = _interopRequireDefault( _assign );

var _stringify = require( 'babel-runtime/core-js/json/stringify' );

var _stringify2 = _interopRequireDefault( _stringify );

function _interopRequireDefault( obj ) {
	return obj && obj.__esModule ? obj : { default: obj };
}

var _require = require( 'libs/stellar-sdk' ),
	Keypair = _require.Keypair;

var _require2 = require( '../helpers/errors' ),
	ERRORS = _require2.ERRORS;

var _require3 = require( '../helpers/bufferTool' ),
	splitBuffer = _require3.splitBuffer;

var ENCODING = 'base64';
var CHUNK_SIZE = 64;

var sign = function sign( dataToSign, secret ) {
	var json = (0, _stringify2.default)( dataToSign );
	var dataBuffer = Buffer.from( json );

	var keypair = Keypair.fromSecret( secret );
	var signatureBuffer = keypair.sign( dataBuffer );

	return signatureBuffer.toString( ENCODING );
};

var verify = function verify( data, accountId, signature ) {
	if ( !data || !signature ) {
		throw ERRORS.BAD_PARAMETERS( 'need data and signature' );
	}

	var strData = (0, _stringify2.default)( data );

	var dataBuffer = Buffer.from( strData );
	var signatureBuffer = Buffer.from( signature, ENCODING );
	var keypair = Keypair.fromPublicKey( accountId );

	var verified = keypair.verify( dataBuffer, signatureBuffer );
	if ( !verified ) {
		throw ERRORS.UNAUTHORIZED( 'Invalid signature for ' + accountId );
	}
	return true;
};

var chunkData = function chunkData( prefix, data ) {
	var chunkSize = arguments.length > 2 && arguments[ 2 ] !== undefined ? arguments[ 2 ] : CHUNK_SIZE;

	var buffer = Buffer.from( data );
	return splitBuffer( buffer, chunkSize ).reduce( function ( acc, chunk ) {
		return (0, _assign2.default)( acc, (0, _defineProperty3.default)( {}, prefix + (0, _keys2.default)( acc ).length, chunk ) );
	}, {} );
};

var glueData = function glueData( prefix, data ) {
	var chunkedData = (0, _keys2.default)( data ).filter( function ( key ) {
		return key.indexOf( prefix ) === 0;
	} ).map( function ( key ) {
		return data[ key ];
	} );

	if ( chunkedData.length === 0 ) {
		throw new Error( 'No chunked data for ' + prefix );
	}
	return Buffer.concat( chunkedData.map( function ( d ) {
		return Buffer.from( d, ENCODING );
	} ) ).toString();
};

module.exports = {
	sign: sign, verify: verify, glueData: glueData, chunkData: chunkData
};