import axios from "axios";
import { ALL_MODULES, DELETE_MODULES, EDIT_MODULES, GET_MODULE } from "../types/apiConst";


/**
 * Get all module
 */
const APIgetAllModule = () => {
    return axios.get(ALL_MODULES, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    })
}

/**
 * Add a new module
 * @param {json} module module information
 */
const APIAddModule = (module) => {
    return axios.post(EDIT_MODULES, module, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    })
};

/**
 * Edit a module by is id
 * @param {json} module 
 */
const APIEditModule = (module) => {
    return axios.patch(EDIT_MODULES + "/" + module.id, module, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    })
};

/**
 * Delete a module by is id
 * @param {*} idModule 
 */
const APIDeleteModule = (idModule) => {
    return axios.delete(DELETE_MODULES + '/' + idModule, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    })
}

/**
 * Get information about a module
 * @param {*} moduleID 
 */
const APIgetModuleInfo = (moduleID) => {
  
    return axios.get(GET_MODULE+"/"+moduleID, {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    });
  };


export {
    APIgetAllModule,
    APIDeleteModule,
    APIEditModule,
    APIAddModule,
    APIgetModuleInfo
};