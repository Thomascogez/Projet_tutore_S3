import {APIDeleteGroup, APIgetAllGroups} from "../../api/groups";
import {GET_ALL_GROUPS} from "../../types/actionsTypes";


const getGroups = () => {
    return dispatch => {
        return APIgetAllGroups()
            .then(data => {
                dispatch({
                    type: GET_ALL_GROUPS,
                    value: data.data
                });
            })
    }
}

const removeGroups = (idGroup) => {
    return dispatch => {
        return APIDeleteGroup(idGroup)
            .then(() => {
                dispatch(getGroups())
            })
    }
}

export {
    getGroups,
    removeGroups
}