import axios from 'axios'
import { GET_GROUP_BY_ID, GET_ALL_SESSION_TYPES } from '../types/apiConst'

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
    return axios.get(GET_ALL_SESSION_TYPES, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    })
}


export {APIgetSession, APIgetSessionTypes}