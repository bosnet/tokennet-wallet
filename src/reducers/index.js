import language from './language';
import spinner from './spinner';
import keyGenerator from './keyGenerator';
import generatorConfirm from './generatorConfirm';

import { combineReducers } from 'redux';

const reducers = combineReducers( {
  language,
  spinner,
  keyGenerator,
  generatorConfirm,
} );

export default reducers;