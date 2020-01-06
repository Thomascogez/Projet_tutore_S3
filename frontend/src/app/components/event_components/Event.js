import React, {useEffect, useState} from "react";
import { Badge } from "shards-react";
import ModalViewFiles from '../view_event_components/ModalViewsFiles'
import { FaFileAlt } from 'react-icons/fa';
import moment from 'moment';
import {Button, ButtonGroup} from "shards-react";
import {FaCheck, FaTimes} from "react-icons/fa";
import { FormSelect } from "shards-react";

export default function Event(props) {

    
    const [editing, setEditing] = useState((props === null));
    const [deleting, setDeleting] = useState(false);
    const [type, setType] = useState(["Projet", "à faire", "fait"]);
    props = props.event;

    console.log(props)

    const [name, setName] = useState(props.name)
    const [session, setSession] = useState(props.session)
    const duree = ('0' + Math.floor(props.duration) % 24).slice(-2) + 'h' + ((props.duration % 1)*60 + '0').slice(0, 2)
  
    const handleValidate = () => {
        setEditing(true);
    };
    
    const handleCancel = () => {
        setEditing(false);
    };

    return (
        <React.Fragment>
            <tr>
                <td>
                    {editing ?
                        <FormSelect style={{width: "90px"}}>
                            <option value={props.type}>{props.type}</option>
                            {type.map(Type => Type === props.type ? <React.Fragment /> : <option key={Type} value={Type}>{Type}</option>)}
                        </FormSelect>
                    :
                        props.type === "fait" ? 
                        <Badge theme="info" style={{width: "50px"}}>{props.type}</Badge>
                        :
                        <Badge theme="warning" style={{width: "50px"}}>{props.type}</Badge>
                    }
                </td>
                <td>
                    <Badge theme="info" style={{backgroundColor: session.module.color, width: "70px"}}>[ {session.module.code}] </Badge> {session.module.name}
                </td>
                <td>{session.type}</td>
                <td>{name}</td>
                <td>{duree}</td>
                <td>{moment(props.dueAt).format("DD/MM/YYYY")}</td>
                <td>
                    {props.attachmentEvents.length !== 0 ?(
                        <ModalViewFiles
                        files={props.attachmentdatas}
                        />
                    ) : (
                        <FaFileAlt style={{ color: "grey" }} />
                    )}
                </td>
                <td>
                    {editing ? (
                        <ButtonGroup>
                            <Button onClick={() => handleValidate()} theme="success">
                                <FaCheck/>
                            </Button>
                            <Button onClick={() => handleCancel()} theme="danger">
                                <FaTimes/>
                            </Button>
                        </ButtonGroup>
                    ) : (
                        <ButtonGroup>
                            {(props != null)? (
                                <React.Fragment>
                                    <Button onClick={() => setEditing(true)}>Edition</Button>
                                    <Button onClick={() => setDeleting(!deleting)} theme="danger">Supprimer</Button>
                                </React.Fragment>
                            ):(<React.Fragment />)}
                        </ButtonGroup>
                    )}
                </td>
          </tr>
      </React.Fragment>
  );
}
