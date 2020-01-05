/**
 * Reducer that dispatch all user actions
 */
import {
  RESET_INVALID_MESSAGE,
  SET_ISLOGGEDIN,
  SET_USER,
  GET_ALL_USERS
} from "../../types/actionsTypes";

const initialState = {
  user: {
    id: "",
    username: "",
    roles: [],
    firstname: "",
    lastname: "",
    color: "",
    created_at: "",
    update_at: "",
    groups: [],
    modules: []
  },
  allUsers: {},
  loginMessage: false,
  isLoggedIn: false
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ISLOGGEDIN:
      return {
        ...state,
        isLoggedIn: action.value,
        loginMessage: action.error,
        user: action.user||state.user
      };
    case RESET_INVALID_MESSAGE:
      return {
        ...state,
        user: state.user,
        loginMessage: false
      };
    case SET_USER:
      return {
        ...state,
        user: action.value
      };
      case GET_ALL_USERS:
          return {
              ...state,
              allUsers: action.value
          }
    default:
      return initialState;
  }
};

export default userReducer;

