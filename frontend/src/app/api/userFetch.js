import { LOGIN_CHECK, CHECK_STILL_VALID, CHECK_IS_ADMIN } from "../types/apiConst";
import axios from "axios";

/**
 * 
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
 * 
 */
const APIgetMyAccount = () => {
  return axios.get(CHECK_STILL_VALID, {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") }
  });
};

/**
 * 
 */
const ApiIsAdmin = () => {
  return axios.get(CHECK_IS_ADMIN, {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") }
  });
}

export { APIlogin, APIgetMyAccount, ApiIsAdmin };
