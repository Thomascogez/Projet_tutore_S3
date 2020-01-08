import React, { useState, useEffect } from "react";
import {
    Container,
    Card,
    CardHeader,
    CardBody,
    Col,
    Row,
    FormInput,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    CardTitle,
    Badge,
    ModalBody,
    FormCheckbox,
    FormRadio,
    Button,
} from "shards-react";
import Collapse from "../../../../components/layouts/Collapse";
import style from "./addUser.module.css";
import {APIgetAllGroups} from "../../../../api/groups";
import {APIgetAllModule} from "../../../../api/modules";
import {Multiselect} from "react-widgets";
import Loader from "react-loader-spinner";
import {APIAddUser} from "../../../../api/userFetch";
import {toast} from "react-toastify";
import {navigate} from 'hookrouter'
import {errFetch} from "../../../../utils/errorFetch";

/**
 * AddSession
 *
 * Page used to handle the add of sessions
 */
export default function AddUser({ edit, id }) {

    const INITIAL_STATE = {
        "username": "",
        "firstname": "",
        "lastname": "",
        "modules": [],
        "groups": [],
        "roles": "",
        "admin": false
    }

    const [collapseSelectModule, setcollapseSelectModule] = useState(true);
    const [collapseModule, setcollapseModule] = useState(false);
    const [collapseGroups, setcollapseGroups] = useState(false);
    const [collapseRoles, setcollapseRoles]   = useState(false);
    const [requestPending, setRequestPending] = useState(false)
    const [error, setError] = useState({});


    const [newUser, setNewUser] = useState(INITIAL_STATE);
    const [modules, setModules] = useState({});
    const [groups, setGroups]   = useState({});

    const [moduleTutorat, setModuleTutorat] = useState({});

    useEffect(() => {
        APIgetAllGroups()
            .then(data => setGroups(data.data));
        APIgetAllModule()
            .then(data => { setModules(data.data); data.data.map(module => {if (module.code === "Mtut") setModuleTutorat(module)})});
    }, []);

    const isValid = () => {
        return newUser.username !== "" && newUser.firstname !== "" && newUser.lastname !== "" && newUser.roles !== ""
    };

    const handleAddUser = () => {
        const req = {
            ...newUser,
            "modules": newUser.modules.map(module => module.code),
            "groups": newUser.groups.map(group => group.name),
            "roles": (newUser.admin)?[newUser.roles, "ROLE_ADMIN"]:[newUser.roles]
        }
        delete req.admin;
        console.log(req)
        APIAddUser(req)
            .then(data => {
                toast.success("Utilisateur ajouté, un email lui à été envoyé !");
                navigate("/administration/utilisateurs");
            })
            .catch(err =>
                setError(errFetch(err))
            )
    };

    let TagItem = ({ item }) => (
        <Badge style={{backgroundColor: item.color}}>
            {item.name}
        </Badge>
    );

    let ListItem = ({ item }) => (
        <Badge style={{backgroundColor: item.color}}>
            {item.name}
        </Badge>
    );

    useEffect(() => {
        Object.entries(error).map(m => {
            if(m[1]) toast.error(m[1][0]);
        })
    }, [error])

    return (
        <Container fluid className={style.AddSessionContainer}>
            <Row>
                <Col sm="12" lg="4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Résumé</CardTitle>
                        </CardHeader>
                        <CardBody>
                            <h5>Informations générales</h5>
                            {newUser.username.length  > 0  && (<p style={{marginBottom:" 0px", marginLeft: "10px"}}><span style={{fontWeight: "bold", color: (error.username)?"red":"black"}}>Utilisateur </span>: {newUser.username}</p>)}
                            {newUser.firstname.length > 0  && (<p style={{marginBottom:" 0px", marginLeft: "10px"}}><span style={{fontWeight: "bold"}}>Prénom :    </span>  {newUser.firstname}</p>)}
                            {newUser.lastname.length  > 0  && (<p style={{marginBottom:" 0px", marginLeft: "10px"}}><span style={{fontWeight: "bold"}}>Nom :       </span>  {newUser.lastname}</p>)}
                            <hr/>
                        </CardBody>
                        <CardBody style={{fontWeight: "bold", marginTop: "-50px"}}>
                            <h5>Rôles</h5>
                            {newUser.admin && (<span style={{color: "red"}}>Admin, </span>)}
                            <span>{(newUser.roles === "ROLE_TUTOR")?"Tuteur": newUser.roles === "ROLE_TEACHER"&&"Professeur"}</span>
                            <hr/>
                        </CardBody>
                        <CardBody style={{fontWeight: "bold", marginTop: "-50px"}}>
                            <h5>Modules</h5>
                            {newUser.modules.map(module => (
                                <Badge style={{backgroundColor: module.color, marginRight: "2px"}}>
                                    {module.name}
                                </Badge>
                            ))}
                            <hr/>
                        </CardBody>
                        <CardBody style={{fontWeight: "bold", marginTop: "-50px"}}>
                            <h5>Groupes</h5>
                            {newUser.groups.map(group => (
                                <Badge style={{backgroundColor: group.color, marginRight: "2px"}}>
                                    {group.name}
                                </Badge>
                            ))}
                            <hr/>
                        </CardBody>

                        <Button disabled={!isValid() || requestPending} onClick={() => handleAddUser()}>{requestPending ? <Loader
                            type="ThreeDots"
                            color="#FFF"
                            height={30}
                            width={100}
                        /> : "Ajouter l'utilisateur"}</Button>
                    </Card>
                </Col>

                <Col className="order-first" sm="12" lg="8">
                    <Card>
                        <CardHeader><h2>Ajout d'un utilisateur</h2></CardHeader>
                        <CardBody>
                            <Collapse
                                title="Information sur l'utilisateur"
                                open={collapseSelectModule}
                                toggler={setcollapseSelectModule}
                            >
                                <InputGroup className="mb-2">
                                    <InputGroupAddon type="prepend">
                                        <InputGroupText>Nom d'utilisateur</InputGroupText>
                                    </InputGroupAddon>
                                    <FormInput value={newUser.username} onChange={e => setNewUser({...newUser, "username": e.target.value})} invalid={(newUser.username.length === 0) || error.username && true} />
                                </InputGroup>
                                <Row>
                                    <Col>
                                        <InputGroup className="mb-2">
                                            <InputGroupAddon type="prepend">
                                                <InputGroupText>Prénom</InputGroupText>
                                            </InputGroupAddon>
                                            <FormInput value={newUser.firstname} onChange={e => setNewUser({...newUser, "firstname": e.target.value})} invalid={newUser.firstname.length === 0} />
                                        </InputGroup>
                                    </Col>
                                    <Col>
                                        <InputGroup className="mb-2">
                                            <InputGroupAddon type="prepend">
                                                <InputGroupText>Nom</InputGroupText>
                                            </InputGroupAddon>
                                            <FormInput value={newUser.lastname} onChange={e => setNewUser({...newUser, "lastname": e.target.value})} invalid={newUser.lastname.length === 0} />
                                        </InputGroup>
                                    </Col>
                                </Row>
                            </Collapse>

                            <Collapse
                                title="Choix des rôles"
                                open={collapseRoles}
                                toggler={setcollapseRoles}
                            >
                                <FormCheckbox checked={newUser.admin} onChange={() => setNewUser({...newUser, "admin": !newUser.admin})} >Admin</FormCheckbox>
                                <FormRadio name="role" checked={(newUser.roles === "ROLE_TEACHER")} onChange={() => setNewUser({...newUser, "roles": "ROLE_TEACHER", "modules": []})} >Professeur</FormRadio>
                                <FormRadio name="role" checked={(newUser.roles === "ROLE_TUTOR")}   onChange={() => setNewUser({...newUser, "roles": "ROLE_TUTOR", "modules": [moduleTutorat]})} >Tuteur    </FormRadio>
                            </Collapse>

                            {newUser.roles !== "ROLE_TUTOR" && (
                                <Collapse
                                    title="Choix des modules"
                                    open={collapseModule}
                                    toggler={setcollapseModule}
                                >
                                    <>
                                        {modules.length > 0 && (
                                            <Multiselect
                                                tagComponent={TagItem}
                                                itemComponent={ListItem}
                                                data={modules}
                                                onChange={e => setNewUser({...newUser, "modules": e})}
                                                textField="name"
                                            />
                                        )}
                                    </>
                                </Collapse>
                            )}

                            <Collapse
                                title="Choix des groupes"
                                open={collapseGroups}
                                toggler={setcollapseGroups}
                            >
                                {groups.length > 0 && (
                                    <Multiselect
                                        tagComponent={TagItem}
                                        itemComponent={ListItem}
                                        data={groups}
                                        onChange={e => setNewUser({...newUser, "groups": e})}
                                        textField="name"
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
