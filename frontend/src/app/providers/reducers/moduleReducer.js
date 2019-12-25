import {GET_ALL_MODULES} from "../../types/actionsTypes";

/**
 * Reducer that dispatch all modules actions
 */

const initialState = {
    modules: {}
};


const moduleReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_MODULES:
            return {
                ...state,
                modules: action.value
            };
        default:
            return initialState;
    }
};

export default moduleReducer;