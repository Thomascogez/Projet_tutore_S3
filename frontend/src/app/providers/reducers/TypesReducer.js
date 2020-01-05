import {ALL_EVENT_TYPES, ALL_SESSION_TYPES} from "../../types/apiConst";

/**
 * Reducer that dispatch all types (session, event) actions
 */

const initialState = {
    sessionType: {},
    eventType  : {}
};


const typeReducer = (state = initialState, action) => {
    switch (action.type) {
        case ALL_SESSION_TYPES:
            return {
                ...state,
                sessionType: action.value
            };
        case ALL_EVENT_TYPES:
            return {
                ...state,
                eventType: action.value
            };
        default:
            return initialState;
    }
};

export default typeReducer;