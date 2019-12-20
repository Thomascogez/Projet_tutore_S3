import axios from 'axios'
import {PASSWORD_FORGET_VERIFY} from "../types/apiConst";



const ApiPasswordForgetCheck = (req) => {
    return axios.post(PASSWORD_FORGET_VERIFY, req);
}

const ApiPasswordPatch = (req) => {
    return axios.patch(PASSWORD_FORGET_VERIFY, req)
}



export { ApiPasswordForgetCheck, ApiPasswordPatch }