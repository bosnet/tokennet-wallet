import * as types from './ActionTypes';

export const setLanguage = ( $language ) => ( {
	type: types.SET_LANGUAGE,
	language: $language,
} );

export const showSpinner = ( $isShow ) => ( {
	type: types.SHOW_SPINNER,
  isShow: $isShow,
} );

export const showKeyGenerator = ( $isShow ) => ( {
	type: types.SHOW_KEY_GENERATOR,
  isShow: $isShow,
} );

export const showGeneratorConfirm = ( $isShow ) => ( {
	type: types.SHOW_GENERATOR_CONFIRM,
  isShow: $isShow,
} );

export const showSeedLogin = ( $isShow ) => ( {
	type: types.SHOW_SEED_LOGIN,
	isShow: $isShow,
} );