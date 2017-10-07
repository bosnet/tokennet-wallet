class StreamManager {
	constructor() {
		this.stopStream = this.stopStream.bind( this );
		this.stopAllStream = this.stopAllStream.bind( this );
	}

	static stopStream( $stream ) {
		if ( $stream ) {
			try {
				$stream();
			}
			catch ( $error ) {
			}
		}
	}

	static stopAllStream() {
		const stream = [ this.accountStream, this.effectsStream, this.offersStream, this.paymentStream ];
		stream.forEach( $stream => {
			this.stopStream( $stream );
		} );
	}
}

export default StreamManager;