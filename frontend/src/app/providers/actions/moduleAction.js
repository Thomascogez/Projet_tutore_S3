import {GET_ALL_GROUPS, GET_ALL_MODULES, SET_ISLOGGEDIN} from "../../types/actionsTypes";
import {APIDeleteModule, APIgetAllModule} from "../../api/modules";
import {login} from "./userActions";


const getModules = () => {
    return dispatch => {
        return APIgetAllModule()
            .then(data => {
                dispatch({
                    type: GET_ALL_MODULES,
                    value: data.data
                });
            })
    }
}

const removeModules = (idModule) => {
    return dispatch => {
        return APIDeleteModule(idModule)
            .then(data => {
                dispatch({
                    type: GET_ALL_MODULES,
                    value: data.data
                });
            })
            .catch(err => console.log(err.response))
    }
}

export {
    getModules,
    removeModules
}