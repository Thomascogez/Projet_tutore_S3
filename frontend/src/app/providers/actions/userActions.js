import { SET_ISLOGGEDIN, SET_USER } from "../../types/actionsTypes";
import { navigate } from 'hookrouter';
import { APIlogin, APIgetMyAccount } from '../../api/userFetch'

/**
 * userAction.js
 *
 * Here all user actions are handeled
 *
 */


 /**
  * login
  * 
  * Action to dispatch user login info on store
  * @param {*} username 
  * @param {*} password 
  */
const login = (username, password) => {
    return dispatch => {
        return APIlogin(username, password)
            .then(data => {
                if (data.message) {
                    //if we receive an error message from the server
                    dispatch({
                        type: SET_ISLOGGEDIN,
                        value: false
                    });
                } else {
                    // Everything ok : log the user
                    localStorage.setItem("token", data.data.token);
                    dispatch({
                        type: SET_ISLOGGEDIN,
                        value: true
                    });
                }
            })
            .catch(err => {
                // if error
                dispatch({
                    type: SET_ISLOGGEDIN,
                    value: false
                });
            });
    };
};

/**
 * logout
 * 
 * Logout the user from the app
 */
const logout = () => {
    localStorage.removeItem('token');
    navigate('/');
    return {
        type: SET_ISLOGGEDIN,
        value: false
    }
}



//TODO: check
const checkLogin = () => {
    return dispatch => {
        return APIgetMyAccount()
            .then(data => {
                dispatch({
                    type: SET_ISLOGGEDIN,
                    value: true
                })
                
            })
            .catch(err => {
                dispatch({
                    type: SET_ISLOGGEDIN,
                    value: false
                })
                
            })

    }
}

export { login, logout, checkLogin };
