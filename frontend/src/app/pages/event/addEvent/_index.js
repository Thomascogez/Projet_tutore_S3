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
import { APIpostNewEvent } from "../../../api/event";

Moment.locale('fr')
momentLocalizer()


export default function AddEvent() {
  const addSession = useSelector(state => state.addSession)
  
  const INITIAL_STATE = {
    sessionID : addSession.sessions.id,
    groups : addSession.groups,
    type : "",
    name :"",
    duration:"",
    dueAt :""
  }

  const [newEvent, setNewEvent] = useState(INITIAL_STATE)
  
  useEffect(() => {
    console.log(newEvent);
  }, [newEvent])


   
  const [types, setTypes] = useState([]); //hook that all fetched types
 

  useEffect(() => {
       
    //TODO: check if the user as value in the store

    APIgetAllEventTypes().then(data => {
      setTypes(data.data);
    });

   
  }, []);

  //collapse hooks
  const [collapseType, setCollapseType] = useState(true);
  const [collapseDesc, setCollapseDesc] = useState(false);
  const [collapseDuration, setCollapseDuration] = useState(false);
  const [files, setFiles] = useState([])


  const handleFileUpload = () => {
    console.log(files);
    
  }
   


  
  const isValid = () => {
    return newEvent.type !== "" && newEvent.name.trim() !== "" && newEvent.groups.length > 0
  }

  const handleAddEvent = () => {

    if(isValid) {
      let { sessionID, type, name, duration, dueAt } = newEvent
      
       APIpostNewEvent(sessionID, name, type, duration, dueAt)
        .then(data =>{
          let request = []
          
          files.forEach(file => {
            console.log(data.data.id);
            
            request.push(APIpostFile(sessionID,data.data.id,file))
          })

          axios.all(request)
            .then(data => console.log(data))
         })
        .catch(err => console.log(err))
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
                style={{ backgroundColor: addSession.sessions.module && addSession.sessions.module.color }}
              >       
                {addSession.sessions.module && addSession.sessions.module.name}
              </Badge>

              <Badge theme="success">{newEvent.type}</Badge>
              <hr />

              <h5>Groupes</h5>          
              {addSession.groups.join(", ")}
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
                onupdatefiles={fileItems => {setFiles(fileItems.map(fileItem => fileItem.file))}}
              />
              <Button onClick={() => handleFileUpload()}>Salut</Button>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
