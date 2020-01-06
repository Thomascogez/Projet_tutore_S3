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
  Button
} from "shards-react";
import { Multiselect } from "react-widgets";
import Moment from 'moment'; 
import 'moment/locale/fr'
import momentLocalizer from 'react-widgets-moment'; 
import DateTimePicker from 'react-widgets/lib/DateTimePicker';


import { FilePond } from "react-filepond";
import Collapse from "../../../components/layouts/Collapse";

import style from "./_addEvent.module.css";
import { APIgetAllEventTypes } from "../../../api/type/event";
import { APIgetAllsessionTypes } from "../../../api/type/session";
import { APIpostFile } from "../../../api/file";

Moment.locale('fr')
momentLocalizer()


export default function AddEvent() {
  
  let testObj = {
    module: {
      module: "M3104a",
      name: "Prog web (PHP)",
      color: "#D1AFDD"
    },
    type: "TP",
    groups: ["F1", "F2", "H2"]
  };

  let testGroups = [
    { id: "1", name: "H2" },
    { id: "2", name: "H3" },
    { id: "3", name: "H4" }
  ];

  const [types, setTypes] = useState([]); //hook that all fetched types


 

  useEffect(() => {
   
    
    //TODO: check if the user as value in the store

    APIgetAllEventTypes().then(data => {
      setTypes(data.data);
    });

    APIgetAllsessionTypes()
      .then(data => console.log('data.data: ', data.data))
      
  }, []);

  //collapse hooks
  const [collapseGroup, setCollapseGroup] = useState(false);
  const [collapseType, setCollapseType] = useState(true);
  const [collapseDesc, setCollapseDesc] = useState(false);
  const [collapseDuration, setCollapseDuration] = useState(false);

  const [selectedGroup, setSelectedGroup] = useState([]);
  const [files, setFiles] = useState({})

  const handleFileUpload = () => {
    console.log(files);
    APIpostFile(3,3,files)
      .then(data => console.log(data))
      .catch(err => console.log(err))
  }

  const [selectedType, setSelectedType] = useState("");

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
                style={{ backgroundColor: testObj.module.color }}
              >
                {testObj.module.name}
              </Badge>

              <Badge theme="success">{testObj.type}</Badge>

              <hr />
              <h5>Groupes</h5>
              {testObj.groups.join(", ")}
              <hr />
              <Button theme="success">Ajouter événement</Button>
            </CardBody>
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
                  data={testGroups}
                  defaultValue={testGroups.map(group => group.id)}
                  valueField="id"
                  textField="name"
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
                      name={type.name}
                      checked={selectedType === type.name}
                      onChange={() => setSelectedType(type.name)}
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
                  <DateTimePicker format='DD/MM/YYYY' culture="fr" time={false}/>
                </span>
                <span className={style.PickTime} style={{ display: "block" }}>
                  <span style={{ fontSize: "20px" }}>
                    Durée de l'événement:
                  </span>
                  <DateTimePicker culture="fr" date={false} />
                </span>
              </Collapse>

              <Collapse
                open={collapseDesc}
                title="Description de l'événement"
                toggler={setCollapseDesc}
              >
                <FormTextarea
                  maxLength="120"
                  placeHolder="Description de l'événement (120 charactéres max.)..."
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
