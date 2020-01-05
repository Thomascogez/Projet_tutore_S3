import { SET_MODULE, SET_TYPE, ADD_EVENT } from '../../types/actionsTypes'


const initialState = {
    id : "",
    type   : "",
    event  : [],
}

export default (state = initialState, { type, value }) => {
    switch (type) {

    case SET_MODULE:
        return { 
            ...state,
            id : value
        }
    case SET_TYPE:
        return { 
            ...state,
            type : value
        }
    case ADD_EVENT:
        return { 
            ...state,
            event : [state.event, value]
    }

    default:
        return state
    }
}
