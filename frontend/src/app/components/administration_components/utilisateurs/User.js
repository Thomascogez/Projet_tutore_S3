import React, { useState } from "react";
import { Button, FormInput, ButtonGroup, Modal, ModalHeader, ModalBody } from "shards-react";
import { FaCheck, FaTimes } from "react-icons/fa";

export default function User({ identifier, name, surname, groups, roles }) {
  const [editing, setEditing]     = useState(false);
  const [openModal, setopenModal] = useState(false);
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
          {editing ? <Button onClick ={() => setopenModal(!openModal) } theme="primary">Voir groupe</Button> : groups}
        </td>
        <td>
          {editing ? <Button theme="warning">Voir les autorisations</Button> : roles}
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
        <Modal open={openModal} toggle={() =>setopenModal(!openModal)}>
          <ModalHeader>Header</ModalHeader>
          <ModalBody>👋 Hello there!</ModalBody>
        </Modal>
      </tr>
   
  );
}
