/**
 * All actions types goes here 
 */


 //user Actions
const SET_ISLOGGEDIN        = "SET_ISLOGGEDIN" ;
const LOGOUT                = "LOGOUT" ;

const SET_USER              = "SET_USER";
const RESET_INVALID_MESSAGE = "RESET_INVALID_MESSAGE";
const GET_ALL_USERS         = "GET_ALL_USERS";
const SET_PROFILE_COLOR     = "SET_PROFILE_COLOR";
const SET_USER_PROFILE      = "SET_USER_PROFILE"

//Group actions
const GET_ALL_GROUPS        = "GET_ALL_GROUPS";

//module actions
const GET_ALL_MODULES        = "GET_ALL_MODULES";



//add session

const SET_SESSIONADD            = "SET_SESSIONADD" ;
const SET_GROUP_SET_SESSIONADD  = "SET_GROUP_SET_SESSIONADD";


export {
    SET_ISLOGGEDIN,
    SET_USER,
    RESET_INVALID_MESSAGE,
    GET_ALL_GROUPS,
    GET_ALL_MODULES,
    GET_ALL_USERS,
    SET_SESSIONADD,
    SET_GROUP_SET_SESSIONADD,
    SET_PROFILE_COLOR,
    SET_USER_PROFILE,
    LOGOUT
    
}