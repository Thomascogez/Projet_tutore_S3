import React, { useState, isValidElement } from "react";
import {
  Container,
  Card,
  CardHeader,
  CardBody,
  Col,
  Row,
  Button,
  FormRadio,
  Badge,
} from "shards-react";
import { Multiselect } from "react-widgets";
import Collapse from "../../../components/layouts/Collapse";
import style from "./_addsession.module.css";
import { useSelector } from "react-redux";

import { APIgetSessionTypes } from "../../../api/sessionFetch";

/**
 * AddSession
 *
 * Page used to handle the add of sessions
 */
export default function AddSession() {
  const user = useSelector(state => state.user);

  const [newSeance, setnewSeance] = useState({
    id: "",
    name: "",
    color: "",
    type: "",
    groups: [],
    events: []
  });


  const [types, setTypes] = useState([]);
  const [collapseSelectModule, setcollapseSelectModule] = useState(true);
  const [collapseTypeModule, setcollapseTypeModule] = useState(false);
  const [collapseGroups, setcollapseGroups] = useState(false);

  /**
   * handleSelectModule
   *
   * update newSeance hook when a module is selected
   * @param {*} id    id of the selected module
   * @param {*} name  name of it (only for display)
   * @param {*} color color if it (only for display)
   */
  const handleSelectModule = (id, name, color) => {
    setnewSeance({ ...newSeance, id, name, color });
    setcollapseSelectModule(false);

    APIgetSessionTypes() //fetching session types
      .then(data => {
        setTypes(data.data.map(type => type.name));
        setcollapseTypeModule(true);
      })
      .catch(err => console.log(err));
  };

  const handleSetType = type => {
    setnewSeance({ ...newSeance, type });
    setcollapseTypeModule(false);
    setcollapseGroups(true);
  };

  const isValid = () => {
    return newSeance.id !== "" && newSeance.type !== "" && newSeance.groups.length > 0
  }


  return (
    <Container fluid className={style.AddSessionContainer}>
      <Row>
        {newSeance.id !== "" && (
          <Col sm="12" lg="3">
            <Card>
              <CardHeader>Résumé</CardHeader>
              <CardBody>
                <h5>Module</h5>
                <Badge
                  className={style.Module}
                  style={{ backgroundColor: newSeance.color }}
                >
                  {newSeance.name}
                </Badge>
                {newSeance.type && (
                  <Badge theme="success">{newSeance.type}</Badge>
                )}
                <hr />
                <h5>Groupes</h5>
                {newSeance.groups && newSeance.groups.join(", ")}
                <hr />
              </CardBody>

              <Button disabled={!isValid()}>Ajouter la séances </Button>
            </Card>
          </Col>
        )}

        <Col sm="12" lg={newSeance.id !== "" ? 9 : 12}>
          <Card>
            <CardHeader>Ajout d'une nouvelle séances</CardHeader>
            <CardBody>
              <Collapse
                title="Choix du module"
                open={collapseSelectModule}
                toggler={setcollapseSelectModule}
              >
                {user.user.modules &&
                  user.user.modules.map(module => (
                    <Badge
                      key={module.id}
                      onClick={() =>
                        handleSelectModule(module.id, module.name, module.color)
                      }
                      className={style.Module}
                      style={{ backgroundColor: module.color }}
                    >
                      {module.name}
                    </Badge>
                  ))}
              </Collapse>

              <Collapse
                title="Choix du type du module"
                open={collapseTypeModule}
                toggler={setcollapseTypeModule}
              >
                {types &&
                  types.map(type => (
                    <FormRadio
                      key={type}
                      name="groupe"
                      onClick={() => handleSetType(type)}
                    >
                      {type}
                    </FormRadio>
                  ))}
              </Collapse>

              <Collapse
                title="Choix du / des groupe(s)"
                open={collapseGroups}
                toggler={setcollapseGroups}
              >
                {user.user.groups && (
                  <Multiselect
                    value={newSeance.groups}
                    onChange={value =>
                      setnewSeance({ ...newSeance, groups: value })
                    }
                    data={user.user.groups.map(group => group.name)}
                  />
                )}
              </Collapse>

             
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
