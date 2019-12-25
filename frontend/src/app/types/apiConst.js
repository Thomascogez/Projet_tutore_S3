
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

// --------------------   TEST  ---------------------- //
const CHECK_IS_ADMIN = PATH_API + "/api/users/isAdmin";


const GET_GROUP_BY_ID = PATH_API + "/api/sessions"

export {
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
    DELETE_MODULES
};