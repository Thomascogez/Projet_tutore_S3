import React, { useState } from "react";
import { Button, FormInput, ButtonGroup } from "shards-react";
import { FaCheck, FaTimes } from "react-icons/fa";
export default function User({ identifier, name, surname, groups, roles }) {
  const [editing, setEditing] = useState(false);

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
          {editing ? <FormInput value={groups} placeholder="groups" /> : groups}
        </td>
        <td>
          {editing ? <FormInput value={surname} placeholder="roles" /> : roles}
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
      </tr>
   
  );
}
