import axios from 'axios'
import { GET_GROUP_BY_ID } from '../types/apiConst'


const APIgetSession = (sessionID) => {
    return axios.get(GET_GROUP_BY_ID,{sessionID},{
        headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    })
}