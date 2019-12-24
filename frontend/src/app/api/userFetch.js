import { LOGIN_CHECK, CHECK_STILL_VALID, CHECK_IS_ADMIN, GET_USER_PROFILE } from "../types/apiConst";
import axios from "axios";

/**
 * APIlogin
 * 
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
 * APIgetMyAccount
 * 
 * Check if a user information is still valid
 */
const APIcheckStillValid = () => {
  return axios.get(CHECK_STILL_VALID, {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") }
  });
};


/**
 * APIgetUserProfile
 * 
 * Fetch user profile informations
 */
const APIgetMyAccount = () => {
  return axios.get(GET_USER_PROFILE, {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") }
  });
}

/**
 * 
 */
const ApiIsAdmin = () => {
  return axios.get(CHECK_IS_ADMIN, {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") }
  });
}




export { APIlogin, APIcheckStillValid, ApiIsAdmin, APIgetMyAccount };