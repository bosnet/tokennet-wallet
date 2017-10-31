const pageview = path => {
	if( window.ga ) {
		if( !path ) {
			path = window.location.pathname + window.location.search;
		}

		window.ga( 'send', 'pageview', path );
	}
};

export default pageview;