var _assign = require( 'babel-runtime/core-js/object/assign' );

var _assign2 = _interopRequireDefault( _assign );

var _promise = require( 'babel-runtime/core-js/promise' );

var _promise2 = _interopRequireDefault( _promise );

function _interopRequireDefault( obj ) {
	return obj && obj.__esModule ? obj : { default: obj };
}

var _require = require( 'libs/stellar-sdk' ),
	Asset = _require.Asset,
	FederationServer = _require.FederationServer,
	StrKey = _require.StrKey,
	Keypair = _require.Keypair;

var Decimal = require( 'decimal.js' );
if ( typeof Decimal !== 'function' ) {
	Decimal = Decimal.default;
}

var STROOP = 0.0000001;

var validPk = function validPk( pk ) {
	return StrKey.isValidEd25519PublicKey( pk );
};
var validSeed = function validSeed( seed ) {
	return StrKey.isValidEd25519SecretSeed( seed );
};

var resolveAddress = function resolveAddress( address ) {
	if ( validPk( address ) ) return _promise2.default.resolve( {
		account_id: address
	} );

	return FederationServer.resolve( address );
};

var validDestination = function validDestination( address ) {
	return resolveAddress( address ).then( function () {
		return true;
	} ).catch( function () {
		return false;
	} );
};

var AssetShortName = function AssetShortName( asset ) {
	if ( asset.isNative() ) {
		return 'XLM';
	}
	return asset.getCode();
};

var AssetUid = function AssetUid( asset ) {
	var str = asset.getAssetType();
	if ( asset.isNative() ) {
		return str;
	}
	str += ':';
	str += asset.getCode();
	str += ':';
	str += asset.getIssuer();
	return str;
};

var AssetInstance = function AssetInstance( asset ) {
	if ( !asset ) return null;
	var returnAsset = void 0;
	if ( asset instanceof Asset || ( asset.constructor && asset.constructor.name === 'Asset' ) ) {
		returnAsset = asset;
	} else if ( asset.asset_type === 'native' ) {
		returnAsset = Asset.native();
	} else {
		returnAsset = new Asset( asset.asset_code, asset.asset_issuer );
	}

	returnAsset.uuid = AssetUid( returnAsset );
	returnAsset.shortName = AssetShortName( returnAsset );

	return returnAsset;
};

var KeypairInstance = function KeypairInstance( keypair ) {
	if ( keypair instanceof Keypair || ( keypair.constructor && keypair.constructor.name === 'Keypair' ) ) {
		return keypair;
	}
	if ( !!keypair.secretSeed ) {
		return Keypair.fromSecret( keypair.secretSeed );
	}
	return Keypair.fromPublicKey( keypair.publicKey );
};

var AmountInstance = function AmountInstance( number ) {
	var decimal = new Decimal( number );
	return decimal.toString();
};

var areSameAssets = function areSameAssets( a1, a2 ) {
	try {
		var as1 = AssetInstance( a1 );
		var as2 = AssetInstance( a2 );

		if ( as1 === as2 === null ) {
			return true;
		} else if ( !as1 || !as2 ) {
			return false;
		}
		return as1.equals( as2 );
	} catch ( e ) {
		return false;
	}
};

var augmentAccount = function augmentAccount( account ) {
	return (0, _assign2.default)( {}, account, {
		balances: account.balances.map( function ( b ) {
			return (0, _assign2.default)( {}, b, {
				asset: AssetInstance( b )
			} );
		} )
	} );
};

module.exports = {
	STROOP: STROOP,
	validPk: validPk,
	validSeed: validSeed,
	resolveAddress: resolveAddress,
	validDestination: validDestination,
	AssetInstance: AssetInstance,
	AssetUid: AssetUid,
	KeypairInstance: KeypairInstance,
	AmountInstance: AmountInstance,
	areSameAssets: areSameAssets,
	augmentAccount: augmentAccount
};