var _assign = require( 'babel-runtime/core-js/object/assign' );

var _assign2 = _interopRequireDefault( _assign );

function _interopRequireDefault( obj ) {
	return obj && obj.__esModule ? obj : { default: obj };
}

var _require = require( './StellarServer' ),
	getServerInstance = _require.getServerInstance;

var _require2 = require( './StellarTools' ),
	augmentAccount = _require2.augmentAccount,
	AssetInstance = _require2.AssetInstance;

var REFRESH_INTERVAL = 2000;
var traceError = function traceError() {
	return 0;
};

var getAccount = function getAccount( accountId ) {
	return getServerInstance().loadAccount( accountId ).then( augmentAccount );
};

var paymentListener = function paymentListener( _ref ) {
	var accountId = _ref.accountId,
		_ref$onPayment = _ref.onPayment,
		onPayment = _ref$onPayment === undefined ? function () {
			return 0;
		} : _ref$onPayment,
		_ref$onError = _ref.onError,
		onError = _ref$onError === undefined ? function () {
			return 0;
		} : _ref$onError,
		_ref$cursor = _ref.cursor,
		cursor = _ref$cursor === undefined ? 0 : _ref$cursor;

	getServerInstance().payments().forAccount( accountId ).order( 'asc' ).cursor( cursor ).stream( {
		onmessage: function onmessage( data ) {
			return data.transaction().then( function ( transaction ) {
				return (0, _assign2.default)( {}, data, transaction );
			} ).then( onPayment );
		},
		onerror: onError
	} );
};

var Orderbook = function Orderbook( _ref2 ) {
	var selling = _ref2.selling,
		buying = _ref2.buying;
	return getServerInstance().orderbook( AssetInstance( selling ), AssetInstance( buying ) ).call();
};

var OrderbookStream = function OrderbookStream( _ref3, onmessage ) {
	var selling = _ref3.selling,
		buying = _ref3.buying;
	return getServerInstance().orderbook( AssetInstance( selling ), AssetInstance( buying ) ).stream( { onmessage: onmessage } );
};

var OrderbookDetail = function OrderbookDetail( _ref4 ) {
	var selling = _ref4.selling,
		buying = _ref4.buying;
	return getServerInstance().orderbook( AssetInstance( selling ), AssetInstance( buying ) ).trades().call();
};

var AccountStream = function AccountStream( accountId, callback ) {
	return getServerInstance().accounts().accountId( accountId ).stream( {
		onmessage: function onmessage( streamAccount ) {
			callback( augmentAccount( streamAccount ) );
		},
		onerror: traceError
	} );
};

var OffersStream = function OffersStream( accountId, callback ) {
	var timerId = setInterval( function () {
		getServerInstance().offers( 'accounts', accountId ).order( 'desc' ).call().then( function ( result ) {
			return callback( result.records );
		} );
	}, REFRESH_INTERVAL );

	return function () {
		return clearInterval( timerId );
	};
};

var EffectsStream = function EffectsStream( accountId, onmessage ) {
	return getServerInstance().effects().forAccount( accountId ).order( 'asc' ).stream( { onmessage: onmessage } );
};

var PaymentStream = function PaymentStream( accountId, _onmessage ) {
	return getServerInstance().payments().forAccount( accountId ).order( 'asc' ).stream( {
		onmessage: function onmessage( payment ) {
			payment.transaction().then( function ( transaction ) {
				_onmessage( (0, _assign2.default)( {}, payment, {
					transaction: transaction
				} ) );
			} );
		},
		onerror: traceError
	} );
};

var Paths = function Paths( _ref5 ) {
	var source = _ref5.source,
		destination = _ref5.destination,
		destinationAsset = _ref5.destinationAsset,
		destinationAmount = _ref5.destinationAmount;
	return getServerInstance().paths( source, destination, AssetInstance( destinationAsset ), destinationAmount ).call();
};

module.exports = {
	getAccount: getAccount,
	paymentListener: paymentListener,
	Orderbook: Orderbook,
	OrderbookStream: OrderbookStream,
	OrderbookDetail: OrderbookDetail,
	AccountStream: AccountStream,
	OffersStream: OffersStream,
	EffectsStream: EffectsStream,
	PaymentStream: PaymentStream,
	Paths: Paths
};