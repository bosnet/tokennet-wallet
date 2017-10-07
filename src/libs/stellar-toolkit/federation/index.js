var request = require( '../helpers/request' );

var _require = require( '../stellar/DataManager' ),
	sign = _require.sign;

var federationUrl = "https://stellar-wilson.herokuapp.com/federation";

function setUrl( url ) {
	federationUrl = url;
}

function federationResolve( stellar_address ) {
	return request( {
		url: federationUrl,
		qs: {
			type: 'name',
			q: stellar_address
		}
	} );
}

function federationReverse( account_id ) {
	return request( {
		url: federationUrl,
		qs: {
			type: 'id',
			q: account_id
		}
	} );
}

function federationKeypair( _ref ) {
	var q = _ref.q,
		password = _ref.password;

	return request( {
		url: federationUrl,
		qs: {
			type: 'keypair',
			q: q,
			password: password
		}
	} );
}

function federationCreate( _ref2 ) {
	var stellar_address = _ref2.stellar_address,
		password = _ref2.password;

	return request( {
		url: federationUrl,
		method: 'POST',
		body: {
			stellar_address: stellar_address,
			password: password
		}
	} );
}

function federationRegister( _ref3 ) {
	var stellar_address = _ref3.stellar_address,
		keypair = _ref3.keypair;

	var body = {
		stellar_address: stellar_address,
		account_id: keypair.publicKey()
	};
	var signature = sign( body, keypair.secret() );

	return request( {
		url: federationUrl,
		method: 'PUT',
		headers: {
			signature: signature
		},
		body: body
	} );
}

function federationDelete( _ref4 ) {
	var stellar_address = _ref4.stellar_address,
		keypair = _ref4.keypair;

	var body = {
		stellar_address: stellar_address,
		account_id: keypair.publicKey()
	};
	var signature = sign( body, keypair.secret() );

	return request( {
		url: federationUrl,
		method: 'PUT',
		headers: {
			signature: signature
		},
		body: body
	} );
}

module.exports = {
	setUrl: setUrl,
	federationResolve: federationResolve,
	federationReverse: federationReverse,
	federationKeypair: federationKeypair,
	federationCreate: federationCreate,
	federationRegister: federationRegister,
	federationDelete: federationDelete
};