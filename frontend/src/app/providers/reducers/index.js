/**
 * Root reducer of the app
 */

import { combineReducers } from 'redux';

import userReducer from './UserReducer'
import groupReducer from "./groupReducer";
import moduleReducer from "./moduleReducer";
import addModuleReducer from './addModuleReducer'

const rootReducer = combineReducers(
    {
        user : userReducer,
        group : groupReducer,
        module: moduleReducer,
        addModule : addModuleReducer
    }
)


export default rootReducer;