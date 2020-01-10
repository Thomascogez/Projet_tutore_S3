import axios from 'axios'
import {
    GET_GROUP_BY_ID,
    GET_ALL_SESSION_TYPES,
    GET_ALL_SESSIONS,
    POST_NEW_SESSION,
    GET_MY_SESSION,
    DEL_SESSION_ID,
    PATCH_SESSION,
    EDIT_SEMAPHORE
} from '../types/apiConst'

const CancelToken = axios.CancelToken;
const source = CancelToken.source();

/**
 *  APIgetSession
 * 
 * GET information about a session
 * @param {*} sessionID the session id to get information from
 * 
 */
const APIgetSession = (sessionID) => {
    return axios.get(`${GET_GROUP_BY_ID}/${sessionID}`,{
        cancelToken: source.token,
        headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    })
}

/**
 * APIgetSessionTypes
 * 
 * Return all types for a session
 */
const APIgetSessionTypes = () => {
    return axios.get( GET_ALL_SESSION_TYPES, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    })
}

/**
 * Get all user accessible section
 * @param {*} month 
 * @param {*} year 
 * @param {*} group 
 * @param {*} type 
 */
const APIgetAllSession = (month, year, group, type) => {
    return axios.get( GET_ALL_SESSIONS + "?month=" + month + "&year=" + year + "&group=" + group + "&type=" + type,
        {headers: { Authorization: "Bearer " + localStorage.getItem("token") }}
    );
}
/**
 * Post a new session
 * @param {*} code 
 * @param {*} type 
 * @param {*} groups 
 * @param {*} createdAt 
 */
const APIpostNewSession = (code, type, groups, createdAt ) => {
    let module = code;
    return axios.post(POST_NEW_SESSION,
        {"module":module, "type":type, "groups":groups, "createdAt":createdAt }, 
        {headers: { Authorization: "Bearer " + localStorage.getItem("token") }}
        )
}

/**
 * modify a session
 * @param {*} id 
 * @param {*} code 
 * @param {*} type 
 * @param {*} groups 
 * @param {*} createdAt 
 */
const APIpatchSession = (id, code, type, groups, createdAt ) => {
    let module = code;
    return axios.patch(`${PATCH_SESSION}/${id}`,
        { "module":module, "type":type, "groups":groups, "createdAt":createdAt }, 
        {headers: { Authorization: "Bearer " + localStorage.getItem("token") }}
        )
}

/**
 * get user releated session
 */
const APIgetMySession = () => {
    return axios.get(GET_MY_SESSION,
        {headers: { Authorization: "Bearer " + localStorage.getItem("token") }}
    )
}

/**
 * Delete a session 
 * @param {*} id    id of the session to delete
 */
const APIdelSessionID = (id) => {
    return axios.delete(DEL_SESSION_ID + `/${id}`,
        {headers: {Authorization: "Bearer " + localStorage.getItem("token") }}
    )
}

/**
 * Update session "semaphore"
 * @param {*} id 
 * @param {*} req 
 */
const APIEditSemaphore = (id, req) => {
    return axios.patch(EDIT_SEMAPHORE + `/${id}`, req,
        {headers: { Authorization: "Bearer " + localStorage.getItem("token") }}
    )
}

export { APIgetAllSession, APIEditSemaphore, APIgetSession, APIgetSessionTypes, APIpostNewSession, APIgetMySession, APIdelSessionID, APIpatchSession}