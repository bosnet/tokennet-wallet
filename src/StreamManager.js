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
		const stream = [ StreamManager.accountStream, StreamManager.effectsStream, StreamManager.offersStream, StreamManager.paymentStream ];
		stream.forEach( $stream => {
			StreamManager.stopStream( $stream );
		} );
	};
}

export default StreamManager;