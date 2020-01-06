import React, {useEffect, useState} from "react";
import {
    Button,
    FormInput,
    ButtonGroup,
    Modal,
    ModalHeader,
    ModalBody,
    FormCheckbox,
    FormRadio
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

    const handleRole = (event, name) => {
        let tmp = roles;
        const index = tmp.indexOf(name);
        if (index > -1) {
            if(name === "ROLE_TUTOR")
                setRoles(roles.filter( role => role !== "ROLE_TEACHER"))
            else if(name === "ROLE_TEACHER")
                setRoles(roles.filter( role => role !== "ROLE_TUTOR"))
            else
                setRoles(roles.filter( role => role !== name))
        } else {
            setRoles([...roles, name])
        }
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
                  <a href="#" onClick = { ()=> setToggleEditRole(!toggleEditRole)}>Gérer modules</a>
              ) :(
                  <a href="#" onClick = { ()=> setToggleViewRole(!toggleViewRole)}>Voir modules</a>)
              }
          </td>

        <td>
            {editing ? (
                <>
                    <FormCheckbox                       checked={roles.includes("ROLE_ADMIN")}   onChange={e => handleRole(e, "ROLE_ADMIN")}   >Admin     </FormCheckbox>
                    <FormRadio name={"role" + props.id} checked={roles.includes("ROLE_TEACHER")} onChange={e => handleRole(e, "ROLE_TEACHER")} >Professeur</FormRadio>
                    <FormRadio name={"role" + props.id} checked={roles.includes("ROLE_TUTOR")}   onChange={e => handleRole(e, "ROLE_TUTOR")}   >Tuteur    </FormRadio>
                </>
            ):(
                <>
                    {(roles.includes("ROLE_ADMIN"  )?<span style={{color: "red", fontWeight: "bold"}}>Admin, </span>:"")}
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
