import React, { useState } from "react";
import { Button, FormInput, ButtonGroup } from "shards-react";
import { FaCheck, FaTimes } from "react-icons/fa";

export default function Module({name,color }) {
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
          <td>
          {editing ? <FormInput value={name} placeholder="Nom ..." /> : name}
          </td>
          <td>
              <div style={{backgroundColor:color, width:100}}>
                  {editing ? <FormInput value={color} placeholder="Color ..." /> : color}
              </div>
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
              <Button onClick={() => setEditing(true)}>Edit</Button>
          )}
          </td>   
      </tr>
  );
}
