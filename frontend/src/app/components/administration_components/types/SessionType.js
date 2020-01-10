import React, { useEffect, useState } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import { toast } from 'react-toastify';
import { Button, ButtonGroup, FormInput } from "shards-react";
import { APIAddsessionType, APIEditsessionType } from "../../../api/type/session";
import { errFetch } from "../../../utils/errorFetch";
import DeleteType from "./Delete";

toast.configure();
export default function SessionType({ sessionType }) {
    const [editing, setEditing] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [error, setError] = useState({});

    const [name, setName] = useState((sessionType != null) ? sessionType.name : "");

    const handleValidate = () => {
        let req = {
            name: name
        };
        if (sessionType != null) req = { ...req, id: sessionType.id };
        if (req.name === "") {
            toast.error("Le nom du type de séance ne peut être vide !");
            setName((sessionType != null) ? sessionType.name : '');
        } else {
            if (sessionType === null) {
                APIAddsessionType(req)
                    .then(res => {
                        toast.success("Nouveau type ajouté !");
                        setEditing(false);
                        window.location.reload();

                    })
                    .catch(err => {
                        setError(errFetch(err));
                    })
            } else {
                APIEditsessionType(req)
                    .then(res => {
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
                    {(sessionType === null) ? (
                        editing ?
                            <FormInput value={name} invalid={error.name && true} onChange={e => setName(e.target.value)} placeholder="Nom ..." />
                            :
                            <a onClick={() => setEditing(true)} href="javascript:void(0);"><span style={{ fontWeight: "bold" }}>Ajouter un type de séance ...</span></a>
                    ) : (
                            editing ?
                                <FormInput value={name} invalid={error.name && true} onChange={e => setName(e.target.value)} placeholder="Nom ..." />
                                : <span style={{ fontWeight: "bold" }}>{name}</span>
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
                                {(sessionType != null) ? (
                                    <React.Fragment>
                                        <Button onClick={() => setEditing(true)}>Edition</Button>
                                        <Button onClick={() => setDeleting(!deleting)} theme="danger">Supprimer</Button>
                                    </React.Fragment>
                                ) : (<React.Fragment />)}
                            </ButtonGroup>
                        )}
                </td>
                {(sessionType != null) ? (
                    <DeleteType open={deleting} type={"seance"} setOpen={setDeleting} name={name} id={sessionType.id} />
                ) : (<React.Fragment />)}
            </tr>
        </React.Fragment>
    );
}
