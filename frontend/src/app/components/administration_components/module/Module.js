import React, { useState } from "react";
import { Button, FormInput, ButtonGroup } from "shards-react";
import { FaCheck, FaTimes, FaBold } from "react-icons/fa";
import ColorPicker from '../../colorPicker_component/colorPicker'

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
          <td >
              <div style={{width:100}}>
                  {editing ? <ColorPicker initColor={color}/> : <div style={{color:color, fontSize:15, fontWeight:"bold"}}>{color}</div>}
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
              <Button onClick={() => setEditing(true)}>Edition</Button>
          )}
          </td>   
      </tr>
  );
}
