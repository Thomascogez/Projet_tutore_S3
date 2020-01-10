import {GET_ALL_MODULES } from "../../types/actionsTypes";
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
            .catch(err => console.log(err.response))
    }
}



export {
    getModules,
    removeModules, 
    
}