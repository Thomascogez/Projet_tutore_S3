import axios from "axios";
import { PATH_API } from "../types/apiConst";


/**
 * APIgetComment
 *
 * Get all comments from a session
 * @param {*} sessionid id of the session to get comment from
 *
 */
const APIgetComment = sessionid => {
  return axios.get(
      `${PATH_API}/api/sessions/${sessionid}/comments`,
      {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") }
      }
  );
};

/**
 * APIDeleteComment
 *
 * Delete comment
 * @param {*} idComment id of comment
 *
 */
const APIDeleteComment = (sessionid, idComment) => {
  return axios.get(
      `${PATH_API}/api/sessions/${sessionid}/comments/${idComment}`,
      {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") }
      }
  );
};


/**
 * APIpostComment
 * 
 * Post a comment on the session with the specified session id
 * @param {*} sessionid 
 * @param {*} message 
 */
const APIpostComment = (sessionid, comment) => {
  return axios.post(
    `${PATH_API}/api/sessions/${sessionid}/comments`,
    {"comment": comment},
    { headers: { Authorization: "Bearer " + localStorage.getItem("token")} }
  );
};

export { APIgetComment, APIpostComment, APIDeleteComment };
