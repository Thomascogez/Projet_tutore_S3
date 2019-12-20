/**
 * All Api routes goes here
 */


const PATH_API = "https://schoolshare.tools";

// --------------------   PASSWORD FORGET  ---------------------- //
const PASSWORD_FORGET_GET = PATH_API + "/api/users/passwordReset";
const PASSWORD_FORGET_VERIFY = PATH_API + "/api/users/passwordReset";
const CHECK_STILL_VALID = PATH_API + "/api/users/my";

// --------------------   USER LOGIN  ---------------------- //
const LOGIN_CHECK = PATH_API + "/api/login_check";

// -------------------- ADMIN  -------------------------//
const ALL_GROUPS = PATH_API + "/api/groups";

// --------------------   TEST  ---------------------- //
const CHECK_IS_ADMIN = PATH_API + "/api/users/isAdmin";

export {
    PASSWORD_FORGET_GET,
    PASSWORD_FORGET_VERIFY,
    CHECK_STILL_VALID,
    LOGIN_CHECK, 
    CHECK_IS_ADMIN,
    ALL_GROUPS
};