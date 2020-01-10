import React, { useState } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import InputColor from "react-input-color";
import { toast } from "react-toastify";
import { Button, ButtonGroup, FormInput } from "shards-react";
import { APIAddModule, APIEditModule } from "../../../api/modules";
import DeleteModal from "./DeleteModal";
import {useDispatch, useSelector} from "react-redux";
import {getModules} from "../../../providers/actions/moduleAction";

export default function Module({module}) {
    const [editing, setEditing] = useState(false);
    const [deleting,  setDeleting] = useState(false);
    const [error, setError] = useState({});
    const [invalidEdit, setInvalidEdit] = useState(false);
   

    const [code,  setCode]  = useState((module != null)?module.code:"");
    const [name,  setName]  = useState((module != null)?module.name:"");
    const [color, setColor] = useState((module != null)?module.color:"");

    const dispatch    = useDispatch();

    const handleValidate = () => {
        let req = {
            "code": code,
            "name": name,
            "color": color != ""? color:"#000000",
        };
        if(module != null) req = {...req, id: module.id};
        if (req.name === "") {
            toast.error("Le nom du module ne peut être vide !");
            setName((module != null) ? module.name : '');
            setInvalidEdit(true)
        }
        else if (req.code === "") {
            toast.error("Le code du module ne peut être vide !");
            setName((module != null) ? module.name : '');
            setInvalidEdit(true);
        } else {
            if (module === null) {
                APIAddModule(req)
                    .then(res => {
                        toast.success("Nouveau module ajouté !");
                        setName("");
                        setColor("");
                        setCode("");
                        setEditing(false);
                        setInvalidEdit(false);
                        dispatch(getModules());
                    })
                    .catch(err => {
                        setInvalidEdit(true)
                        toast.error(err.response.data.errors.children.code.errors[0]);
                        if (err.response.data.errors) {
                            setError(err.response.data.errors.children);
                        }
                    })
            } else {
                APIEditModule(req)
                    .then(res => {
                        toast.success("Modification effectuée !");
                        setName(req.name);
                        setColor(req.color);
                        setCode(req.code);
                        setEditing(false);
                        setInvalidEdit(false);
                    })
                    .catch(err => {
                        setInvalidEdit(true);
                        toast.error(err.response.data.errors.children.code.errors[0]);
                        if (err.response.data.errors) {
                            setError(err.response.data.errors.children);
                        }
                        setName(module.name);
                        setColor(module.color);
                        setCode(module.code);
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
                {(module === null)?(
                editing ?
                    <FormInput value={code} invalid={invalidEdit} onChange={e => setCode(e.target.value)} placeholder="Code ..."/>
                :
                    <a onClick={e => {e.preventDefault(); setEditing(true)}} href="#"><span style={{fontWeight: "bold"}}>Ajouter un module ...</span></a>
                ):(
                    editing ? <FormInput value={code} invalid={invalidEdit} onChange={e => setCode(e.target.value)} placeholder="Code ..." /> : code
                )}
            </td>
            <td>
                {editing ?
                    <FormInput value={name} invalid={invalidEdit} onChange={e => setName(e.target.value)} placeholder="Nom ..." />
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
                  {(module != null)? (
                      <React.Fragment>
                          <Button onClick={() => setEditing(true)}>Edition</Button>
                          <Button onClick={() => setDeleting(!deleting)} theme="danger">Supprimer</Button>
                      </React.Fragment>
                  ):(<React.Fragment />)}
              </ButtonGroup>
            )}
            </td>
            {(module != null)? (
              <DeleteModal open={deleting} setOpen={setDeleting} name={name} color={color} id={module.id}/>
            ):(<React.Fragment />)}
        </tr>
    );
}
