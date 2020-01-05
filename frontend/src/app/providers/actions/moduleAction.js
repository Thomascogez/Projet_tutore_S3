import {GET_ALL_MODULES, SET_MODULE, ADD_EVENT, SET_TYPE } from "../../types/actionsTypes";
import {APIDeleteModule, APIgetAllModule} from "../../api/modules";


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

//add Module 

const setModuleID = (id) => {
    return {
        type:SET_MODULE,
        value: id
    }
}

export {
    getModules,
    removeModules, 
    setModuleID
}