import React, { useState, useEffect } from "react";
import {
  Container,
  Card,
  CardHeader,
  CardBody,
  Col,
  Row,
  Badge,
  FormRadio,
  FormTextarea,
  Button,
  Slider
} from "shards-react";
import Moment from "moment";
import "moment/locale/fr";
import momentLocalizer from "react-widgets-moment";
import DateTimePicker from "react-widgets/lib/DateTimePicker";
import Loader from "react-loader-spinner";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { navigate } from "hookrouter";
import File from "../../../components/view_event_components/File";
import { FilePond } from "react-filepond";
import Collapse from "../../../components/layouts/Collapse";
import PageLoader from "../../../components/layouts/loader";
import style from "./_addEvent.module.css";
import { APIgetAllEventTypes } from "../../../api/type/event";
import { APIpostFile, APIdeleteFile } from "../../../api/file";
import {
  APIpostNewEvent,
  APIgetEventsByID,
  APIpatchEvent
} from "../../../api/event";
import { APIgetsettings } from "../../../api/settings";
import { FaTrash } from "react-icons/fa";
import FileTableLoader from "../../../components/loader/FileTableLoader";
import RadioLoader from "../../../components/loader/RadioLoader";

export default function AddEvent({ edit, eventID }) {
  //configure date to local for the datePicker
  Moment.locale("fr");
  momentLocalizer();

  //redux stuff
  const addSession = useSelector(state => state.addSession);
  const user = useSelector(state => state.user);

  const INITIAL_STATE = {
    sessionID: addSession.sessions.id,
    groups: addSession.groups,
    type: "",
    name: "",
    duration: [0.0],
    dueAt: ""
  };

  const [newEvent, setNewEvent] = useState(INITIAL_STATE);
  const [files, setFiles] = useState([]);

  const [fetchedFile, setFetchedFile] = useState([]); //edit mode only

  //collapse hooks
  const [collapseType, setCollapseType] = useState(true);
  const [collapseDesc, setCollapseDesc] = useState(false);
  const [collapseDuration, setCollapseDuration] = useState(false);

  const [isTeacher, setIsTeacher] = useState(false);

  const [types, setTypes] = useState([]); //hook that all fetched types
  const [settings, setSettings] = useState({
    maxEventSession: "",
    maxAttachmentEvent: ""
  });

  //loader state
  const [requestPending, setRequestPending] = useState(false);
  const [fileUploadPending, setFileUploadPending] = useState(false);

  useEffect(() => {
    APIgetsettings().then(data => {
      setSettings(data.data);
    });
    APIgetAllEventTypes().then(data => {
      setTypes(data.data);
    });
    if (!edit) {
      // called only if not in edit mod
      if (addSession.groups.length === 0) navigate("/seances");
    } else {
      fetchSession();
    }
  }, []);

  useEffect(() => {
    setIsTeacher(user.user.roles.includes("ROLE_TEACHER"));
  }, [user]);

  /**
   * fetchSession
   *
   * Fetch the session with the id take from query param (edit only)
   */
  const fetchSession = () => {
    APIgetEventsByID(eventID.eventID).then(data => {
      console.log(data.data);

      setNewEvent({
        eventID: data.data.id,
        sessionID: data.data.session.id,
        type: data.data.type,
        name: data.data.name,
        duration: [data.data.duration],
        dueAt: data.data.dueAt
      });
      setFetchedFile(data.data.attachmentEvents);
    });
  };

  /**
   * resetInformations
   *
   * Reset page informations
   */
  const resetInformations = () => {
    setNewEvent(INITIAL_STATE);
    setFiles([]);
    setCollapseType(true);
    setCollapseDuration(false);
    setCollapseDesc(false);
  };

  /**
   * isValid
   *
   * Check validity of informations
   */
  const isValid = () => {
    if (!edit) {
      return (
        newEvent.type !== "" &&
        newEvent.name.trim() !== "" &&
        newEvent.groups.length > 0
      );
    }
    return newEvent.type !== "" && newEvent.name.trim() !== "";
  };

  /**
   * handleSelectType
   *
   * Update hook and page when type is updated
   * @param {*} type
   */
  const handleSelectType = type => {
    setNewEvent({ ...newEvent, type: type });
    setCollapseType(false);
    setCollapseDesc(true);
  };

  /**
   *
   * @param {*} idSession
   * @param {*} idEvent
   */
  const handlePostFiles = (idSession, idEvent) => {
    let request = [];
    if (files.length > 0) {
      setFileUploadPending(true);
      files.forEach(file => {
        request.push(APIpostFile(idSession, idEvent, file));
      });
      axios
        .all(request)
        .then(() => {
          resetInformations();
          fetchSession();
          toast.success("Fichier(s) ajouté");
          setFileUploadPending(false);
        })
        .catch(err => {
          resetInformations();
          console.log(err.response);
          toast.error("Erreur lors de l'ajout de Fichier(s)");
          setFileUploadPending(false);
        });
    }
  };

  /**

   * @param {*} fileID  id of the file to delete
   */
  const handleFileDelete = fileID => {
    //edit mode only
    if (edit) {
      let { sessionID, eventID } = newEvent;
      APIdeleteFile(sessionID, eventID, fileID)
        .then(data => {
          toast.success("Fichier supprimé");
          fetchSession();
        })
        .catch(err => console.log(err));
    }
  };

  /**
   * handleAddEvent
   *
   * Handle post of the event and the files
   */
  const handleAddEvent = () => {
    if (isValid) {
      let { sessionID, type, name, duration, dueAt } = newEvent;
      setRequestPending(true);

      if (!edit) {
        APIpostNewEvent(sessionID, name, type, duration[0], dueAt)
          .then(data => {
            setRequestPending(false);
            toast.success("Evénement ajouté");

            handlePostFiles(sessionID, data.data.id);
          })
          .catch(err => {
            toast.error("Erreur lors de l'ajout de l'événement");
            console.log(err.response);
            setRequestPending(false);
          });
      } else {
        handlePostFiles(sessionID, newEvent.eventID);
        APIpatchEvent(
          sessionID,
          newEvent.eventID,
          name,
          type,
          duration[0],
          dueAt
        )
          .then(data => {
            setRequestPending(false);
            console.log(data);
          })
          .catch(err => {
            setRequestPending(false);
            console.log(err.response);
          });
      }
    } else {
      toast.error("Informations de l'événement non valides");
    }
  };

  return (
    <>
      <Container fluid className={style.AddEventContainer}>
        <Row>
          <Col lg="3" sm="12">
            <Card>
              <CardHeader>Résumé de l'événement</CardHeader>
              <CardBody>
                {!edit && (
                  <>
                    {" "}
                    <h5>Module</h5>
                    <Badge
                      className={style.Module}
                      style={{
                        backgroundColor:
                          addSession.sessions.module &&
                          addSession.sessions.module.color
                      }}
                    >
                      {addSession.sessions.module &&
                        addSession.sessions.module.name}
                    </Badge>
                    <hr />
                  </>
                )}

                {newEvent.type && (
                  <>
                    <h5>Type</h5>
                    <Badge theme="success">{newEvent.type}</Badge>
                    <hr />
                  </>
                )}

                {!edit && (
                  <>
                    <h5>Groupes</h5>
                    <>{addSession.groups.join(", ")})</>
                    <hr />
                  </>
                )}
              </CardBody>
              <Button
                onClick={() => handleAddEvent()}
                disabled={!isValid() || requestPending}
                style={{ width: "100%" }}
                theme="success"
              >
                {requestPending ? (
                  <Loader
                    type="ThreeDots"
                    color="#FFF"
                    height={30}
                    width={100}
                  />
                ) : edit ? (
                  "Modifier l'événement"
                ) : (
                  "Ajout d'un événement"
                )}
              </Button>
            </Card>
          </Col>

          <Col className="order-first" lg="9" sm="12">
            <Card>
              <CardHeader>
                {edit ? "Modification d'un événement" : "Ajout d'un événement"}
              </CardHeader>
              <CardBody>
                <Collapse
                  open={collapseType}
                  title={"Choix du type"}
                  toggler={setCollapseType}
                >
                  {types.length > 0 ? (
                    <>
                      {types.map(type => (
                        <>
                          {isTeacher ? (
                            <>
                              {type.roleTypeEvent.teacher&&
                                <FormRadio
                                  key={type.name}
                                  name={type.name}
                                  checked={newEvent.type === type.name}
                                  onChange={() => handleSelectType(type.name)}
                                >
                                  {type.name}
                                </FormRadio>
                              }{" "}
                            </>
                          ) : (
                            <>
                            {type.roleTypeEvent.tutor&&<FormRadio
                              key={type.name}
                              name={type.name}
                              checked={newEvent.type === type.name}
                              onChange={() => handleSelectType(type.name)}
                            >{type.name}</FormRadio>}
                            </>
                          )}
                        </>
                      ))}
                    </>
                  ) : (
                    <>
                      <RadioLoader />
                      <RadioLoader />
                      <RadioLoader />
                      <RadioLoader />
                    </>
                  )}
                </Collapse>

                <Collapse
                  open={collapseDuration}
                  title="Echéance et durée (optionnels)"
                  toggler={setCollapseDuration}
                >
                  <span className={style.PickTime} style={{ display: "block" }}>
                    <span style={{ fontSize: "20px" }}>
                      Choix de la date d'échéance:(
                      {newEvent.dueAt &&
                        Moment(newEvent.dueAt).format("DD/MM/YYYY")}
                      )
                    </span>{" "}
                    <DateTimePicker
                      onChange={value =>
                        setNewEvent({ ...newEvent, dueAt: value })
                      }
                      format="DD/MM/YYYY"
                      culture="fr"
                      time={false}
                    />
                  </span>
                  <span className={style.PickTime} style={{ display: "block" }}>
                    <span style={{ fontSize: "20px", marginTop: "10px" }}>
                      Durée de l'événement:(
                      {("0" + (Math.floor(newEvent.duration[0]) % 24)).slice(
                        -2
                      ) +
                        "h" +
                        ((newEvent.duration[0] % 1) * 60 + "0").slice(0, 2)}
                      )
                    </span>
                    <Slider
                      onSlide={val =>
                        setNewEvent({ ...newEvent, duration: val })
                      }
                      connect={[true, false]}
                      start={newEvent.duration}
                      range={{ min: 0, max: 24 }}
                    />
                  </span>
                </Collapse>

                <Collapse
                  open={collapseDesc}
                  title="Description de l'événement"
                  toggler={setCollapseDesc}
                >
                  <FormTextarea
                    value={newEvent.name}
                    onChange={e =>
                      setNewEvent({ ...newEvent, name: e.target.value })
                    }
                    maxLength="90"
                    placeholder="Description de l'événement (90 charactéres max.)..."
                  />
                </Collapse>
                {edit && (
                  <>
                    <span style={{ fontSize: "25px", marginTop: "30px" }}>
                      Fichier(s) disponible
                    </span>
                    <table
                      style={{ width: "100%", minWidth: "100%" }}
                      className="table"
                    >
                      <thead>
                        <tr>
                          <th>Nom</th>
                          <th>Type</th>
                          <th>Taille</th>
                          <th>Téléchargements</th>
                        </tr>
                      </thead>
                      <tbody>
                        {fetchedFile.length !== 0 ? (
                          fetchedFile.map(file => (
                            <File key={file.id} file={file}>
                              <td>
                                <FaTrash
                                  onClick={() => handleFileDelete(file.id)}
                                  style={{ color: "red", cursor: "pointer" }}
                                />
                              </td>
                            </File>
                          ))
                        ) : (
                          <>
                            <FileTableLoader />
                          </>
                        )}
                      </tbody>
                    </table>
                  </>
                )}
                <span style={{ fontSize: "25px", marginTop: "30px" }}>
                  Ajout de fichier(s)
                  <span style={{ fontSize: "15px" }}>
                    (maximum :{" "}
                    {settings.maxAttachmentEvent - fetchedFile.length})
                  </span>
                </span>
                <FilePond
                  files={files}
                  maxFiles={settings.maxAttachmentEvent - fetchedFile.length}
                  style={{ height: "200px" }}
                  allowMultiple={true}
                  onupdatefiles={fileItems => {
                    setFiles(fileItems.map(fileItem => fileItem.file));
                  }}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
      {fileUploadPending && <PageLoader message="Ajout des fichiers ..." />}
    </>
  );
}
