import * as types from './ActionTypes';

export const setLanguage = ( $language ) => ({
	type: types.SET_LANGUAGE,
	language: $language,
});