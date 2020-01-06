import { ADD_SESSION, SET_SESSION_TYPE } from '../../types/actionsTypes'


const initialState = {
    sessions  : [],
    type    : "",
    
}

export default (state = initialState, { type, value }) => {
    switch (type) {

    case ADD_SESSION:
        return { 
            ...state,
            sessions : [...state.sessions, value]
        }
    case SET_SESSION_TYPE:
        return { 
            ...state,
            type : value
        }
   
    default:
        return state
    }
}
