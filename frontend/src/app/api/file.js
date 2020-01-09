import axios from "axios";
import { PATH_API } from "../types/apiConst";

/**
 * Post a new file
 * @param {*} sessionID
 * @param {*} eventID
 * @param {File} file
 */
const APIpostFile = (sessionID, eventID, file) => {
  let formData = new FormData();
  formData.append("source", file);

  return axios.post(
    `${PATH_API}/api/sessions/${sessionID}/events/${eventID}/attachments`,
    formData,
    {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    }
  );
};

/**
 * Delete a file from an event
 * @param {*} sessionID
 * @param {*} eventID
 * @param {*} fileID
 */
const APIdeleteFile = (sessionID, eventID, fileID) => {
    return axios.delete(
        `${PATH_API}/api/sessions/${sessionID}/events/${eventID}/attachments/${fileID}`,
        {
            headers: { Authorization: "Bearer " + localStorage.getItem("token") }
        }
    );
};

const APIDownloadFile = (fileID) => {
    console.log(`${PATH_API}/api/attachments/${fileID}`)
    return axios.get(`${PATH_API}/api/attachments/${fileID}`,
        {
            headers: { Authorization: "Bearer " + localStorage.getItem("token") }
        }
    );
};

export { APIpostFile, APIdeleteFile, APIDownloadFile };
