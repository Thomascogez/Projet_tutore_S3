import { LOGIN_CHECK    } from "../../types/apiConst";
import { SET_ISLOGGEDIN } from "../../types";
import axios from "axios";

/**
 * userAction.js
 *
 * Here all user actions are handeled
 *
 */

const login = (username, password) => {
    return dispatch => {
        return axios
            .post(LOGIN_CHECK, {
                username,
                password
            })
            .then(data => {
                if (data.message) {
                    console.log(data);
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

export { login };
