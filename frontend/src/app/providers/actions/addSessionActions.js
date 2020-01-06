import { ADD_SESSION, SET_SESSION_TYPE } from '../../types/actionsTypes'


/**
 * addSessionModule
 * 
 * @param {*} id    id of the session
 */
const addSession = module => {
    return {
        type  : ADD_SESSION,
        value : module
    }
}


const setSessionType = type => {
    return {
        type  : SET_SESSION_TYPE,
        value : type
    }
}

export { addSession, setSessionType }