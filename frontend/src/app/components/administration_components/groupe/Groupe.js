import React, { useState } from "react";
import Modal, { Button, FormInput, ButtonGroup } from "shards-react";
import { FaCheck, FaTimes, FaBold } from "react-icons/fa";
import ColorPicker from '../../colorPicker_component/colorPicker'
import DeleteGroup from "./DeleteGroup";
import Loader from 'react-loader-spinner'

export default function Groupe(props) {
    const [editing, setEditing] = useState(false);
    const [deleting,  setDeleting] = useState(false);

  const handleValidate = () => {
    //when validate editing
    setEditing(false);
  };

  const handleCancel = () => {
    //when cancel editing
    setEditing(false);
  };
  return (
      <React.Fragment>
          <tr>
              <td>
                  {editing ? <FormInput value={props.name} placeholder="Nom ..." /> : props.name}
              </td>
              <td >
                  <div style={{width:100}}>
                      {editing ? <ColorPicker initColor={props.color}/> : <div style={{color:props.color, fontSize:15, fontWeight:"bold"}}>{props.color}</div>}
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
                      <ButtonGroup>
                          <Button onClick={() => setEditing(true)}>Edition</Button>
                          <Button onClick={() => setDeleting(!deleting)} theme="danger">Supprimer</Button>
                      </ButtonGroup>
                  )}
              </td>
              <DeleteGroup open={deleting} setOpen={setDeleting} name={props.name} color={props.color} id={props.id}/>
          </tr>
      </React.Fragment>
  );
}
