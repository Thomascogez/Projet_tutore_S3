/**
 * Reducer that dispatch all user actions
 */

 const initialState = {
    user : {},
    isLoggedIn : false
 }

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case "":  //TODO: 
            return initialState
        default:
            return initialState;
    }
}


export default userReducer;

