var expect = require( 'chai' ).expect;

var _require = require( './bufferTool' ),
	splitBuffer = _require.splitBuffer,
	mergeBuffer = _require.mergeBuffer;

describe( 'Buffer tools', function () {
	var testSM = function testSM( input, chunkSize ) {
		var str = input;
		var splitted = splitBuffer( str, chunkSize );
		var merged = mergeBuffer( splitted );
		expect( merged.toString() ).to.equal( str.toString() );
	};

	it( 'splits and merge', function () {
		testSM( 'czejcozeijfzeiojf', 1 );
		testSM( 'czejcozeijfzeiojf', 2 );
		testSM( 'czejcozeijfzeiojf', 3 );
		testSM( 'fsdfsd', 1 );
		testSM( 'fsdfsd', 2 );
		testSM( 'fsdfsd', 3 );
		testSM( 'fsdfs', 1 );
		testSM( 'fsdfs', 2 );
		testSM( 'fsdfs', 3 );
		testSM( 'q', 1 );
		testSM( 'q', 2 );
		testSM( 'q', 3 );
		testSM( Buffer.from( 'czejcozeijfzeiojf' ), 3 );
	} );
} );