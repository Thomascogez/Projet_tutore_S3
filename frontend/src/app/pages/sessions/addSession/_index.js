import React, { useState, useEffect } from "react";
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
  ModalFooter,
} from "shards-react";
import { Multiselect } from "react-widgets";
import Collapse from "../../../components/layouts/Collapse";
import style from "./_addsession.module.css";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  APIgetSessionTypes,
  APIpostNewSession,
  APIgetSession,
  APIpatchSession
} from "../../../api/sessionFetch";
import Loader from "react-loader-spinner";
import {
  setGroup,
  setSession
} from "../../../providers/actions/addSessionActions";
import { navigate } from "hookrouter";
import Unauthorized from "../../401";

/**
 * AddSession
 *
 * Page used to handle the add of sessions
 */
export default function AddSession({ edit, id }) {
  const INITIAL_STATE = {
    //initial state for session add
    module: "",
    name: "",
    color: "",
    type: "",
    groups: []
  };
  const [newSeance, setnewSeance] = useState(INITIAL_STATE);
  const [unauthorized, setUnauthorized] = useState(false);

  //session edition mod only

  useEffect(() => {
    if (edit) {
      APIpatchSession(id.sessionID, null, null, null)
          .catch(err => setUnauthorized(true))
      fetchSession();
    }
  }, []);

  const dispatch = useDispatch();

  const user = useSelector(state => state.user);

  const [types, setTypes] = useState([]);
  const [collapseSelectModule, setcollapseSelectModule] = useState(true);
  const [collapseTypeModule, setcollapseTypeModule] = useState(false);
  const [collapseGroups, setcollapseGroups] = useState(false);
  const [requestPending, setRequestPending] = useState(false);
  const [modal, setModal] = useState(false);
  const [newId, setNewId] = useState(0);

  /**
   * fetchSession
   *
   * Get information about a session (edit mod only)
   */
  const fetchSession = () => {
    APIgetSession(id.sessionID).then(data => {
      //using new seance to store modified data
      setnewSeance({
        //setting by default data fetch from the session
        module: data.data.module.code,
        name: data.data.module.name,
        color: data.data.module.color,
        type: data.data.type,
        groups: data.data.groups.map(group => group.name)
      });
    });
  };

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
    setcollapseTypeModule(false);
    setcollapseGroups(true);
  };

  const isValid = () => {
    return (
      newSeance.module !== "" &&
      newSeance.type !== "" &&
      newSeance.groups.length > 0
    );
  };

  const reset = () => {
    setnewSeance(INITIAL_STATE);
    setcollapseGroups(false);
    setcollapseTypeModule(false);
    setcollapseSelectModule(true);
  };

  /**
   * postSession
   *
   * Handle the post of one or multiple sessions
   */
  const postSession = () => {
    setRequestPending(true);

    if (edit) {
      //if in edit mod send patch request
      APIpatchSession(
        id.sessionID,
        newSeance.module,
        newSeance.type,
        newSeance.groups
      )
        .then(() => {
          reset();
          toast.success("Séance modifiée avec succès");
          navigate(`/seance/${id.sessionID}`)
          setRequestPending(false);
          fetchSession();
        })
        .catch(err => {
          console.log(err.response);

          setRequestPending(false);
        });
    } else {
      APIpostNewSession(newSeance.module, newSeance.type, newSeance.groups)
        .then(data => {
          setNewId(data.data.id);
          reset();
          dispatch(setSession(data.data));
          dispatch(setGroup(newSeance.groups));
          setRequestPending(false);
          toast.success("Séance(s) ajoutée(s) avec succès");
          setModal(true);
        })
        .catch(() => setRequestPending(false));
    }
  };

  return (
    <Container fluid className={style.AddSessionContainer}>
      {unauthorized ? (
          <Unauthorized />
      ) : (
          <>
            <Row>
              {( newSeance.module !== "") || !edit ?
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
                            
                      <Button
                          disabled={!isValid() || requestPending}
                          onClick={() => postSession()}
                      >
                        {requestPending ? (
                            <Loader
                                type="ThreeDots"
                                color="#FFF"
                                height={30}
                                width={100}
                            />
                        ) : edit ? (
                            "Modifier la séances"
                        ) : (
                            "Ajouter la séances"
                        )}
                      </Button>
                    </Card>
                  </Col>
                  :<></>}

              <Col
                  className="order-first"
                  sm="12"
                  lg={newSeance.module !== "" || !edit ? 9 : 12}
              >
                <Card>
                  <CardHeader>
                    {edit
                        ? "Modification de la séance"
                        : "Ajout d'une nouvelle séance"}
                  </CardHeader>
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
                                  handleSelectModule(
                                      module.code,
                                      module.name,
                                      module.color
                                  )
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
                              checked={type === newSeance.type}
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
                              valueField={edit && "name"}
                              textField={edit && "name"}
                              data={user.user.groups.map(group => group.name)}
                          />
                      )}
                    </Collapse>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <Modal size="lg" open={modal} toggle={() => setModal(!modal)}>
              <ModalHeader>
                Voulez-vous ajouter des événements maintenant ?
              </ModalHeader>
              <ModalFooter>
                {" "}
                
                <Button
                    onClick={() => navigate("/seances/evenement/ajout")}
                    theme="success"
                >
                  Oui
                </Button>{" "}
                <Button theme="danger" onClick={() => navigate(`/seance/${newId}`)}>Non</Button>
           
              </ModalFooter>
            </Modal>
          </>
      )}
    </Container>
  );
}
