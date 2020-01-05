import axios from "axios";

/**
 * APIgetComment
 *
 * Get all comments from a session
 * @param {*} sessionid id of the session to get comment from
 *
 */
const APIgetComment = sessionid => {
  return axios.get(
    `https://schoolshare.tools/api/sessions/${sessionid}/comments`,
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
const APIpostComment = (sessionid, content) => {
  return axios.post(
    `https://schoolshare.tools/api/sessions/${sessionid}/comments`,content,
    {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    }
  );
};

export { APIgetComment, APIpostComment };
