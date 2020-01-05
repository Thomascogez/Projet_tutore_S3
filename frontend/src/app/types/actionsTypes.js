/**
 * All actions types goes here 
 */


 //user Actions
const SET_ISLOGGEDIN        = "SET_ISLOGGEDIN" ;
const SET_USER              = "SET_USER";
const RESET_INVALID_MESSAGE = "RESET_INVALID_MESSAGE";
const GET_ALL_USERS = "GET_ALL_USERS";

//Group actions
const GET_ALL_GROUPS        = "GET_ALL_GROUPS";

//module actions
const GET_ALL_MODULES        = "GET_ALL_MODULES";



//add module

const SET_MODULE = "SET_MODULE" ;
const SET_TYPE   = "SET_TYPE"   ;
const ADD_EVENT  = "ADD_EVENT"  ;

export {
    SET_ISLOGGEDIN,
    SET_USER,
    RESET_INVALID_MESSAGE,
    GET_ALL_GROUPS,
    GET_ALL_MODULES,
    GET_ALL_USERS
    SET_MODULE,
    SET_TYPE,
    ADD_EVENT
}