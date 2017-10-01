import * as types from './ActionTypes';

export const setLanguage = ( $language ) => ( {
  type: types.SET_LANGUAGE,
  language: $language,
} );

export const updateKeypair = ( $keypair ) => ( {
  type: types.UPDATE_KEYPAIR,
  keypair: $keypair,
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

export const showRecordSeed = ( $isShow ) => ( {
  type: types.SHOW_RECORD_SEED,
  isShow: $isShow,
} );

export const showCopyComplete = ( $isShow ) => ( {
  type: types.SHOW_COPY_COMPLETE,
  isShow: $isShow,
} );

export const showTransactionConfirm = ( $isShow, $paymentData ) => ( {
  type: types.SHOW_TRANSACTION_CONFIRM,
  isShow: $isShow,
  paymentData: $paymentData,
} );

export const showTransactionComplete = ( $isShow, $paymentData ) => ( {
  type: types.SHOW_TRANSACTION_COMPLETE,
  isShow: $isShow,
  paymentData: $paymentData,
} );

export const streamAccount = ( $account ) => ( {
  type: types.STREAM_ACCOUNT,
  account: $account,
} );

export const streamEffects = ( $effects ) => ( {
  type: types.STREAM_EFFECTS,
  effects: $effects,
} );

export const streamOffers = ( $offers ) => ( {
  type: types.STREAM_OFFERS,
  offers: $offers,
} );

export const streamPayment = ( $payment ) => ( {
  type: types.STREAM_PAYMENT,
  payment: $payment,
} );

export const resetHistory = () => ( {
  type: types.RESET_HISTORY,
} );
