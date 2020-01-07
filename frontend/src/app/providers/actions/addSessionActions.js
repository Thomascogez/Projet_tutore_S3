import { SET_SESSIONADD, SET_GROUP_SET_SESSIONADD } from '../../types/actionsTypes'


/**
 * addSessionModule
 * 
 * @param {*} module    
 */
const setSession = module => {
    return {
        type  : SET_SESSIONADD,
        value : module
    }
}


const setGroup = group => {
    return {
        type  : SET_GROUP_SET_SESSIONADD,
        value : group
    }
}

export { setSession, setGroup }