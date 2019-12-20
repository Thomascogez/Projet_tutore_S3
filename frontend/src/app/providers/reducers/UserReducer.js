/**
 * Reducer that dispatch all user actions
 */
import { SET_ISLOGGEDIN, SET_USER } from "../../types/actionsTypes";

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
        case SET_USER:
            console.log(state)
            return {
                ...state,
                user : action.user
            }
        default:
            return initialState;
    }
}


export default userReducer;

