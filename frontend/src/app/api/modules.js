import axios from "axios";
import { ALL_MODULES, DELETE_MODULES, EDIT_MODULES, GET_MODULE } from "../types/apiConst";


const APIgetAllModule = (setModule) => {
    return axios.get(ALL_MODULES, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    })
}

const APIAddModule = (module) => {
    return axios.post(EDIT_MODULES, module, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    })
};


const APIEditModule = (module) => {
    return axios.patch(EDIT_MODULES + "/" + module.id, module, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    })
};

const APIDeleteModule = (idModule) => {
    return axios.delete(DELETE_MODULES + '/' + idModule, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    })
}


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