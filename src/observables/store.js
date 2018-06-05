import { observable } from 'mobx';

const store = observable( {
	keypair: null,
} );

export default store;