import React, { Component } from 'react';
import './KeyGeneratorMessage.scss';
import T from 'i18n-react';

class KeyGeneratorMessage extends Component {
	render() {
		return (
			<div>
				<h1>
					{T.translate( 'key_generator.header' )}
				</h1>

				<span className="black-line"> </span>

				<p>
					{T.translate( 'key_generator.description_line1' )}<br/>
					{T.translate( 'key_generator.description_line2' )} <br/>
					{T.translate( 'key_generator.description_line3' )}<br/>
					<span>{T.translate( 'key_generator.description_line4' )}</span>
				</p>
			</div>
		)
	}
}

export default KeyGeneratorMessage;