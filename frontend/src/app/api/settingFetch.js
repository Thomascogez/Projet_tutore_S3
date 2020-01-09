import axios from "axios";
import {EDIT_SETTINGS, GET_ALL_SETTING} from "../types/apiConst";


/**
 * Get global setting of the website
 */
const APIGetSettings = () => {
    return axios.get(GET_ALL_SETTING, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    });
}


/**
 * Edit global settings of the website
 * @param {*} setting new Settings
 */
const APIEditSettings = (setting) => {
    return axios.patch(EDIT_SETTINGS, setting, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    });
}

export { APIEditSettings, APIGetSettings }