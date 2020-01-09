import axios from 'axios'
import {PASSWORD_FORGET_VERIFY} from "../types/apiConst";


/**
 * Send a forget password request
 * @param {json} req 
 */
const ApiPasswordForgetCheck = (req) => {
    return axios.post(PASSWORD_FORGET_VERIFY, req);
}

/**
 * Update the password
 * @param {json} req 
 */
const ApiPasswordPatch = (req) => {
    return axios.patch(PASSWORD_FORGET_VERIFY, req)
}



export { ApiPasswordForgetCheck, ApiPasswordPatch }