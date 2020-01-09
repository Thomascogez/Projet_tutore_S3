import axios from "axios";
import {
  GET_ALL_EVENT_TYPES,
  ALL_USER_EVENT,
  PATH_API
} from "../types/apiConst";

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

/**
 * APIgetMyEvents
 *
 * Fetch all event related to the current user
 */
const APIgetMyEvents = () => {
  return axios(ALL_USER_EVENT, {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") }
  });
};

/**
 * APIgetEventsByID
 *
 * Get event info by is id
 * @param {*} eventID id of the event
 */
const APIgetEventsByID = eventID => {
  return axios.get(`${PATH_API}/api/events/${eventID}`, {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") }
  });
};

/**
 * APIpatchEvent
 *
 * Modify an event
 * @param {*} sessionID
 * @param {*} eventID
 * @param {*} name
 * @param {*} type
 * @param {*} duration
 * @param {*} dueAt
 */
const APIpatchEvent = (
  sessionID,
  eventID,
  name,
  type,
  duration = "",
  dueAt = ""
) => {
  let req = {};
  if (
    name !== null ||
    type !== null ||
    type !== null ||
    duration !== null ||
    dueAt !== null
  )
    req = { name: name, type: type, duration: duration, dueAt: dueAt };
  return axios.patch(
    `${PATH_API}/api/sessions/${sessionID}/events/${eventID}`,
    req,
    { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }
  );
};

/**
 * APIpostNewEvent
 *
 * Post a new event
 * @param {*} sessionID
 * @param {*} name
 * @param {*} type
 * @param {*} duration
 * @param {*} dueAt
 */
const APIpostNewEvent = (sessionID, name, type, duration = "", dueAt = "") => {
  console.log(sessionID, name, type, duration, dueAt);
  return axios.post(
    `${PATH_API}/api/sessions/${sessionID}/events`,
    { name: name, type: type, duration: duration, dueAt: dueAt },
    { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }
  );
};

export {
  APIgetEventTypes,
  APIgetMyEvents,
  APIpostNewEvent,
  APIgetEventsByID,
  APIpatchEvent
};
