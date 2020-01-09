import axios from "axios";
import {ALL_EVENT_TYPES, DELETE_EVENT_TYPE, EDIT_EVENT_TYPE} from "../../types/apiConst";

/**
 * Fetch all event type
 */
const APIgetAllEventTypes = () => {
    return axios.get(ALL_EVENT_TYPES, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    })
}
/**
 * Add a new event type
 * @param {json} eventType object that hold information about the new event type
 */
const APIAddEventType = (eventType) => {
    return axios.post(EDIT_EVENT_TYPE, eventType, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    })
};

/**
 * Edit an event type by is id 
 * @param {json} eventType object that old new value
 */
const APIEditEventType = (eventType) => {
    return axios.patch(EDIT_EVENT_TYPE + "/" + eventType.id, eventType, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    })
};

/**
 * Delete an event type from the site
 * @param {json} idEventType   id of the event to delete
 */
const APIDeleteEventType = (idEventType) => {
    return axios.delete(DELETE_EVENT_TYPE + '/' + idEventType, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    })
}

export {
    APIgetAllEventTypes,
    APIAddEventType,
    APIEditEventType,
    APIDeleteEventType
};