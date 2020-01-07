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
  CardFooter
} from "shards-react";
import { Multiselect } from "react-widgets";
import Moment from 'moment'; 
import 'moment/locale/fr'
import momentLocalizer from 'react-widgets-moment'; 
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import axios from 'axios'
import { useSelector } from 'react-redux'


import { FilePond } from "react-filepond";
import Collapse from "../../../components/layouts/Collapse";

import style from "./_addEvent.module.css";
import { APIgetAllEventTypes } from "../../../api/type/event";
import { APIpostFile } from "../../../api/file";
import { APIpostNewSession } from "../../../api/sessionFetch";
import { APIpostNewEvent } from "../../../api/event";

Moment.locale('fr')
momentLocalizer()


export default function AddEvent() {
  const addSession = useSelector(state => state.addSession)
  
  const INITIAL_STATE = {
    sessionID : addSession.sessions.map(session => session.id),
    type : "",
    name :"",
    duration:"",
    dueAt :""
  }

  const [newEvent, setNewEvent] = useState(INITIAL_STATE)
  

  // console.log(addSession.sessions[0].module);
  
  const [types, setTypes] = useState([]); //hook that all fetched types
 

  useEffect(() => {
       
    //TODO: check if the user as value in the store

    APIgetAllEventTypes().then(data => {
      setTypes(data.data);
    });

   
  }, []);

  //collapse hooks
  const [collapseGroup, setCollapseGroup] = useState(false);
  const [collapseType, setCollapseType] = useState(true);
  const [collapseDesc, setCollapseDesc] = useState(false);
  const [collapseDuration, setCollapseDuration] = useState(false);

  const [selectedGroup, setSelectedGroup] = useState(addSession.sessions);
  const [files, setFiles] = useState([])

  const handleFileUpload = () => {
    console.log(files);
    APIpostFile(3,3,files)
      .then(data => console.log(data))
      .catch(err => console.log(err))
  }

  const handleSelectGroup = (val) => {
    setSelectedGroup(val); 
    setNewEvent({...newEvent, sessionID : val.map(v => v.id)})
  }
  
  const isValid = () => {
    return newEvent.type !== "" && newEvent.name.trim() !== "" && newEvent.sessionID.length > 0
  }

  const handleAddEvent = () => {

    if(isValid) {
      let requests = []
      let {type,name, duration, dueAt} = newEvent
      newEvent.sessionID.forEach(session => {
        requests.push(APIpostNewEvent(session, name, type, duration, dueAt))
      })
      // axios.all(requests)
      //   .then(data => {
      //     if(files.length > 0) {
      //       for (let i = 0; i < newEvent.sessionID.length; i++) {
              
      //       }
      //     }
      //   })


    }
  }


  return (
    <Container fluid className={style.AddEventContainer}>
      <Row>
        <Col lg="3" sm="12">
          <Card>
            <CardHeader>Résumé de l'événement</CardHeader>
            <CardBody>
              <h5>Module</h5>
              <Badge
                className={style.Module}
                style={{ backgroundColor: addSession.sessions.length > 0 && addSession.sessions[0].module.color }}
              >       
                {addSession.sessions.length > 0 && addSession.sessions[0].module.name}
              </Badge>

              <Badge theme="success">{newEvent.type}</Badge>
              <hr />

              <h5>Groupes</h5>          
              {selectedGroup.map((group,i)=> (
                <Badge key={i+""+group.groupe.name} style={{backgroundColor: group.groupe&&group.groupe.color }}> {group.groupe&&group.groupe.name}</Badge>
              ))}
              <hr />

            </CardBody>
            <Button onClick = {() => handleAddEvent()} disabled = {!isValid()} style={{width:"100%"}} theme="success">Ajouter événement</Button>
          </Card>
        </Col>

        <Col lg="9" sm="12">
          <Card>
            <CardHeader>Ajout d'un événement</CardHeader>
            <CardBody>
              <Collapse
                open={collapseGroup}
                title="Choix du / des groupes"
                toggler={setCollapseGroup}
              >
                <Multiselect
                  data={addSession.sessions}
                  defaultValue={selectedGroup}
                  textField="groupname"
                  onChange={val => handleSelectGroup(val)}
                />
              </Collapse>
              <Collapse
                open={collapseType}
                title="Choix du type"
                toggler={setCollapseType}
              >
                {types.length > 0 &&
                  types.map(type => (
                    <FormRadio
                      key = {type.name}
                      name={type.name}
                      checked={newEvent.type === type.name}
                      onChange={() => setNewEvent({...newEvent,type:type.name})}
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
                    Choix de la date d'échéance:{" "}
                  </span>{" "}
                  <DateTimePicker onChange={value => setNewEvent({...newEvent,dueAt:value}) } format='DD/MM/YYYY' culture="fr" time={false}/>
                </span>
                <span className={style.PickTime} style={{ display: "block" }}>
                  <span style={{ fontSize: "20px" }}>
                    Durée de l'événement:
                  </span>
                  <DateTimePicker onChange={value => setNewEvent({...newEvent,duration: Moment.duration(Moment(value).format("hh:mm")).asHours()}) } format='hh:mm' culture="fr" date={false} />
                </span>
              </Collapse>

              <Collapse
                open={collapseDesc}
                title="Description de l'événement"
                toggler={setCollapseDesc}
              >
                <FormTextarea
                  value= {newEvent.name}
                  onChange = {e => setNewEvent({...newEvent, name :e.target.value})}
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
                onupdatefiles={fileItems => {fileItems.map(fileItem => setFiles(fileItem.file))}}
              />
              <Button onClick={() => handleFileUpload()}>Salut</Button>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
