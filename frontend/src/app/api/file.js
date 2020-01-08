import axios from "axios";
import { PATH_API } from "../types/apiConst";
const config = {
  onUploadProgress: function(progressEvent) {
    var percentCompleted = Math.round(
      (progressEvent.loaded * 100) / progressEvent.total
    );
    console.log(percentCompleted);
  }
};

/**
 *
 * @param {*} sessionID
 * @param {*} eventID
 * @param {*} file
 */
const APIpostFile = (sessionID, eventID, file) => {
  let formData = new FormData();
  formData.append("source", file);

  return axios.post(
    `${PATH_API}/api/sessions/${sessionID}/events/${eventID}/attachments`,
    formData,
    {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    },
    config
  );
};

const APIdeleteFile = (sessionID, eventID, fileID) => {
  console.log(sessionID, eventID, fileID);

  return axios.delete(
    `${PATH_API}/api/sessions/${sessionID}/events/${eventID}/attachments/${fileID}`,
    {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    }
  );
};

export { APIpostFile, APIdeleteFile };
