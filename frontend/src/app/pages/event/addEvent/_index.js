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
import { navigate } from 'hookrouter';

import { FilePond } from "react-filepond";
import Collapse from "../../../components/layouts/Collapse";
import PageLoader from "../../../components/layouts/loader"
import style from "./_addEvent.module.css";
import { APIgetAllEventTypes } from "../../../api/type/event";
import { APIpostFile } from "../../../api/file";
import { APIpostNewEvent } from "../../../api/event";



export default function AddEvent() {
  Moment.locale("fr");
  momentLocalizer();
  const addSession = useSelector(state => state.addSession);


  //TODO: reset AFTER SEND
  //TODO: config file 
  useEffect(() => {
    if( addSession.groups.length === 0) navigate('/seances')
    APIgetAllEventTypes().then(data => {
      setTypes(data.data);
    });
  }, []);

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

  //collapse hooks
  const [collapseType, setCollapseType] = useState(true);
  const [collapseDesc, setCollapseDesc] = useState(false);
  const [collapseDuration, setCollapseDuration] = useState(false);

  const [types, setTypes] = useState([]); //hook that all fetched types

  //loader state
  const [requestPending, setRequestPending] = useState(false);
  const [fileUploadPending, setFileUploadPending] = useState(false);

  /**
   * isValid
   *
   * Check validity of information
   */
  const isValid = () => {
    return (
      newEvent.type !== "" &&
      newEvent.name.trim() !== "" &&
      newEvent.groups.length > 0
    );
  };

  useEffect(() => {
    console.log(newEvent);
    console.log(Moment(newEvent.duration));
  }, [newEvent])
  const handleSelectType = (type) => {
    setNewEvent({ ...newEvent, type: type });
    setCollapseType(false);
    setCollapseDuration(true);
  }

  /**
   * handleAddEvent
   *
   * Handle post of the event and the files
   */
  const handleAddEvent = () => {
    if (isValid) {
      let { sessionID, type, name, duration, dueAt } = newEvent;
      setRequestPending(true);
      APIpostNewEvent(sessionID, name, type, duration[0], dueAt)
        .then(data => {
          setRequestPending(false);
          toast.success("Evénement ajouté");

          let request = [];
          if (files.length > 0) {
            console.log("salut");
            
            setFileUploadPending(true);
            files.forEach(file => {
              request.push(APIpostFile(sessionID, data.data.id, file));
            });
            axios
              .all(request)
              .then(data => {
                toast.success("Fichier(s) ajouté");
                setFileUploadPending(false);
              })
              .catch(err => {
                console.log(err.response);
                
                toast.error("Erreur lors de l'ajout de Fichier(s)");
                setFileUploadPending(false);
              });
          }
        })
        .catch(err => {
          toast.error("Erreur lors de l'ajout de l'événement");
          console.log(err.response);
          
          setRequestPending(false);
        });
    }
  };

  return (
    <>
      <Container fluid className={style.AddEventContainer}>
        <Row>
          <Col  lg="3" sm="12">
            <Card>
              <CardHeader>Résumé de l'événement</CardHeader>
              <CardBody>
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
                {newEvent.type &&<>
                  <h5>Type</h5>
                  <Badge theme="success">{newEvent.type}</Badge>
                  <hr />
                </>}

                <h5>Groupes</h5>
                {addSession.groups.join(", ")}
                <hr />
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
                ) : (
                  "Ajouter événement"
                )}
              </Button>
            </Card>
          </Col>

          <Col className="order-first"  lg="9" sm="12">
            <Card>
              <CardHeader>Ajout d'un événement</CardHeader>
              <CardBody>
                <Collapse
                  open={collapseType}
                  title="Choix du type"
                  toggler={setCollapseType}
                >
                  {types.length > 0 &&
                    types.map(type => (
                      <FormRadio
                        key={type.name}
                        name={type.name}
                        checked={newEvent.type === type.name}
                        onChange={() =>
                          handleSelectType(type.name)
                          
                        }
                      >
                        {type.name}
                      </FormRadio>
                    ))}
                </Collapse>

                <Collapse
                  open={collapseDuration}
                  title="Echéance et durée"
                  toggler={setCollapseDuration}
                >
                  <span className={style.PickTime} style={{ display: "block" }}>
                    <span style={{ fontSize: "20px" }}>
                      Choix de la date d'échéance:({newEvent.dueAt&& Moment(newEvent.dueAt).format("DD/MM/YYYY")})
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
                    <span style={{ fontSize: "20px", marginTop:"10px" }}>
                      Durée de l'événement:({('0' + Math.floor(newEvent.duration[0]) % 24).slice(-2) + 'h' + ((newEvent.duration[0] % 1) * 60 + '0').slice(0, 2)})
                    </span>
                    <Slider
                      onSlide={val =>setNewEvent({...newEvent,duration:val} )}
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
                    placeHolder="Description de l'événement (90 charactéres max.)..."
                  />
                </Collapse>
                <span style={{ fontSize: "25px", marginTop: "30px" }}>
                  Ajout de fichier(s)
                </span>
                <FilePond
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
      {fileUploadPending && <PageLoader message="Ajout des fichier ..." />}
    </>
  );
}
