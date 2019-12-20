/**
 * Reducer that dispatch all user actions
 */
import { SET_ISLOGGEDIN } from "../../types";

 const initialState = {
    user : {},
    isLoggedIn : false
 }

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ISLOGGEDIN:
            return {
                ...state,
                isLoggedIn  : action.value
            }
        default:
            return initialState;
    }
}


export default userReducer;

