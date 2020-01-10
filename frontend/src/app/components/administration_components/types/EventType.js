import React, { useEffect, useState } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import { toast } from 'react-toastify';
import { Button, ButtonGroup, FormCheckbox, FormInput } from "shards-react";
import { APIAddEventType, APIEditEventType } from "../../../api/type/event";
import { errFetch } from "../../../utils/errorFetch";
import DeleteType from "./Delete";

toast.configure();
export default function EventType({ eventType }) {
    const [editing, setEditing] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [error, setError] = useState({});
    const [invalidEdit, setInvalidEdit] = useState(false);



    const [name, setName] = useState((eventType != null) ? eventType.name : "");
    const [teacher, setTeacher] = useState((eventType != null) ? eventType.roleTypeEvent.teacher : false);
    const [tutor, setTutor] = useState((eventType != null) ? eventType.roleTypeEvent.tutor : false);

    const handleValidate = () => {
        let req = {
            name: name,
            tutor: tutor,
            teacher: teacher
        };
        if (eventType != null) req = { ...req, id: eventType.id };
        if (req.name === "") {
            toast.error("Le nom du type d'évènement ne peut être vide !");
            setName((eventType != null) ? eventType.name : '');
            setInvalidEdit(true);
        } else {
            if (eventType === null) {
                APIAddEventType(req)
                    .then(res => {
                        toast.success("Nouveau type ajouté !");
                        setInvalidEdit(false);
                        setEditing(false);

                    })
                    .catch(err => {
                        setError(errFetch(err));
                    })
            } else {
                APIEditEventType(req)
                    .then(res => {
                        setError({});
                        toast.success("Modification effectué !");
                        setName(req.name);
                        setEditing(false);
                    })
                    .catch(err => {
                        setError(errFetch(err));
                    })
            }
        }
    };

    useEffect(() => {
        Object.entries(error).map(m => {
            toast.error(m[1][0]);
        })
    }, [error])

    const handleCancel = () => {
        setEditing(false);
    };
    return (
        <React.Fragment>
            <tr>
                <td>
                    {(eventType === null) ? (
                        editing ?
                            <FormInput value={name} invalid={error.name && true} onChange={e => setName(e.target.value)} placeholder="Nom ..." />
                            :
                            <a onClick={() => setEditing(true)} href="javascript:void(0);"><span style={{ fontWeight: "bold" }}>Ajouter un type d'évènement ...</span></a>
                    ) : (
                            editing ?
                                <FormInput value={name} invalid={error.name && true} onChange={e => setName(e.target.value)} placeholder="Nom ..." />
                                : <span style={{ fontWeight: "bold" }}>{name}</span>
                        )}
                </td>
                <td>
                    {(eventType === null) ? (
                        editing ?
                            <FormCheckbox checked={teacher} onChange={() => setTeacher(!teacher)} />
                            : ""
                    ) : (
                            editing ?
                                <FormCheckbox checked={teacher} onChange={() => setTeacher(!teacher)} />
                                : (teacher) ? "Autoriser" : "Interdit"
                        )}
                </td>
                <td>
                    {(eventType === null) ? (
                        editing ?
                            <FormCheckbox checked={tutor} onChange={() => setTutor(!tutor)} />
                            : ""
                    ) : (
                            editing ?
                                <FormCheckbox checked={tutor} onChange={() => setTutor(!tutor)} />
                                : (tutor) ? "Autoriser" : "Interdit"
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
                            <ButtonGroup>
                                {(eventType != null) ? (
                                    <React.Fragment>
                                        <Button onClick={() => setEditing(true)}>Edition</Button>
                                        <Button onClick={() => setDeleting(!deleting)} theme="danger">Supprimer</Button>
                                    </React.Fragment>
                                ) : (<React.Fragment />)}
                            </ButtonGroup>
                        )}
                </td>
                {(eventType != null) ? (
                    <DeleteType open={deleting} type={"event"} setOpen={setDeleting} name={name} id={eventType.id} />
                ) : (<React.Fragment />)}
            </tr>
        </React.Fragment>
    );
}
