/**
 * Root reducer of the app
 */

import { combineReducers } from 'redux';

import userReducer from './UserReducer'
import groupReducer from "./groupReducer";
import moduleReducer from "./moduleReducer";
import addSessionReducer from './addSessionReducer'
import typeReducer from "./TypesReducer";

const rootReducer = combineReducers(
    {
        user : userReducer,
        group : groupReducer,
        module: moduleReducer,
        addSession : addSessionReducer,
        type:   typeReducer
    }
)


export default rootReducer;