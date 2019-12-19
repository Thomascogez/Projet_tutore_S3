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

export default function User({ identifier, name, surname, groups, roles }) {
  const [editing, setEditing] = useState(false);
  const [toggleViewGroup, setToggleViewGroup] = useState(false);
  const [toggleEditGroup, setToggleEditGroup] = useState(false);
  const [toggleViewRole, setToggleViewRole] = useState(false);
  const [toggleEditRole, setToggleEditRole] = useState(false);

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
      <th scope="row">{identifier}</th>
      <td>
        {editing ? <FormInput value={name} placeholder="Nom ..." /> : name}
      </td>
      <td>
        {editing ? (
          <FormInput value={surname} placeholder="Prénom ..." />
        ) : (
          surname
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
          <a href="#" onClick = { ()=> setToggleEditRole(!toggleEditRole)}>Gérer rôles</a>
        ) :( 
          <a href="#" onClick = { ()=> setToggleViewRole(!toggleViewRole)}>Voir rôles</a>)
        }
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
          <Button onClick={() => setEditing(true)}>Edition</Button>
        )}
      </td>

      {/* Modals */}
      <Modal
        open={toggleViewGroup}
        toggle={() => setToggleViewGroup(!toggleViewGroup)}
      >
        <ModalHeader>
          Groupes de {name} {surname}
        </ModalHeader>
        <ModalBody>👋 Hello there!</ModalBody>
      </Modal>

      <Modal
        open={toggleEditGroup}
        toggle={() => setToggleEditGroup(!toggleEditGroup)}
      >
        <ModalHeader>
          Edition des groupes de {name} {surname}
        </ModalHeader>
        <ModalBody>👋 Hello there!</ModalBody>
      </Modal>

      <Modal
        open={toggleEditRole}
        toggle={() => setToggleEditRole(!toggleEditRole)}
      >
        <ModalHeader>
          Edition des rôles de de {name} {surname}
        </ModalHeader>
        <ModalBody>👋 Hello there!</ModalBody>
      </Modal>

      <Modal
        open={toggleViewRole}
        toggle={() => setToggleViewRole(!setToggleViewRole)}
      >
        <ModalHeader>
          Rôle de {name} {surname}
        </ModalHeader>
        <ModalBody>👋 Hello there!</ModalBody>
      </Modal>
    </tr>
  );
}
