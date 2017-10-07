var uuid = require( "uuid" );

var splitBuffer = function splitBuffer( buffer, chunkSize ) {
	var encoding = arguments.length > 2 && arguments[ 2 ] !== undefined ? arguments[ 2 ] : undefined;

	if ( !(buffer instanceof Buffer || typeof buffer === 'string') ) {
		throw new Error( 'need string of buffer' );
	}
	var bufferCopy = Buffer.from( buffer, encoding );
	var splitted = [];
	var nbChunk = Math.ceil( bufferCopy.length / chunkSize );
	for ( var i = 0; i < nbChunk; i++ ) {
		var slice = bufferCopy.slice( i * chunkSize, (i + 1) * chunkSize );
		splitted.push( slice );
	}
	return splitted;
};

var mergeBuffer = function mergeBuffer( buffers ) {
	var encoding = arguments.length > 1 && arguments[ 1 ] !== undefined ? arguments[ 1 ] : undefined;

	/*const size = buffers.reduce((acc, b) => acc + b.length, 0);
	const buffer = Buffer.alloc(size);
	let offset = 0;
	for(let i=0; i<buffers.length; i++) {
	  buffers[i].copy(buffer, offset);
	  offset += buffers[i].length;
	}
	return buffer.toString(encoding);*/
	return Buffer.from( Buffer.concat( buffers ), encoding ).toString();
};

/**
 * Converts a string into 64 bytes hexadecimal hash
 * @param {string} str
 * @returns {string}
 */
var hexaHash = function hexaHash( str ) {
	var inputBuffer = Buffer.from( str );
	var outputBuffer = Buffer.alloc( 32 );
	outputBuffer.write( inputBuffer.toString() );
	return outputBuffer.toString( 'hex' );
};

/**
 * Generates random 64 bytes hexadecimal hash (32 characters)
 * @returns {string}
 */
var randomHash = function randomHash() {
	return hexaHash( uuid() );
};

module.exports = {
	splitBuffer: splitBuffer,
	mergeBuffer: mergeBuffer,
	randomHash: randomHash,
	hexaHash: hexaHash
};