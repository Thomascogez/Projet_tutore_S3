import axios from 'axios';
import { GET_ALL_EVENT_TYPES } from '../types/apiConst'

/**
 * APIgetEventTypes
 * 
 * Return all types that can be used for an event
 */
const APIgetEventTypes = () => {
    return axios(GET_ALL_EVENT_TYPES,{
        headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    })
}


export { APIgetEventTypes }