import axios from "axios";
import {EDIT_SETTINGS, GET_ALL_EVENT_TYPES, GET_ALL_SETTING} from "../types/apiConst";


const APIGetSettings = () => {
    return axios.get(GET_ALL_SETTING, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    });
}

const APIEditSettings = (setting) => {
    return axios.patch(EDIT_SETTINGS, setting, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    });
}

export { APIEditSettings, APIGetSettings }