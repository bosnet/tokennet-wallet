var _assign = require( 'babel-runtime/core-js/object/assign' );

var _assign2 = _interopRequireDefault( _assign );

var _promise = require( 'babel-runtime/core-js/promise' );

var _promise2 = _interopRequireDefault( _promise );

function _interopRequireDefault( obj ) {
	return obj && obj.__esModule ? obj : { default: obj };
}

var _require = require( './StellarStreamers' ),
	Paths = _require.Paths,
	Orderbook = _require.Orderbook;

var _require2 = require( './StellarTools' ),
	AssetInstance = _require2.AssetInstance;

var _require3 = require( 'lodash' ),
	uniqBy = _require3.uniqBy,
	sortBy = _require3.sortBy;

var RESULTS = {
	NO_OFFERS: -1,
	NOT_ENOUGH_BIDS: -2
};

var getExchangeRateFromOffers = function getExchangeRateFromOffers( _ref ) {
	var sourceAsset = _ref.sourceAsset,
		destinationAsset = _ref.destinationAsset,
		destinationAmount = _ref.destinationAmount,
		sendMax = _ref.sendMax;
	return destinationAmount && sendMax ? _promise2.default.reject( new Error( 'Cannot set both destinationAmount and sendMax' ) ) : Orderbook( {
		buying: destinationAsset,
		selling: sourceAsset
	} ).then( function ( o ) {
		var offers = o.bids;
		if ( offers.length === 0 ) {
			return RESULTS.NO_OFFERS;
		}
		var remainingAmount = sendMax ? sendMax : destinationAmount;
		var i = 0;
		var currentAmount = 0;
		while ( remainingAmount > 0 && i < offers.length ) {
			if ( destinationAmount ) {
				currentAmount += Math.min( remainingAmount, offers[ i ].amount ) / offers[ i ].price;
			} else {
				currentAmount += Math.min( remainingAmount, offers[ i ].amount ) * offers[ i ].price;
			}
			remainingAmount -= offers[ i ].amount;
			i++;
		}
		if ( remainingAmount > 0 ) {
			return RESULTS.NOT_ENOUGH_BIDS;
		}
		var newSendMax = sendMax ? sendMax : currentAmount;
		var newDestinationAmount = destinationAmount ? destinationAmount : currentAmount;
		var averagePrice = newDestinationAmount / newSendMax;
		var result = {
			sourceAsset: AssetInstance( sourceAsset ),
			destinationAsset: AssetInstance( destinationAsset ),
			sendMax: newSendMax,
			destinationAmount: newDestinationAmount,
			rate: averagePrice
		};
		return result;
	} ).catch( function ( e ) {
		return RESULTS.NOT_ENOUGH_BIDS;
	} );
};

var getPathSource = function getPathSource( _ref2 ) {
	var source = _ref2.source,
		destination = _ref2.destination,
		destinationAsset = _ref2.destinationAsset,
		destinationAmount = _ref2.destinationAmount;
	return Paths( {
		source: source,
		destination: destination,
		destinationAsset: destinationAsset,
		destinationAmount: destinationAmount
	} ).then( function ( results ) {
		return results.records.map( function ( p ) {
			return (0, _assign2.default)( {}, p, {
				source_asset: AssetInstance( {
					asset_code: p.source_asset_code,
					asset_issuer: p.source_asset_issuer,
					asset_type: p.source_asset_type
				} ),
				destination_asset: AssetInstance( {
					asset_code: p.destination_asset_code,
					asset_issuer: p.destination_asset_issuer,
					asset_type: p.destination_asset_type
				} )
			} );
		} );
	} ).then( function ( paths ) {
		return paths.map( function ( p ) {
			return {
				sourceAsset: p.source_asset,
				destinationAsset: p.destination_asset,
				sendMax: p.source_amount,
				destinationAmount: destinationAmount,
				rate: p.destination_amount / p.source_amount
			};
		} );
	} ).then( function ( paths ) {
		return paths.filter( function ( p ) {
			return p.sourceAsset.uuid !== p.destinationAsset.uuid;
		} );
	} ).then( function ( paths ) {
		return sortBy( paths, 'sendMax' );
	} ).then( function ( paths ) {
		return uniqBy( paths, 'sourceAsset.uuid' );
	} ).catch( function ( e ) {
		return RESULTS.NOT_ENOUGH_BIDS;
	} );
};

var getExchangeRateFromAutoPath = function getExchangeRateFromAutoPath( _ref3 ) {
	var account_id = _ref3.account_id,
		sourceAsset = _ref3.sourceAsset,
		destinationAsset = _ref3.destinationAsset,
		destinationAmount = _ref3.destinationAmount;
	return getPathSource( {
		source: account_id,
		destination: account_id,
		destinationAsset: destinationAsset,
		destinationAmount: destinationAmount
	} ).then( function ( paths ) {
		return paths.find( function ( p ) {
			return p.sourceAsset.uuid === AssetInstance( sourceAsset ).uuid;
		} );
	} ).then( function ( path ) {
		return {
			sourceAsset: AssetInstance( path.sourceAsset ),
			destinationAsset: AssetInstance( destinationAsset ),
			sendMax: path.sendMax,
			destinationAmount: destinationAmount,
			rate: path.rate
		};
	} ).catch( function ( e ) {
		return RESULTS.NOT_ENOUGH_BIDS;
	} );
};

module.exports = {
	getExchangeRateFromAutoPath: getExchangeRateFromAutoPath,
	getExchangeRateFromOffers: getExchangeRateFromOffers,
	getPathSource: getPathSource
};