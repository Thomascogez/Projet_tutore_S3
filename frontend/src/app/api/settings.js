import axios from 'axios'
import { GET_SETTINGS } from '../types/apiConst'


const APIgetsettings = () => {
    return axios(GET_SETTINGS, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") }

    })
}



export {APIgetsettings}