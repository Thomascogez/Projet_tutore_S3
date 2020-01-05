import axios from "axios";
import {ALL_EVENT_TYPES, DELETE_EVENT_TYPE, EDIT_EVENT_TYPE} from "../../types/apiConst";


const APIgetAllEventTypes = () => {
    return axios.get(ALL_EVENT_TYPES, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    })
}

const APIAddEventType = (eventType) => {
    return axios.post(EDIT_EVENT_TYPE, eventType, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    })
};


const APIEditEventType = (eventType) => {
    return axios.patch(EDIT_EVENT_TYPE + "/" + eventType.id, eventType, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    })
};

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