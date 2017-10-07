var _keys = require( 'babel-runtime/core-js/object/keys' );

var _keys2 = _interopRequireDefault( _keys );

function _interopRequireDefault( obj ) {
	return obj && obj.__esModule ? obj : { default: obj };
}

var _require = require( 'lodash' ),
	isString = _require.isString,
	isNumber = _require.isNumber,
	isFunction = _require.isFunction;

var _require2 = require( 'libs/stellar-sdk' ),
	Account = _require2.Account,
	Memo = _require2.Memo,
	Operation = _require2.Operation,
	TransactionBuilder = _require2.TransactionBuilder;

var Stellar = require( './StellarServer' );

var _require3 = require( './StellarServer' ),
	getAccount = _require3.getAccount;

var _require4 = require( './StellarTools' ),
	AssetInstance = _require4.AssetInstance,
	KeypairInstance = _require4.KeypairInstance,
	AmountInstance = _require4.AmountInstance;

/**
 * Add a list of operations to a transaction builder
 *
 * @param transactionBuilder {TransactionBuilder} - from stellar SDK
 * @param operations {Operation[]} List of operations
 * @param operation {Object} One operation
 */


var addOperations = function addOperations( transactionBuilder, _ref ) {
	var _ref$operations = _ref.operations,
		operations = _ref$operations === undefined ? [] : _ref$operations,
		_ref$operation = _ref.operation,
		operation = _ref$operation === undefined ? null : _ref$operation;

	[ operation ].concat( operations ).filter( function ( o ) {
		return !!o;
	} ).forEach( function ( op ) {
		return transactionBuilder.addOperation( op );
	} );
};

/**
 * Add a memo to a transaction
 *
 * @param transactionBuilder {TransactionBuilder} - from stellar SDK
 * @param memo {Object}
 * @param memo.type {String} One of Stellar.Memo static methods
 * @param memo.value {String} Memo value
 */
var addMemo = function addMemo( transactionBuilder, memo ) {
	if ( !transactionBuilder || !memo ) return;

	var type = memo.type,
		value = memo.value;

	var xdrMemo = void 0;

	if ( isFunction( Memo[ type ] ) ) {
		xdrMemo = Memo[ type ]( value );
	}
	if ( xdrMemo ) {
		transactionBuilder.addMemo( xdrMemo );
	}
};

/**
 * Build and send a transacton
 *
 * @param authData {Object} Source account and signers data
 * @param authData.keypair {Keypair} keypair of sender and signer
 * @param authData.sourceAccount {Account} Account of sender
 * @param operations {Operation[]}
 * @param operation {Operation}
 * @param memo {Object}
 * @returns {Promise}
 */
var sendTransaction = function sendTransaction( _ref2, rawKeypair ) {
	var operations = _ref2.operations,
		operation = _ref2.operation,
		memo = _ref2.memo;

	var keypair = KeypairInstance( rawKeypair );
	var sourceAddress = keypair.publicKey();

	return getAccount( sourceAddress ).then( function ( sourceAccount ) {
		var sequenceNumber = sourceAccount.sequence;
		var transAccount = new Account( sourceAddress, sequenceNumber );

		var transactionBuilder = new TransactionBuilder( transAccount );

		addOperations( transactionBuilder, { operations: operations, operation: operation } );
		addMemo( transactionBuilder, memo );

		var transaction = transactionBuilder.build();
		transaction.sign( keypair );

		return Stellar.getServerInstance().submitTransaction( transaction );
	} );
};

var transactionLauncher = function transactionLauncher( transactionInfo ) {
	return function ( keypair ) {
		return sendTransaction( transactionInfo, keypair );
	};
};

var sendPayment = function sendPayment( _ref3 ) {
	var asset = _ref3.asset,
		destination = _ref3.destination,
		amount = _ref3.amount,
		memo = _ref3.memo;

	var operation = Operation.payment( {
		destination: destination,
		asset: AssetInstance( asset ),
		amount: AmountInstance( amount )
	} );
	return transactionLauncher( { operation: operation, memo: memo } );
};

var sendPathPayment = function sendPathPayment( _ref4 ) {
	var asset_source = _ref4.asset_source,
		asset_destination = _ref4.asset_destination,
		amount_destination = _ref4.amount_destination,
		destination = _ref4.destination,
		max_amount = _ref4.max_amount,
		memo = _ref4.memo;

	var operation = Operation.pathPayment( {
		sendAsset: AssetInstance( asset_source ),
		sendMax: AmountInstance( max_amount ),
		destination: destination,
		destAsset: AssetInstance( asset_destination ),
		destAmount: AmountInstance( amount_destination )
	} );
	return transactionLauncher( { operation: operation, memo: memo } );
};

var changeTrust = function changeTrust( _ref5 ) {
	var asset = _ref5.asset,
		limit = _ref5.limit;

	var trustLimit = isNumber( limit ) || isString( limit ) ? AmountInstance( limit ) : undefined;
	var operation = Operation.changeTrust( {
		asset: AssetInstance( asset ),
		limit: trustLimit
	} );

	return transactionLauncher( { operation: operation } );
};

var manageOffer = function manageOffer( _ref6 ) {
	var selling = _ref6.selling,
		buying = _ref6.buying,
		amount = _ref6.amount,
		price = _ref6.price,
		passive = _ref6.passive,
		id = _ref6.id;

	var operations = [];

	var offerId = isNumber( id ) ? id : 0;
	var offer = {
		selling: AssetInstance( selling ),
		buying: AssetInstance( buying ),
		amount: AmountInstance( amount ),
		price: AmountInstance( price ),
		offerId: offerId
	};
	if ( passive ) {
		operations.push( Operation.createPassiveOffer( offer ) );
	} else {
		operations.push( Operation.manageOffer( offer ) );
	}

	return transactionLauncher( { operations: operations } );
};

var createAccount = function createAccount( _ref7 ) {
	var destination = _ref7.destination,
		amount = _ref7.amount;

	var operation = Operation.createAccount( {
		destination: destination,
		startingBalance: AmountInstance( amount )
	} );

	return transactionLauncher( { operation: operation } );
};

var accountMerge = function accountMerge( _ref8 ) {
	var destination = _ref8.destination;

	var operation = Operation.accountMerge( {
		destination: destination
	} );

	return transactionLauncher( { operation: operation } );
};

var manageData = function manageData( data ) {
	var operations = (0, _keys2.default)( data ).map( function ( prop ) {
		return Operation.manageData( {
			name: prop,
			value: data[ prop ]
		} );
	} );

	return transactionLauncher( { operations: operations } );
};

module.exports = {
	sendTransaction: sendTransaction,
	sendPayment: sendPayment,
	sendPathPayment: sendPathPayment,
	changeTrust: changeTrust,
	manageOffer: manageOffer,
	createAccount: createAccount,
	accountMerge: accountMerge,
	manageData: manageData
};