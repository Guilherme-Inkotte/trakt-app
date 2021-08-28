import { createStore } from 'redux';
import rootReducer from './reducer';

// Cria o armazenamento do redux
const store = createStore(rootReducer);

export default store;
