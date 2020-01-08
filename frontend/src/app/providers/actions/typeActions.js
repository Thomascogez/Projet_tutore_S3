import {APIDeleteEventType, APIgetAllEventTypes} from "../../api/type/event";
import {ALL_EVENT_TYPES, ALL_SESSION_TYPES} from "../../types/apiConst";
import {APIDeletesessionType, APIgetAllsessionTypes} from "../../api/type/session";

//Event types actions
const getEventTypes = () => {
    return dispatch => {
        return APIgetAllEventTypes()
            .then(data => {
                dispatch({
                    type: ALL_EVENT_TYPES,
                    value: data.data
                });
            })
    }
}

const removeEventType = (idEventType) => {
    return dispatch => {
        return APIDeleteEventType(idEventType)
            .then(data => {
                dispatch({
                    type: ALL_EVENT_TYPES,
                    value: data.data
                });
            })
    }
}


//Sessions types actions
const getSessionTypes = () => {
    return dispatch => {
        return APIgetAllsessionTypes()
            .then(data => {
                dispatch({
                    type: ALL_SESSION_TYPES,
                    value: data.data
                });
            })
    }
}

const removeSessionType = (idSessionType) => {
    return dispatch => {
        return APIDeletesessionType(idSessionType)
            .then(data => {
                dispatch({
                    type: ALL_SESSION_TYPES,
                    value: data.data
                });
            })
    }
}

export {
    getEventTypes,
    removeEventType,
    getSessionTypes,
    removeSessionType
}