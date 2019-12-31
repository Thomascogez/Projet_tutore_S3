/**
 * Root reducer of the app
 */

import { combineReducers } from 'redux';

import userReducer from './UserReducer'
import groupReducer from "./groupReducer";
import moduleReducer from "./moduleReducer";
import typeReducer from "./TypesReducer";

const rootReducer = combineReducers(
    {
        user : userReducer,
        group : groupReducer,
        module: moduleReducer,
        type:   typeReducer
    }
)


export default rootReducer;