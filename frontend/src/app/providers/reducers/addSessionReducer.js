import { SET_SESSIONADD, SET_GROUP_SET_SESSIONADD } from '../../types/actionsTypes'


const initialState = {
    sessions  : {},
    groups    : [],
    
}

export default (state = initialState, { type, value }) => {
    switch (type) {
    case SET_SESSIONADD:
        return { 
            ...state,
            sessions : value
        }
    case SET_GROUP_SET_SESSIONADD:
        return { 
            ...state,
            groups : value
        }
   
    default:
        return state
    }
}
