import language from './language';
import keypair from './keypair';
import spinner from './spinner';
import keyGenerator from './keyGenerator';
import generatorConfirm from './generatorConfirm';
import recordSeed from './recordSeed';
import copyComplete from './copyComplete';
import transactionConfirm from './transactionConfirm';
import transactionComplete from './transactionComplete';

import { combineReducers } from 'redux';

const reducers = combineReducers( {
  language,
  keypair,
  spinner,
  keyGenerator,
  generatorConfirm,
  recordSeed,
  copyComplete,
  transactionConfirm,
  transactionComplete
} );

export default reducers;