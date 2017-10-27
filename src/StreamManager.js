class StreamManager {
	static stopStream = ( $stream ) => {
		if ( $stream ) {
			try {
				$stream();
			}
			catch ( $error ) {
			}
		}
	};

	static stopAllStream = () => {
		const stream = [ this.accountStream, this.effectsStream, this.offersStream, this.paymentStream ];
		stream.forEach( $stream => {
			StreamManager.stopStream( $stream );
		} );
	};
}

export default StreamManager;