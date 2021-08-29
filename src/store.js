import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise-middleware';
import rootReducer from './reducer';

// Cria o armazenamento do redux
const store = createStore(rootReducer, applyMiddleware(promise));

export default store;
