
/**
 * All Api routes goes here
 */


const PATH_API = "https://schoolshare.tools";

// --------------------   PASSWORD FORGET  ---------------------- //
const PASSWORD_FORGET_GET = PATH_API + "/api/users/passwordReset";
const PASSWORD_FORGET_VERIFY = PATH_API + "/api/users/passwordReset";

const GET_USER_PROFILE = PATH_API + "/api/users/my";

const CHECK_STILL_VALID = PATH_API + "/api/users/my";

// --------------------   USER LOGIN  ---------------------- //
const LOGIN_CHECK = PATH_API + "/api/login_check";

// -------------------- ADMIN  -------------------------//
const ALL_GROUPS   = PATH_API + "/api/groups";
const EDIT_GROUPS  = PATH_API + "/api/groups";
const DELETE_GROUP = PATH_API + "/api/groups";

const ALL_MODULES    = PATH_API + "/api/modules";
const EDIT_MODULES   = PATH_API + "/api/modules";
const DELETE_MODULES = PATH_API + "/api/modules";
const GET_MODULE     = PATH_API + "/api/modules";
// --------------------   Session  ---------------------- //
const GET_ALL_SESSION_TYPES = PATH_API+"/api/session_types";
const POST_NEW_SESSION      = PATH_API+"/api/sessions"
const PATCH_SESSION         = PATH_API+"/api/sessions"

const EDIT_SEMAPHORE        = PATH_API + "/api/semaphore";


const GET_ALL_EVENT_TYPES   = PATH_API+"/api/event_types";

const ALL_EVENT_TYPES   = PATH_API + "/api/event_types";
const EDIT_EVENT_TYPE   = PATH_API + "/api/event_types";
const DELETE_EVENT_TYPE = PATH_API + "/api/event_types";

const ALL_SESSION_TYPES   = PATH_API + "/api/session_types";
const EDIT_SESSION_TYPE   = PATH_API + "/api/session_types";
const DELETE_SESSION_TYPE = PATH_API + "/api/session_types";

const ALL_USERS    = PATH_API + "/api/users";
const EDIT_USERS   = PATH_API + "/api/users";
const DELETE_USERS = PATH_API + "/api/users";
const ADD_USERS    = PATH_API + "/api/users";

const GET_ALL_SETTING = PATH_API + "/api/settings";
const EDIT_SETTINGS   = PATH_API + "/api/settings";


//file upload 
//--------------------- USERS  -----------------------//
const ALL_USER_EVENT = PATH_API + "/api/users/events";
// --------------------  USER --------------------- //

const DEL_SESSION_ID = PATH_API + "/api/sessions";
const GET_MY_SESSION = PATH_API + "/api/users/sessions";
const GET_ALL_SESSIONS = PATH_API + "/api/sessions"


// --------------------   TEST  ---------------------- //
const CHECK_IS_ADMIN = PATH_API + "/api/users/isAdmin";

const GET_GROUP_BY_ID = PATH_API + "/api/sessions";

// --------------------   SETTINGS  ---------------------- //

const GET_SETTINGS    = PATH_API + "/api/settings"


export {
    PATH_API,
    ALL_USERS,
    EDIT_USERS,
    DELETE_USERS,
    ADD_USERS,
    PASSWORD_FORGET_GET,
    PASSWORD_FORGET_VERIFY,
    CHECK_STILL_VALID,
    LOGIN_CHECK,
    CHECK_IS_ADMIN,
    ALL_GROUPS,
    DELETE_GROUP,
    GET_USER_PROFILE,
    GET_GROUP_BY_ID,
    EDIT_GROUPS,
    ALL_MODULES,
    EDIT_MODULES,
    DELETE_MODULES,
    ALL_EVENT_TYPES,
    EDIT_EVENT_TYPE,
    DELETE_EVENT_TYPE,
    ALL_SESSION_TYPES,
    EDIT_SESSION_TYPE,
    DELETE_SESSION_TYPE,
    GET_MODULE,
    GET_ALL_SESSION_TYPES,
    GET_ALL_EVENT_TYPES,
    POST_NEW_SESSION,
    ALL_USER_EVENT,
    GET_MY_SESSION,
    GET_ALL_SESSIONS,
    DEL_SESSION_ID,
    PATCH_SESSION,
    GET_ALL_SETTING,
    EDIT_SETTINGS,
    EDIT_SEMAPHORE,
    GET_SETTINGS
};