/**
 * Root reducer of the app
 */

import { combineReducers } from 'redux';

import userReducer from './UserReducer'
import groupReducer from "./groupReducer";
import moduleReducer from "./moduleReducer";
import addModuleReducer from './addModuleReducer'
import typeReducer from "./TypesReducer";

const rootReducer = combineReducers(
    {
        user : userReducer,
        group : groupReducer,
        module: moduleReducer,
        addModule : addModuleReducer,
        type:   typeReducer
    }
)


export default rootReducer;