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
  ModalFooter, ButtonGroup,
} from "shards-react";
import { Multiselect } from "react-widgets";
import Collapse from "../../../components/layouts/Collapse";
import style from "./addSession.module.css";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Moment from "moment";
import "moment/locale/fr";
import momentLocalizer from "react-widgets-moment";
import DateTimePicker from "react-widgets/lib/DateTimePicker";
import {
  APIgetSessionTypes,
  APIpostNewSession,
  APIgetSession,
  APIpatchSession, APIdelSessionID
} from "../../../api/sessionFetch";
import Loader from "react-loader-spinner";
import {
  setGroup,
  setSession
} from "../../../providers/actions/addSessionActions";
import { navigate } from "hookrouter";
import Unauthorized from "../../401";
import PageLoader from "../../../components/layouts/loader";

/**
 * AddSession
 *
 * Page used to handle the add of sessions
 */
export default function AddSession({ edit, id }) {

  Moment.locale("fr");
  momentLocalizer();

  const INITIAL_STATE = {
    //initial state for session add
    module: "",
    name: "",
    color: "",
    type: "",
    createdAt:"",
    groups: []
  };
  const [newSeance, setNewSeance] = useState(INITIAL_STATE);
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
  const [collapseDate, setCollapseDate] = useState(false)
  const [modal, setModal] = useState(false);
  const [newId, setNewId] = useState(0);

  const [loading, setLoading] = useState(false);

  /**
   * fetchSession
   *
   * Get information about a session (edit mod only)
   */
  const fetchSession = () => {
    APIgetSession(id.sessionID).then(data => {
      //using new seance to store modified data
      setNewSeance({
        //setting by default data fetch from the session
        module: data.data.module.code,
        name: data.data.module.name,
        color: data.data.module.color,
        type: data.data.type,
        createdAt:data.data.createdAt,
        groups: data.data.groups.map(group => group.name)
      });
    });
  };

  const deleteSession = () => {
    setLoading(true)
    APIdelSessionID(id.sessionID)
        .then(data => {
          setLoading(false);
          toast.success("Séance supprimée !");
          navigate('/seances');
        })
  }

  /**
   * handleSelectModule
   *
   * update newSeance hook when a module is selected
   * @param {*} module  selected module
   * @param {*} name    name of it (only for display)
   * @param {*} color   color if it (only for display)
   */
  const handleSelectModule = (module, name, color) => {
    setNewSeance({ ...newSeance, module, name, color });

    setcollapseSelectModule(false);

    APIgetSessionTypes() //fetching session types
      .then(data => {
        setTypes(data.data.map(type => type.name));
        setcollapseTypeModule(true);
      })
      .catch(err => console.log(err));
  };

  const handleSetType = type => {
    setNewSeance({ ...newSeance, type });
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
    setNewSeance(INITIAL_STATE);
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
        newSeance.groups,
        newSeance.createdAt
    
      )
        .then(() => {
          reset();
          toast.success("Séance modifiée avec succès");
          navigate(`/seances/${id.sessionID}`)
          setRequestPending(false);
          fetchSession();
        })
        .catch(err => {
          setRequestPending(false);
          if(err.response.status === 401) {
            toast.error("Vous n'êtes pas autorisé à poster une séance à cette date.")
          }
        });
    } else {
      APIpostNewSession(newSeance.module, newSeance.type, newSeance.groups, newSeance.createdAt)
        .then(data => {
          setNewId(data.data.id);
          reset();
          dispatch(setSession(data.data));
          dispatch(setGroup(newSeance.groups));
          setRequestPending(false);
          toast.success("Séance(s) ajoutée(s) avec succès");
          setModal(true);
        })
        .catch(err => {
          setRequestPending(false)
          if(err.response.status === 401) {
            toast.error("Vous n'êtes pas autorisé à poster une séance à cette date.")
          }
        });
    }
  };

  return (
      <>
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

                        <ButtonGroup>
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
                                "Modifier la séance"
                            ) : (
                                "Ajouter la séance"
                            )}
                          </Button>
                          {edit &&(
                              <Button theme="danger" onClick={() => deleteSession()}>
                                Supprimer
                              </Button>
                          )}
                        </ButtonGroup>

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
                        title="Date (optionnel)"
                        open={collapseDate}
                        toggler={setCollapseDate}
                      >
                        <span className={style.PickTime} style={{ display: "block" }}>
                          <span style={{ fontSize: "20px" }}>
                            Choix de la date d'échéance: {newSeance.createdAt &&`(${Moment(newSeance.createdAt).format("DD/MM/YYYY")})`}
                          </span>
                          <DateTimePicker
                            onChange={value =>
                              setNewSeance({ ...newSeance, createdAt: value })
                            }
                            format="DD/MM/YYYY"
                            culture="fr"
                            time={false}
                          />
                        </span>
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
                                    setNewSeance({ ...newSeance, groups: value })
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
                  <Button theme="danger" onClick={() => navigate(`/seances/${newId}`)}>Non</Button>

                </ModalFooter>
              </Modal>
            </>
        )}
      </Container>
        {loading && <PageLoader /> }
      </>
  );
}
