var request = require( '../helpers/request' );

var wilsonUrl = "https://stellar-wilson.herokuapp.com/wilson";

function setUrl( url ) {
	wilsonUrl = url;
}

function anchorList() {
	return request( {
		url: wilsonUrl,
		qs: {
			type: 'list'
		}
	} );
}

function anchorInfo( _ref ) {
	var code = _ref.code,
		issuer = _ref.issuer;

	return request( {
		url: wilsonUrl,
		qs: {
			type: 'info',
			code: code,
			issuer: issuer
		}
	} );
}

function anchorDeposit( _ref2 ) {
	var code = _ref2.code,
		issuer = _ref2.issuer,
		address = _ref2.address;

	return request( {
		url: wilsonUrl,
		qs: {
			type: 'deposit',
			code: code,
			issuer: issuer,
			address: address
		}
	} );
}

function anchorWithdraw( _ref3 ) {
	var code = _ref3.code,
		issuer = _ref3.issuer,
		address = _ref3.address;

	return request( {
		url: wilsonUrl,
		qs: {
			type: 'withdraw',
			code: code,
			issuer: issuer,
			address: address
		}
	} );
}

module.exports = {
	setUrl: setUrl,
	anchorList: anchorList,
	anchorInfo: anchorInfo,
	anchorDeposit: anchorDeposit,
	anchorWithdraw: anchorWithdraw
};