import axios from "axios";
import { GET_ALL_EVENT_TYPES, ALL_USER_EVENT, PATH_API } from "../types/apiConst";
import { duration } from "moment";

/**
 * APIgetEventTypes
 *
 * Return all types that can be used for an event
 */
const APIgetEventTypes = () => {
  return axios(GET_ALL_EVENT_TYPES, {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") }
  });
};

const APIgetMyEvents = () => {
  return axios(ALL_USER_EVENT, {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") }
  });
};

const APIgetEventsByID = (eventID) => {
  return axios.get(`${PATH_API}/api/events/${eventID}`, {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") }
  });
};

const APIpatchEvent = (sessionID, eventID, name, type, duration = "", dueAt = "") => {
  console.log(sessionID, eventID, name, type, duration , dueAt);
  return axios.patch(`${PATH_API}/api/sessions/${sessionID}/events/${eventID}`,
    {"name": name, "type":type, "duration":duration, "dueAt":dueAt},
    { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }
  )

  
}

const APIpostNewEvent = (sessionID, name, type, duration = "", dueAt = "") => {
    console.log(sessionID, name, type, duration, dueAt );
  return axios.post(
    `${PATH_API}/api/sessions/${sessionID}/events`,
    { "name": name, "type":type, "duration":duration, "dueAt":dueAt },
    { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }
  );
};

export { APIgetEventTypes, APIgetMyEvents, APIpostNewEvent, APIgetEventsByID, APIpatchEvent };
