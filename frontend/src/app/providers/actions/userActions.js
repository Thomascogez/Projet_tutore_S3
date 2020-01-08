import {GET_ALL_USERS, SET_ISLOGGEDIN, SET_USER, SET_PROFILE_COLOR,SET_USER_PROFILE} from "../../types/actionsTypes";
import { navigate } from 'hookrouter';
import {
    APIlogin,
    APIgetMyAccount,
    APIcheckStillValid,
    APIGetAllUsers,
    APIDeleteUser
} from '../../api/userFetch'


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
        console.log(err.response);

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

//Event types actions
const getUsers = () => {
    return dispatch => {
        return APIGetAllUsers()
            .then(data => {
                dispatch({
                    type: GET_ALL_USERS,
                    value: data.data
                });
            })
    }
}

const removeUser = (idUser) => {
    return dispatch => {
        return APIDeleteUser(idUser)
            .then(data => {
                dispatch({
                    type: GET_ALL_USERS,
                    value: data.data
                });
            })
    }
}


const setProfileColor = (color)  => {
  return {
    type : SET_PROFILE_COLOR,
    value : color
  }
}

const setUserProfile = (profile) => {
  return {
    type : SET_USER_PROFILE,
    value : profile
  }
}


export { login, logout, checkLogin, getUserProfile, getUsers, removeUser,setProfileColor,setUserProfile };
