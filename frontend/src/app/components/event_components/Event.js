import React, {useState} from "react";
import {Badge, Button, ButtonGroup} from "shards-react";
import ModalViewFiles from '../view_event_components/ModalViewsFiles'
import {FaCheck, FaFileAlt, FaTimes} from 'react-icons/fa';
import moment from 'moment';
import ModalViewDetails from "../view_event_components/ModalViewDetails"

export default function Event(props) {

    const [editing, setEditing] = useState((props === null));
    props = props.event;

    const [name, setName] = useState(props.name)
    const [session, setSession] = useState(props.session)
    const duree = (props.duration) ? ('0' + Math.floor(props.duration) % 24).slice(-2) + 'h' + ((props.duration % 1) * 60 + '0').slice(0, 2) : "00h00";

    return (
        <React.Fragment>
            <tr>
                <td>
                    {props.type === "fait" ? 
                    <Badge theme="info" style={{width: "50px"}}>{props.type}</Badge>
                    :
                    <Badge theme="warning" style={{width: "50px"}}>{props.type}</Badge>
                    }
                </td>
                <td>
                    <Badge theme="info" style={{backgroundColor: session.module.color, width: "70px"}}>[ {session.module.code}] </Badge> {session.module.name}
                </td>
                <td>{session.type}</td>
                <td><ModalViewDetails text={name}/></td>
                <td>{duree !== "00h00" ? duree : "Pas définie"}</td>
                <td>{(props.dueAt) ? moment(props.dueAt).format("DD/MM/YYYY") : "Pas définie"}</td>
                <td>
                    {props.attachmentEvents.length !== 0 ?(
                        <ModalViewFiles
                            files={props.attachmentEvents}
                        />
                    ) : (
                        <FaFileAlt style={{ color: "grey" }} />
                    )}
                </td>
                <td>
                    {editing ? (
                        <ButtonGroup>
                            <Button onClick={() => setEditing(true)} theme="success">
                                <FaCheck/>
                            </Button>
                            <Button onClick={() => setEditing(false)} theme="danger">
                                <FaTimes/>
                            </Button>
                        </ButtonGroup>
                    ) : (
                        <ButtonGroup>
                            {(props != null)? (
                                <React.Fragment>
                                    <Button onClick={() => setEditing(true)}>Edition</Button>
                                    <Button theme="danger">Supprimer</Button>
                                </React.Fragment>
                            ):(<React.Fragment />)}
                        </ButtonGroup>
                    )}
                </td>
          </tr>
      </React.Fragment>
  );
}
