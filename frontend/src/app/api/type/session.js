import axios from "axios";
import {ALL_SESSION_TYPES, DELETE_SESSION_TYPE, EDIT_SESSION_TYPE} from "../../types/apiConst";


const APIgetAllsessionTypes = () => {
    return axios.get(ALL_SESSION_TYPES, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    })
}

const APIAddsessionType = (sessionType) => {
    return axios.post(EDIT_SESSION_TYPE, sessionType, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    })
};


const APIEditsessionType = (sessionType) => {
    return axios.patch(EDIT_SESSION_TYPE + "/" + sessionType.id, sessionType, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    })
};

const APIDeletesessionType = (idSessionType) => {
    return axios.delete(DELETE_SESSION_TYPE + '/' + idSessionType, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    })
}

export {
    APIgetAllsessionTypes,
    APIAddsessionType,
    APIEditsessionType,
    APIDeletesessionType
};