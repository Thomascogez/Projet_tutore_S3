import React, {useEffect, useState} from "react";
import {Button, ButtonGroup, FormInput, FormSelect} from "shards-react";
import {FaCheck, FaTimes} from "react-icons/fa";
import {useSelector} from "react-redux";
import {toast} from 'react-toastify';
import {APIAddGroup, APIEditGroup} from "../../../api/groups";
import DeleteType from "./Delete";
import {APIAddsessionType, APIEditsessionType} from "../../../api/type/session";
import {errFetch} from "../../../utils/errorFetch";

toast.configure();
export default function SessionType(props) {
    const [editing, setEditing] = useState((props === null));
    const [deleting, setDeleting] = useState(false);
    const [error, setError] = useState({});
    props = props.sessionType;

    const sessionTypeState = useSelector(state => state.sessionType);

    const [name, setName] = useState((props != null)?props.name:"");

    const handleValidate = () => {
        let req = {
            name: name
        };
        if(props != null) req = {...req, id: props.id};
        if (req.name === "") {
            toast.error("Le nom du type de séance ne peut être vide !");
            setName((props != null)?props.name:'');
        } else {
            if(props === null) {
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
                    {(props === null)?(
                        editing ?
                            <FormInput value={name} invalid={error.name && true} onChange={e => setName(e.target.value)} placeholder="Nom ..."/>
                            :
                            <a onClick={() => setEditing(true)} href="javascript:void(0);"><span style={{fontWeight: "bold"}}>Ajouter un type de séance ...</span></a>
                    ):(
                        editing ?
                            <FormInput value={name} invalid={error.name && true} onChange={e => setName(e.target.value)} placeholder="Nom ..."/>
                            :<span style={{fontWeight: "bold"}}>{name}</span>
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
                {(props != null)? (
                    <DeleteType open={deleting} type={"seance"} setOpen={setDeleting} name={name} id={props.id}/>
                ):(<React.Fragment />)}
            </tr>
        </React.Fragment>
    );
}
