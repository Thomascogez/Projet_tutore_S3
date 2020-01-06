import React, {useEffect, useState} from "react";
import {
    Button,
    FormInput,
    ButtonGroup,
    Modal,
    ModalHeader,
    ModalBody,
    FormCheckbox,
    FormRadio, Collapse, Badge, CardBody
} from "shards-react";
import { FaCheck, FaTimes } from "react-icons/fa";
import style from "../../../pages/userProfil/_userprofile.module.css";


export default function User(props) {
    const [editing, setEditing] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [toggleViewGroup, setToggleViewGroup] = useState(false);
    const [toggleEditGroup, setToggleEditGroup] = useState(false);
    const [toggleViewModule, setToggleViewModule] = useState(false);
    const [toggleEditModule, setToggleEditModule] = useState(false);

    props = props.user;

    const [firstname, setFirstname] = useState(props.firstname);
    const [username, setUsername]   = useState(props.username);
    const [lastname, setLastname]   = useState(props.lastname);
    const [groups, setGroups]       = useState(props.groups);
    const [modules, setModules]     = useState(props.modules);
    const [roles, setRoles]         = useState((props.roles.includes("ROLE_TEACHER")?"ROLE_TEACHER":(props.roles.includes("ROLE_TUTOR")?"ROLE_TUTOR":"")));

    const [admin, setAdmin] = useState(props.roles.includes("ROLE_ADMIN"));

    const handleValidate = () => {
        //when validate editing
        setEditing(false);
    };

    const handleCancel = () => {
        //when cancel editing
        setEditing(false);
    };

    const handleRole = (event, name) => {

    }

    useEffect(() => {
        console.log(roles)
    }, [roles]);


    return (
        <tr>
            <th scope="row">{username}</th>
            <td>
                {editing ? <FormInput value={lastname} placeholder="Nom ..." /> : lastname}
            </td>
            <td>
                {editing ? (
                  <FormInput value={firstname} placeholder="Prénom ..." />
                ) : (
                  firstname
                )}
            </td>
            <td>
                {editing ? (
                    <a href="#" onClick={() => setToggleEditGroup(!toggleEditGroup)}>
                        Gérer groupes
                    </a>
                ) : (
                    <a href="#" onClick={() => setToggleViewGroup(!toggleViewGroup)}>
                        Voir groupe
                    </a>
                )}
            </td>
          <td>
              {editing ? (
                  <a href="#" onClick = { ()=> setToggleEditModule(!toggleEditModule)}>Gérer modules</a>
              ) :(
                  <a href="#" onClick = { ()=> setToggleViewModule(!toggleViewModule)}>Voir modules</a>)
              }
          </td>

        <td>
            {editing ? (
                <>
                    <FormCheckbox checked={admin} onChange={() => setAdmin(!admin)} >Admin</FormCheckbox>
                    <FormRadio name={"role" + props.id} checked={(roles === "ROLE_TEACHER")} onChange={() => setRoles("ROLE_TEACHER")} >Professeur</FormRadio>
                    <FormRadio name={"role" + props.id} checked={(roles === "ROLE_TUTOR")}   onChange={() => setRoles("ROLE_TUTOR")}   >Tuteur    </FormRadio>
                </>
            ):(
                <>
                    {(admin)?<span style={{color: "red", fontWeight: "bold"}}>Admin, </span>:""}
                    {(roles.includes("ROLE_TEACHER")?"Professeur":"")}
                    {(roles.includes("ROLE_TUTOR"  )?"Tuteur"    :"")}
                </>
            )}
        </td>
          <td>
            {editing ? (
              <ButtonGroup>
                <Button onClick={() => handleValidate()} theme="success">
                  <FaCheck />
                </Button>
                <Button onClick={() => handleCancel()} theme="danger">
                  <FaTimes />
                </Button>
              </ButtonGroup>
            ) : (
                <React.Fragment>
                    <Button onClick={() => setEditing(true)}>Edition</Button>
                    <Button onClick={() => setDeleting(!deleting)} theme="danger">Supprimer</Button>
                </React.Fragment>
            )}
          </td>

          {/* Modals */}
          <Modal
            open={toggleViewGroup}
            toggle={() => setToggleViewGroup(!toggleViewGroup)}
          >
            <ModalHeader>
              Groupes de {props.firstname} {props.lastname}
            </ModalHeader>
            <ModalBody>
                {groups ? groups.map(group => (<h5 className={style.Group} style={{ backgroundColor: group.color } } key={group.name} >{group.name}</h5>)) : <div></div>}
            </ModalBody>
          </Modal>

          <Modal
            open={toggleEditGroup}
            toggle={() => setToggleEditGroup(!toggleEditGroup)}
          >
            <ModalHeader>
              Edition des groupes de {props.name} {props.firstname}
            </ModalHeader>
            <ModalBody>👋 Hello there!</ModalBody>
          </Modal>

          <Modal
            open={toggleEditModule}
            toggle={() => setToggleEditModule(!toggleEditModule)}
          >
            <ModalHeader>
              Edition des modules de {props.firstname} {props.lastname}
            </ModalHeader>
            <ModalBody>👋 Hello there!</ModalBody>
          </Modal>

          <Modal
            open={toggleViewModule}
            toggle={() => setToggleViewModule(!setToggleViewModule)}
          >
            <ModalHeader>
              Modules de {props.firstname} {props.lastname}
            </ModalHeader>
              <ModalBody>
                  {modules ? modules.map(module => (
                      <Badge
                          className={style.Module}
                          style={{ backgroundColor: module.color, margin:"5px" }}
                      >{module.name}</Badge>
                  )) : <div></div>}
              </ModalBody>
          </Modal>
        </tr>
    );
}
