import axios from "axios";
import {ALL_GROUPS} from "../types/apiConst";


const getAllGroups = (setGroups) => {
    let groups = {};
    axios.get(ALL_GROUPS, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    }).then(data => {
        setGroups(data.data);
    })
}


export {
    getAllGroups,
};