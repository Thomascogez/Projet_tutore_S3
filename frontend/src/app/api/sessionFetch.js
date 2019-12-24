import axios from 'axios'
import { GET_GROUP_BY_ID } from '../types/apiConst'

const CancelToken = axios.CancelToken;
const source = CancelToken.source();

const APIgetSession = (sessionID) => {
    return axios.get(`${GET_GROUP_BY_ID}/${sessionID}`,{
        cancelToken: source.token,
        headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    })
}


export {APIgetSession, source}