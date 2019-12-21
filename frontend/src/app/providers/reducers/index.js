/**
 * Root reducer of the app
 */

import { combineReducers } from 'redux';

import userReducer from './UserReducer'
import groupReducer from "./groupReducer";

const rootReducer = combineReducers(
    {
        user : userReducer,
        group : groupReducer
    }
)


export default rootReducer;