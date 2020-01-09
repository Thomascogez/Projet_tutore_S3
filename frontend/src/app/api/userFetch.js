import {
  LOGIN_CHECK,
  CHECK_STILL_VALID,
  CHECK_IS_ADMIN,
  GET_USER_PROFILE,
  ALL_USERS,
  EDIT_USERS, DELETE_USERS, ADD_USERS
} from "../types/apiConst";
import axios from "axios";

/**
 * Check if the user exist then return a frsh JWT token
 * @param {*} username 
 * @param {*} password 
 */
const APIlogin = (username, password) => {
  return axios.post(LOGIN_CHECK, {
    username,
    password
  });
};

/**
 * Check if a user information is still valid
 */
const APIcheckStillValid = () => {
  return axios.get(CHECK_STILL_VALID, {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") }
  });
};


/**
 * Fetch user profile informations
 */
const APIgetMyAccount = () => {
  return axios.get(GET_USER_PROFILE, {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") }
  });
}

/**
 * Check if the curren logged user as admin right
 */
const ApiIsAdmin = () => {
  return axios.get(CHECK_IS_ADMIN, {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") }
  });
}


/**
 * get all user register on the site
 */
const APIGetAllUsers = () => {
  return axios.get(ALL_USERS, {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") }
  });
}

/**
 * add an user on the site
 * @param {json} user object that contain new user informations
 */
const APIAddUser = (user) => {
  return axios.post(ADD_USERS, user, {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") }
  });
}

/**
 * get user by is id
 * @param {*} idUser id of the user to get
 */
const APIGetUser = (idUser) => {
  return axios.get(ALL_USERS + "/" + idUser, {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") }
  });
}

/**
 * Modify the profile of an user
 * @param {*} idUser  id of the user to add
 * @param {json} user    object that old new user information
 */
const APIEditUser = (idUser, user) => {
  return axios.patch(EDIT_USERS + "/" + idUser, user, {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") }
  });
}

/**
 * Delete an user by is id 
 * @param {*} idUser id of the user to delete
 */
const APIDeleteUser = (idUser) => {
  return axios.delete(DELETE_USERS + '/' + idUser, {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") }
  })
}




export { APIlogin, APIcheckStillValid, ApiIsAdmin, APIgetMyAccount, APIDeleteUser, APIEditUser, APIGetAllUsers, APIGetUser, APIAddUser};
