/**
 * Reducer that dispatch all user actions
 */
import {
  RESET_INVALID_MESSAGE,
  SET_ISLOGGEDIN,
  SET_USER,
  GET_ALL_USERS,
  SET_PROFILE_COLOR,
  SET_USER_PROFILE,
  LOGOUT
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
  loginMessage: false,
  isLoggedIn: false,
  allUsers: {},
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
    case LOGOUT:
      return initialState

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
    case SET_PROFILE_COLOR:
        return {
          ...state,
          user : {...state.user, color: action.value}
        }
    case SET_USER_PROFILE : 
        return {
          ...state,
          user : action.value
        }
      
    default:
      return state;
  }
};

export default userReducer;

