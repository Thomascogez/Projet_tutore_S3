
const PATH_API = "http://localhost:8000";

const PASSWORD_FORGET_GET = PATH_API + "/api/users/passwordReset";
const PASSWORD_FORGET_VERIFY = PATH_API + "/api/users/passwordReset";

const LOGIN_CHECK = PATH_API + "/api/login_check";

export {
    PASSWORD_FORGET_GET,
    PASSWORD_FORGET_VERIFY,
    LOGIN_CHECK
};