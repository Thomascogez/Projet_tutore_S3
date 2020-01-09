import axios from "axios";
import {ALL_SESSION_TYPES, DELETE_SESSION_TYPE, EDIT_SESSION_TYPE} from "../../types/apiConst";


/**
 * Get all types from a session
 */
const APIgetAllsessionTypes = () => {
    return axios.get(ALL_SESSION_TYPES, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    })
}
/**
 * Add a new session type
 * @param {*} sessionType   object that old new session type 
 */
const APIAddsessionType = (sessionType) => {
    return axios.post(EDIT_SESSION_TYPE, sessionType, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    })
};

/**
 * edit a type of a session
 * @param {*} sessionType object that old new information
 */
const APIEditsessionType = (sessionType) => {
    return axios.patch(EDIT_SESSION_TYPE + "/" + sessionType.id, sessionType, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    })
};
/**
 * Delete a type of session by is ID
 * @param {*} idSessionType id of the session 
 */
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