var _regenerator = require( 'babel-runtime/regenerator' );

var _regenerator2 = _interopRequireDefault( _regenerator );

var _asyncToGenerator2 = require( 'babel-runtime/helpers/asyncToGenerator' );

var _asyncToGenerator3 = _interopRequireDefault( _asyncToGenerator2 );

function _interopRequireDefault( obj ) {
	return obj && obj.__esModule ? obj : { default: obj };
}

var _require = require( 'libs/stellar-sdk' ),
	Keypair = _require.Keypair;

var CryptoJS = require( "crypto-js" );

var _require2 = require( './StellarOperations' ),
	createAccount = _require2.createAccount,
	manageData = _require2.manageData;

var _require3 = require( './StellarServer' ),
	generateTestPair = _require3.generateTestPair,
	getAccount = _require3.getAccount;

var _require4 = require( './StellarTools' ),
	resolveAddress = _require4.resolveAddress;

var _require5 = require( '../helpers/errors' ),
	ERRORS = _require5.ERRORS;

var _require6 = require( './DataManager' ),
	chunkData = _require6.chunkData,
	glueData = _require6.glueData;

var PASSWORD_PREFIX = 'password_';

var encrypt = function encrypt( d, p ) {
	return CryptoJS.AES.encrypt( d, p ).toString();
};
var decrypt = function decrypt( d, p ) {
	return CryptoJS.AES.decrypt( d, p ).toString( CryptoJS.enc.Utf8 );
};

var extractSeed = function extractSeed( account, password ) {
	var seedData = void 0;
	try {
		seedData = glueData( PASSWORD_PREFIX, account.data_attr );
	} catch ( e ) {
		throw ERRORS.ACCOUNT_NO_SEEDDATA( account.account_id );
	}

	try {
		var decrypted = decrypt( seedData, password );
		if ( !decrypted ) {
			throw new Error();
		}
		return decrypted;
	} catch ( e ) {
		throw ERRORS.INVALID_PASSWORD( account.account_id );
	}
};

var setAccountSeed = function () {
	var _ref = (0, _asyncToGenerator3.default)( _regenerator2.default.mark( function _callee( seed, password ) {
		var keypair, encryptedSeed, seedData;
		return _regenerator2.default.wrap( function _callee$( _context ) {
			while ( 1 ) {
				switch ( _context.prev = _context.next ) {
					case 0:
						keypair = Keypair.fromSecret( seed );
						encryptedSeed = encrypt( keypair.secret(), password );
						seedData = chunkData( PASSWORD_PREFIX, encryptedSeed );
						return _context.abrupt( 'return', manageData( seedData )( keypair ) );

					case 4:
					case 'end':
						return _context.stop();
					default:
				}
			}
		}, _callee, undefined );
	} ) );

	return function setAccountSeed( _x, _x2 ) {
		return _ref.apply( this, arguments );
	};
}();

var createAccountEncrypted_test = function () {
	var _ref2 = (0, _asyncToGenerator3.default)( _regenerator2.default.mark( function _callee2( password ) {
		var keypair;
		return _regenerator2.default.wrap( function _callee2$( _context2 ) {
			while ( 1 ) {
				switch ( _context2.prev = _context2.next ) {
					case 0:
						_context2.next = 2;
						return generateTestPair();

					case 2:
						keypair = _context2.sent;
						_context2.next = 5;
						return setAccountSeed( keypair.secret(), password );

					case 5:
						return _context2.abrupt( 'return', keypair );

					case 6:
					case 'end':
						return _context2.stop();
					default:
				}
			}
		}, _callee2, undefined );
	} ) );

	return function createAccountEncrypted_test( _x3 ) {
		return _ref2.apply( this, arguments );
	};
}();

function createAccountEncrypted( _ref3 ) {
	var fundingSeed = _ref3.fundingSeed,
		fundingInitial = _ref3.fundingInitial,
		password = _ref3.password;

	var keypair = Keypair.random();
	var fundingKeypair = Keypair.fromSecret( fundingSeed );

	return createAccount( {
		destination: keypair.publicKey(),
		amount: fundingInitial
	} )( fundingKeypair ).then( function () {
		return setAccountSeed( keypair.secret(), password );
	} ).then( function () {
		return keypair;
	} );
}

// Resolve address (federation or account ID) and decrypt the seed in it
var getKeypairFromLogin = function () {
	var _ref4 = (0, _asyncToGenerator3.default)( _regenerator2.default.mark( function _callee3( address, password ) {
		var resolved, account, seed;
		return _regenerator2.default.wrap( function _callee3$( _context3 ) {
			while ( 1 ) {
				switch ( _context3.prev = _context3.next ) {
					case 0:
						_context3.prev = 0;
						_context3.next = 3;
						return resolveAddress( address );

					case 3:
						resolved = _context3.sent;
						_context3.next = 6;
						return getAccount( resolved.account_id );

					case 6:
						account = _context3.sent;
						seed = extractSeed( account, password );
						return _context3.abrupt( 'return', Keypair.fromSecret( seed ) );

					case 11:
						_context3.prev = 11;
						_context3.t0 = _context3[ 'catch' ]( 0 );

						if ( !(_context3.t0.message && _context3.t0.message.status === 404) ) {
							_context3.next = 15;
							break;
						}

						throw ERRORS.ACCOUNT_NOT_EXIST( { address: address } );

					case 15:
						throw _context3.t0;

					case 16:
					case 'end':
						return _context3.stop();
					default:
				}
			}
		}, _callee3, undefined, [ [ 0, 11 ] ] );
	} ) );

	return function getKeypairFromLogin( _x4, _x5 ) {
		return _ref4.apply( this, arguments );
	};
}();

module.exports = {
	extractSeed: extractSeed,
	setAccountSeed: setAccountSeed,
	createAccountEncrypted: createAccountEncrypted,
	createAccountEncrypted_test: createAccountEncrypted_test,
	getKeypairFromLogin: getKeypairFromLogin,
	PASSWORD_PREFIX: PASSWORD_PREFIX
};