/**
 * Store.js
 * 
 * Main redux store file
 * 
 */

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import { composeWithDevTools } from 'redux-devtools-extension';



const store = createStore(rootReducer, composeWithDevTools( //build store with redux devTools
    applyMiddleware(thunk),
));


export default store;