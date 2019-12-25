import axios from "axios";
import {ALL_GROUPS, DELETE_GROUP, EDIT_GROUPS} from "../types/apiConst";


const APIgetAllGroups = (setGroups) => {
    return axios.get(ALL_GROUPS, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    })
}

const APIAddGroup = (group) => {
    return axios.post(EDIT_GROUPS, group, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    })
};


const APIEditGroup = (group) => {
    return axios.patch(EDIT_GROUPS + "/" + group.id, group, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    })
};

const APIDeleteGroup = (idGroup) => {
    return axios.delete(DELETE_GROUP + '/' + idGroup, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    })
}

export {
    APIgetAllGroups,
    APIDeleteGroup,
    APIEditGroup,
    APIAddGroup
};