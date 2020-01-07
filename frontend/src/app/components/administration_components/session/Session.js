import React, { useState } from "react";
import Modal, { Button, FormInput, ButtonGroup } from "shards-react";
import { FaCheck, FaTimes, FaBold } from "react-icons/fa";
import DeleteModal from "./DeleteModal";
import {useSelector} from "react-redux";
import InputColor from "react-input-color";
import {toast} from "react-toastify";
import {APIAddModule, APIEditModule} from "../../../api/modules";

export default function Session(props) {
    const [editing, setEditing] = useState(false);
    const [deleting,  setDeleting] = useState(false);
    const [error, setError] = useState({});
    props = props.module;

    const moduleState = useSelector(state => state.module);

    const [code,  setCode]  = useState((props != null)?props.code:"");
    const [name,  setName]  = useState((props != null)?props.name:"");
    const [color, setColor] = useState((props != null)?props.color:"");

    const handleValidate = () => {
        let req = {
            "code": code,
            "name": name,
            "color": color,
        };
        console.log(req)
        if(props != null) req = {...req, id: props.id};
        if (req.name === "") {
            toast.error("Le nom du module ne peut être vide !");
            setName((props != null) ? props.name : '');
        }
        else if (req.code === "") {
            toast.error("Le code du module ne peut être vide !");
            setName((props != null) ? props.name : '');
        } else {
            if (props === null) {
                APIAddModule(req)
                    .then(res => {
                        toast.success("Nouveau module ajouté !");
                        setEditing(false);
                        window.location.reload();
                    })
                    .catch(err => {
                        toast.error(err.response.data.message);
                        if (err.response.data.errors) {
                            setError(err.response.data.errors.children);
                        }
                    })
            } else {
                APIEditModule(req)
                    .then(res => {
                        toast.success("Modification effectué !");
                        setName(req.name);
                        setColor(req.color);
                        setCode(req.code);
                        setEditing(false);
                    })
                    .catch(err => {
                        console.log(err.response)
                        toast.error(err.response.data.message);
                        if (err.response.data.errors) {
                            setError(err.response.data.errors.children);
                        }
                        setName(props.name);
                        setColor(props.color);
                        setCode(props.code);
                    })
            }
        }
    };

    const handleCancel = () => {
        //when cancel editing
        setEditing(false);
    };

    return (
        <tr>
            <td>
                {(props === null)?(
                    editing ?
                        <FormInput value={code} onChange={e => setCode(e.target.value)} placeholder="Code ..."/>
                        :
                        <a onClick={() => setEditing(true)} href="javascript:void(0);"><span style={{fontWeight: "bold"}}>Ajouter un module ...</span></a>
                ):(
                    editing ? <FormInput value={code} onChange={e => setCode(e.target.value)} placeholder="Code ..." /> : code
                )}
            </td>
            <td>
                {editing ?
                    <FormInput value={name} onChange={e => setName(e.target.value)} placeholder="Nom ..." />
                    : name
                }
            </td>
            <td >
                <div style={{width:100}}>
                    {editing ?
                        <InputColor initialHexColor={color} onChange={e => setColor(e.hex)} placement="right"/>
                        :
                        <div style={{color:color, fontSize:15, fontWeight:"bold"}}>{color}</div>
                    }
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
                <DeleteModal open={deleting} setOpen={setDeleting} name={name} color={color} id={props.id}/>
            ):(<React.Fragment />)}
        </tr>
    );
}
