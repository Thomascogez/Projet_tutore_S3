import axios from "axios";
import {ALL_GROUPS, DELETE_GROUP} from "../types/apiConst";


const APIgetAllGroups = (setGroups) => {
    return axios.get(ALL_GROUPS, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    })
}

const APIDeleteGroup = (idGroup) => {
    return axios.delete(DELETE_GROUP + '/' + idGroup, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    })
}


export {
    APIgetAllGroups,
    APIDeleteGroup,
};