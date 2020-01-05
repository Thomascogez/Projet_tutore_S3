import React, { useState } from "react";
import {
Button,
FormInput,
ButtonGroup,
Modal,
ModalHeader,
ModalBody
} from "shards-react";
import { FaCheck, FaTimes } from "react-icons/fa";

export default function User(props) {
    const [editing, setEditing] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [toggleViewGroup, setToggleViewGroup] = useState(false);
    const [toggleEditGroup, setToggleEditGroup] = useState(false);
    const [toggleViewRole, setToggleViewRole] = useState(false);
    const [toggleEditRole, setToggleEditRole] = useState(false);

    props = props.user;

    const [firstname, setFirstname] = useState(props.firstname);
    const [username, setUsername]   = useState(props.username);
    const [lastname, setLastname]   = useState(props.lastname);
    const [groups, setGroups]       = useState(props.groups);
    const [modules, setModules]     = useState(props.modules);
    const [roles, setRoles]         = useState(props.roles);

    const handleValidate = () => {
        //when validate editing
        setEditing(false);
    };

    const handleCancel = () => {
        //when cancel editing
        setEditing(false);
    };

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
                  <a href="#" onClick = { ()=> setToggleEditRole(!toggleEditRole)}>Gérer modules</a>
              ) :(
                  <a href="#" onClick = { ()=> setToggleViewRole(!toggleViewRole)}>Voir modules</a>)
              }
          </td>

        <td>
            {editing ? (
                <a href="#" onClick = { ()=> setToggleEditRole(!toggleEditRole)}>Gérer modules</a>
            ) :(
                <React.Fragment>
                    {(roles.includes("ROLE_ADMIN")?<span style={{color: "red", fontWeight: "bold"}}>Admin, </span>:"")}
                    {(roles.includes("ROLE_TEACHER")?"Professeur":"")}
                    {(roles.includes("ROLE_TUTOR")?"Tuteur":"")}
                </React.Fragment>
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
              Groupes de  {props.firstname} {props.lastname}
            </ModalHeader>
            <ModalBody>👋 Hello there!</ModalBody>
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
            open={toggleEditRole}
            toggle={() => setToggleEditRole(!toggleEditRole)}
          >
            <ModalHeader>
              Edition des rôles de de {props.firstname} {props.lastname}
            </ModalHeader>
            <ModalBody>👋 Hello there!</ModalBody>
          </Modal>

          <Modal
            open={toggleViewRole}
            toggle={() => setToggleViewRole(!setToggleViewRole)}
          >
            <ModalHeader>
              Rôle de  {props.firstname} {props.lastname}
            </ModalHeader>
            <ModalBody>👋 Hello there!</ModalBody>
          </Modal>
        </tr>
    );
}
