var _stringify = require( 'babel-runtime/core-js/json/stringify' );

var _stringify2 = _interopRequireDefault( _stringify );

var _assign = require( 'babel-runtime/core-js/object/assign' );

var _assign2 = _interopRequireDefault( _assign );

function _interopRequireDefault( obj ) {
	return obj && obj.__esModule ? obj : { default: obj };
}

var fetch = require( 'isomorphic-fetch' );
var qs = require( 'qs' );

function request( o ) {
	var uri = o.url;
	if ( o.endpoint ) {
		uri += o.endpoint;
	}
	if ( o.qs ) {
		uri += '?' + qs.stringify( o.qs );
	}

	var options = {
		method: o.method || 'GET',
		headers: (0, _assign2.default)( {}, o.headers )
	};

	if ( o.body ) {
		options.headers[ 'Content-Type' ] = 'application/json';
		options.body = (0, _stringify2.default)( o.body );
	}

	return fetch( uri, options ).then( function ( response ) {
		if ( !response.ok ) {
			throw response;
		}
		if ( response.headers.get( 'Content-Type' ).includes( 'application/json' ) ) {
			return response.json();
		} else {
			return response.text();
		}
	} );
}

module.exports = request;