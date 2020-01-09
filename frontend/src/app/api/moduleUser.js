import axios from "axios";
import { PATH_API } from "../types/apiConst";

/**
 * Get all module of the current logged user
 * @param {*} userID 
 */
const APIgetAlluserModule = userID => {
  console.log(userID);
  return axios.get(`${PATH_API}/api/users/${userID}/modules`, {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") }
  });
};

export { APIgetAlluserModule };
