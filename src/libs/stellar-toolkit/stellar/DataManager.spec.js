var _defineProperty2 = require( 'babel-runtime/helpers/defineProperty' );

var _defineProperty3 = _interopRequireDefault( _defineProperty2 );

var _keys = require( 'babel-runtime/core-js/object/keys' );

var _keys2 = _interopRequireDefault( _keys );

function _interopRequireDefault( obj ) {
	return obj && obj.__esModule ? obj : { default: obj };
}

var _require = require( 'stellar-sdk' ),
	Keypair = _require.Keypair;

var expect = require( 'chai' ).expect;

var _require2 = require( './DataManager' ),
	sign = _require2.sign,
	verify = _require2.verify,
	chunkData = _require2.chunkData,
	glueData = _require2.glueData;

describe( 'DataManager', function () {
	var prefix = 'aazzbb_';
	var eleven = 'azertyuiopq';
	var sixtysix = eleven + eleven + eleven + eleven + eleven + eleven;
	var seventyseven = sixtysix + eleven;

	it( 'signs and verifies', function () {
		var keypair = Keypair.fromSecret( 'SDDKHJYC6VRWQVGN5H6DTRCQ7OINE6MASBDQVRBLX6IX2CV5U5MVBSJQ' );
		// const keypair = Keypair.random();

		var data = {
			account_id: keypair.publicKey(),
			stellar_address: 'roberto*ngfar.io'
		};

		var signature = sign( data, keypair.secret() );
		expect( signature ).to.equal( "8A5nLhJ4P5S4tgwgOhUlShbD5R8KjIVrQYmtLZM0JA+S4qTBkHyKjQnrxoeWoWpGW/cQMAwR+6J0Xn8jdTArCQ==" );
		var verified = verify( data, data.account_id, signature );
		expect( verified ).to.be.true;
	} );

	it( 'chunkData even', function () {
		var chunked = chunkData( prefix, sixtysix );
		var keys = (0, _keys2.default)( chunked );

		expect( keys.length ).to.equal( 2 );
		expect( prefix + '0' ).to.equal( keys[ 0 ] );
		expect( prefix + '1' ).to.equal( keys[ 1 ] );
		expect( chunked[ keys[ 0 ] ].toString() ).to.equal( sixtysix.slice( 0, 64 ) );
		expect( chunked[ keys[ 1 ] ].toString() ).to.equal( sixtysix.slice( 64 ) );
	} );

	it( 'chunkData odd', function () {
		var chunked = chunkData( prefix, seventyseven );
		var keys = (0, _keys2.default)( chunked );

		expect( keys.length ).to.equal( 2 );
		expect( prefix + '0' ).to.equal( keys[ 0 ] );
		expect( prefix + '1' ).to.equal( keys[ 1 ] );
		expect( chunked[ keys[ 0 ] ].toString() ).to.equal( seventyseven.slice( 0, 64 ) );
		expect( chunked[ keys[ 1 ] ].toString() ).to.equal( seventyseven.slice( 64 ) );
	} );

	it( 'chunkData custom chunk size', function () {
		var s = 5;
		var chunked = chunkData( prefix, eleven, s );
		var keys = (0, _keys2.default)( chunked );

		expect( keys.length ).to.equal( 3 );
		expect( prefix + '0' ).to.equal( keys[ 0 ] );
		expect( prefix + '1' ).to.equal( keys[ 1 ] );
		expect( prefix + '2' ).to.equal( keys[ 2 ] );
		expect( chunked[ keys[ 0 ] ].toString() ).to.equal( eleven.slice( 0, s ) );
		expect( chunked[ keys[ 1 ] ].toString() ).to.equal( eleven.slice( s, 2 * s ) );
		expect( chunked[ keys[ 2 ] ].toString() ).to.equal( eleven.slice( 2 * s ) );
	} );

	it( 'glueData', function () {
		var _chunked;

		var chunked = (_chunked = {}, (0, _defineProperty3.default)( _chunked, prefix + '0', Buffer.from( 'azer' ).toString( 'base64' ) ), (0, _defineProperty3.default)( _chunked, prefix + '1', Buffer.from( 'tyui' ).toString( 'base64' ) ), _chunked);
		var data = glueData( prefix, chunked );
		expect( data ).to.equal( 'azertyui' );
	} );

	it( 'glueData throws if no chunked', function () {
		expect( glueData.bind( null, prefix, {} ) ).to.throw;
	} );
} );