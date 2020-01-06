import userReducer from "./UserReducer";
import {GET_ALL_GROUPS} from "../../types/actionsTypes";

/**
 * Reducer that dispatch all groups actions
 */

const initialState = {
    groups: []
};


const groupReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_GROUPS:
            return {
                ...state,
                groups: action.value
            };
        default:
            return state;
    }
};

export default groupReducer;