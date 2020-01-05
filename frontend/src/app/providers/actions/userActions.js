import { SET_ISLOGGEDIN, SET_USER } from "../../types/actionsTypes";
import { navigate } from "hookrouter";
import {
  APIlogin,
  APIgetMyAccount,
  APIcheckStillValid
} from "../../api/userFetch";

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
            value: false,
          });
        } else {      
          // Everything ok : log the user
          localStorage.setItem("token", data.data.token);
          
          dispatch({
            type: SET_ISLOGGEDIN,
            value: true,
            error: false,
          });
          dispatch(getUserProfile());
        }
      })
      .catch(err => {
        dispatch({
          type: SET_ISLOGGEDIN,
          value: false,
          error: true
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
  localStorage.removeItem("token");
  navigate("/");
  return {
    type: SET_ISLOGGEDIN,
    value: false
  };
};

const checkLogin = () => {
  return dispatch => {
    return APIcheckStillValid()
      .then(data => {
        console.log(data);
        
        dispatch({
          type: SET_ISLOGGEDIN,
          value: true,
          error:false,
          user :data.data
        });
      })
      .catch(err => {
        console.log(err);
        
        dispatch({
          type: SET_ISLOGGEDIN,
          value: false,
          error:false
        });
      });
  };
};

const getUserProfile = () => {
  return dispatch => {
    return APIgetMyAccount()
      .then(data => {
        console.log(data.data);
        dispatch({
          type: SET_USER,
          value: data.data
        });
      })
      .catch(err => {
        navigate("/");
        dispatch({
          type: SET_USER,
          value: {}
        });
      });
  };
};

export { login, logout, checkLogin, getUserProfile };
