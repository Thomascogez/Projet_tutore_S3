import React, {useState} from "react";
import {Button, ButtonGroup, FormInput, FormSelect} from "shards-react";
import {FaCheck, FaTimes} from "react-icons/fa";
import DeleteGroup from "./DeleteGroup";
import {useSelector} from "react-redux";
import {toast} from 'react-toastify';
import {APIEditGroup} from "../../../api/groups";
import InputColor from "react-input-color";

toast.configure();

export default function Groupe(props) {
    const [editing, setEditing] = useState(false);
    const [deleting, setDeleting] = useState(false);
    props = props.group;

    const groupState = useSelector(state => state.group);

    const [name, setName] = useState(props.name);
    const [color, setColor] = useState(props.color);
    const [parent, setParent] = useState((props.parent) ? props.parent.name : "");

    const handleValidate = () => {
        const req = {
            id: props.id,
            name: name,
            color: color,
            parent: parent
        };
        if (req.name === "") {
            toast.error("Le nom du groupe ne peut être vide !");
            setName(props.name);
        } else {
            APIEditGroup(req)
                .then(res => {
                    toast.success("Modification effectué !");
                    setName(req.name);
                    setColor(req.color);
                    setParent(req.parent);
                })
                .catch(data => {
                    console.log(data.message);
                    toast.error(data.message);
                    setName(props.name);
                    setColor(props.color);
                    setParent(props.parent.name);
                })
        }
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
                    {editing ?
                        <FormInput value={name} onChange={e => setName(e.target.value)} placeholder="Nom ..."/> : name}
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
                        :
                        (parent) ? parent : "Aucun groupe"
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
                            <Button onClick={() => setEditing(true)}>Edition</Button>
                            <Button onClick={() => setDeleting(!deleting)} theme="danger">Supprimer</Button>
                        </ButtonGroup>
                    )}
                </td>
                <DeleteGroup open={deleting} setOpen={setDeleting} name={name} color={color} id={props.id}/>
          </tr>
      </React.Fragment>
  );
}
