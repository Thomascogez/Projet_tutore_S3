import React, { useState } from "react";
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
  Modal,  
  ModalHeader,
  ModalFooter
} from "shards-react";
import { Multiselect } from "react-widgets";
import Collapse from "../../../components/layouts/Collapse";
import style from "./_addsession.module.css";
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios'
import { toast } from 'react-toastify';
import { APIgetSessionTypes, APIpostNewSession } from "../../../api/sessionFetch";
import Loader from 'react-loader-spinner'
import { addSession, setSessionType } from '../../../providers/actions/addSessionActions'


/**
 * AddSession
 *
 * Page used to handle the add of sessions
 */
export default function AddSession() {

  const dispatch = useDispatch();

  const user = useSelector(state => state.user);
  
  const INITIAL_STATE = {
    module: "",
    name: "",
    color: "",
    type: "",
    groups: [],
  }
  const [newSeance, setnewSeance] = useState(INITIAL_STATE);



  const [types, setTypes] = useState([]);
  const [collapseSelectModule, setcollapseSelectModule] = useState(true);
  const [collapseTypeModule, setcollapseTypeModule] = useState(false);
  const [collapseGroups, setcollapseGroups] = useState(false);
  const [requestPending, setRequestPending] = useState(false)
  const [modal, setModal] = useState(false)

  /**
   * handleSelectModule
   *
   * update newSeance hook when a module is selected
   * @param {*} module  selected module
   * @param {*} name    name of it (only for display)
   * @param {*} color   color if it (only for display)
   */
  const handleSelectModule = (module, name, color) => {
    setnewSeance({ ...newSeance, module, name, color });

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

    //update redux store for next step
    dispatch(setSessionType(type))

    setcollapseTypeModule(false);
    setcollapseGroups(true);
  };

  const isValid = () => {
    return newSeance.module !== "" && newSeance.type !== "" && newSeance.groups.length > 0
  }

  /**
   * postSession
   * 
   * Handle the post of one or multiple sessions
   */
  const postSession = () => {

    let requests = [];

    setRequestPending(true);
    (newSeance.groups).forEach(group => {
      requests.push(APIpostNewSession(newSeance.module, newSeance.type, group))
    });

    axios.all(requests)
      .then((data) => {
        data.forEach(seance => {

          //get info of new session for next step
          dispatch(addSession(seance.data))
        })
        setRequestPending(false);
        toast.success("Séance(s) ajoutée(s) avec succès")
        setnewSeance(INITIAL_STATE)
        setcollapseGroups(false)
        setcollapseTypeModule(false)
        setcollapseSelectModule(true)
        setModal(true)
        
      })
      .catch(() => {
        setRequestPending(false);

      })
  }




  return (
    <Container fluid className={style.AddSessionContainer}>
      <Row>
        {newSeance.module !== "" && (
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

              <Button disabled={!isValid() || requestPending} onClick={() => postSession()}>{requestPending ? <Loader
                type="ThreeDots"
                color="#FFF"
                height={30}
                width={100}
                timeout={3000} //3 secs

              /> : "Ajouter la séances"}</Button>
            </Card>
          </Col>
        )}

        <Col sm="12" lg={newSeance.module !== "" ? 9 : 12}>
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
                      key={module.module}
                      onClick={() =>
                        handleSelectModule(module.code, module.name, module.color)
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
                      setnewSeance({ ...newSeance, groups: value },
                      )
                    }
                    data={user.user.groups.map(group => group.name)}
                  />
                )}
              </Collapse>


            </CardBody>
          </Card>
        </Col>
      </Row>
      <Modal size="lg" open={modal} toggle={() => setModal(!modal)}>
          <ModalHeader>Voulez-vous ajouter des événements maintenant ?</ModalHeader>
          <ModalFooter> <Button theme="success">Oui</Button> <Button theme="danger">Non</Button></ModalFooter>
        </Modal>
    </Container>
    
  );
}
