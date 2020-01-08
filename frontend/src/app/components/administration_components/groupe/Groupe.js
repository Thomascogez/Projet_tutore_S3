import React, {useState} from "react";
import {Button, ButtonGroup, FormInput, FormSelect, Badge} from "shards-react";
import {FaCheck, FaTimes} from "react-icons/fa";
import DeleteGroup from "./DeleteGroup";
import {useSelector} from "react-redux";
import {toast} from 'react-toastify';
import {APIAddGroup, APIEditGroup} from "../../../api/groups";
import InputColor from "react-input-color";

toast.configure();
export default function Groupe(props) {
    const [editing, setEditing] = useState((props === null));
    const [deleting, setDeleting] = useState(false);
    const [error, setError] = useState({});
    const [invalidEdit, setInvalidEdit] = useState(false);
    props = props.group;

    const groupState = useSelector(state => state.group);

    const [name, setName] = useState((props != null)?props.name:"");
    const [color, setColor] = useState((props != null)?props.color:"");
    const [parent, setParent] = useState((props != null)?((props.parent) ? props.parent : ""):"");

    const handleValidate = () => {
        let req = {
            name: name,
            color: color,
            parent: parent
        };
        if(props != null) req = {...req, id: props.id};
        if (req.name === "") {
            toast.error("Le nom du groupe ne peut être vide !");
            setInvalidEdit(true);
            setName((props != null)?props.name:'');
        } else {
            if(props === null) {
                APIAddGroup(req)
                    .then(res => {
                        toast.success("Nouveau groupe ajouté !");
                        setInvalidEdit(false);
                        setEditing(false);
                        window.location.reload();

                    })
                    .catch(err => {
                        console.log(err.response);
                        setInvalidEdit(true);
                        toast.error(err.response.data.errors.children.name.errors[0]);
                        if(err.response.data.errors) {
                            setError(err.response.data.errors.children);
                        }
                    })
            } else {
                APIEditGroup(req)
                    .then(res => {
                        toast.success("Modification effectué !");
                        setName(req.name);
                        setColor(req.color);
                        setParent(req.parent);
                        setEditing(false);
                        setInvalidEdit(false);
                    })
                    .catch(err => {
                        setInvalidEdit(true);
                        toast.error(err.response.data.errors.children.name.errors[0]);
                        if(err.response.data.errors) {
                            setError(err.response.data.errors.children);
                        }
                        setName(props.name);
                        setColor(props.color);
                        setParent((props.parent)?props.parent.name:'');
                    })
            }
        }
    };

    const handleCancel = () => {
        setEditing(false);
    };
    return (
        <React.Fragment>
            <tr>
                <td>
                    {(props === null)?(
                        editing ?
                            <FormInput value={name} invalid={invalidEdit} onChange={e => setName(e.target.value)} placeholder="Nom ..."/>
                            :
                            <a onClick={() => setEditing(true)} href="javascript:void(0);"><span style={{fontWeight: "bold"}}>Ajouter un groupe ...</span></a>
                    ):(
                        editing ?
                            <FormInput value={name} invalid={invalidEdit} onChange={e => setName(e.target.value)} placeholder="Nom ..."/>
                            :<Badge style={{backgroundColor: color, width: "100px"}}>{name}</Badge>
                    )}
                </td>
                <td>
                    <div style={{width: 100}}>
                        {editing ?
                            <InputColor initialHexColor={color} onChange={e => setColor(e.hex)} placement="right"/>
                            :
                            <div style={{color: color, fontSize: 15, fontWeight: "bold"}}>{color}</div>}
                    </div>
                </td>
                <td>
                    {editing ?
                        <FormSelect value={parent} onChange={(e) => setParent(e.target.value)}>
                            <option style={{fontWeight: "bold"}} key={null}>Aucun groupe</option>
                            {groupState.groups.map(m => (
                                <React.Fragment>
                                    {m.name !== name ? (
                                        <option style={{color: m.color, fontWeight: "bold"}} key={m.name}>
                                            {m.name}
                                        </option>
                                    ) : ""}
                                </React.Fragment>
                            ))}
                        </FormSelect>
                        :(
                            (props != null)? (
                                (parent) ? <Badge style={{backgroundColor: parent.color, width: "100px"}}>{parent.name}</Badge> : "Aucun groupe"
                            ):(<React.Fragment />)
                        )
                    }
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
                    <DeleteGroup open={deleting} setOpen={setDeleting} name={name} color={color} id={props.id}/>
                ):(<React.Fragment />)}
          </tr>
      </React.Fragment>
  );
}
