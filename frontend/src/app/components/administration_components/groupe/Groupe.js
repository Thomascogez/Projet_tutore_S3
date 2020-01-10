import React, { useEffect, useState } from "react";
import { FaCheck, FaTimes, FaPen, FaTrash } from "react-icons/fa";
import InputColor from "react-input-color";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import { Badge, Button, ButtonGroup, FormInput, FormSelect } from "shards-react";
import { APIAddGroup, APIEditGroup } from "../../../api/groups";
import { getGroups } from "../../../providers/actions/groupActions";
import { errFetch } from "../../../utils/errorFetch";
import DeleteGroup from "./DeleteGroup";


export default function Groupe({ group }) {
    const [editing, setEditing] = useState((group === null));
    const [deleting, setDeleting] = useState(false);
    const [error, setError] = useState({});


    const dispatch = useDispatch();

    const groupState = useSelector(state => state.group);

    const [name, setName] = useState((group != null) ? group.name : "");
    const [color, setColor] = useState((group != null) ? group.color : "");
    const [parent, setParent] = useState((group != null) ? ((group.parent) ? group.parent : "") : "");

    const handleValidate = () => {
        let req = {
            name: name,
            color: color,
            parent: parent
        };
        if (group != null) req = { ...req, id: group.id };
        if (req.name === "") {
            toast.error("Le nom du groupe ne peut être vide !");
            setName((group != null) ? group.name : '');
        } else {
            if (group === null) {
                APIAddGroup(req)
                    .then(() => {
                        toast.success("Nouveau groupe ajouté !");
                        setEditing(false);
                        dispatch(getGroups());
                    })
                    .catch(err => {
                        setError(errFetch(err));
                    })
            } else {
                APIEditGroup(req)
                    .then(() => {
                        toast.success("Modification effectué !");
                        setName(req.name);
                        setColor(req.color);
                        setParent(req.parent);
                        setEditing(false);
                        dispatch(getGroups());
                    })
                    .catch(err => {
                        setError(errFetch(err));

                        setName(group.name);
                        setColor(group.color);
                        setParent((group.parent) ? group.parent.name : '');
                    })
            }
        }
    };

    useEffect(() => {
        Object.entries(error).map(m => {
            if (m[1]) toast.error(m[1][0]);
        })
    }, [error])

    const handleCancel = () => {
        setEditing(false);
    };

    return (
        <>
            <tr>
                <td>
                    {(group === null) ? (
                        editing ?
                            <FormInput value={name} invalid={error.name && true} onChange={e => setName(e.target.value)} placeholder="Nom ..." />
                            :
                            <a onClick={() => setEditing(true)} href="#"><span style={{ fontWeight: "bold" }}>Ajouter un groupe ...</span></a>
                    ) : (
                            editing ?
                                <FormInput value={name} invalid={error.name && true} onChange={e => setName(e.target.value)} placeholder="Nom ..." />
                                : <Badge style={{ backgroundColor: color, width: "100px" }}>{name}</Badge>
                        )}
                </td>
                <td>
                    <div style={{ width: 100 }}>
                        {editing ?
                            <InputColor initialHexColor={color} onChange={e => setColor(e.hex)} placement="right" />
                            :
                            <div style={{ color: color, fontSize: 15, fontWeight: "bold" }}>{color}</div>}
                    </div>
                </td>
                <td>
                    {editing ?
                        <FormSelect value={parent} onChange={(e) => setParent(e.target.value)}>
                            <option style={{ fontWeight: "bold" }} key={null}>Aucun groupe</option>
                            {groupState.groups.map(m => (
                                <React.Fragment>
                                    {m.name !== name ? (
                                        <option style={{ color: m.color, fontWeight: "bold" }} key={m.name}>
                                            {m.name}
                                        </option>
                                    ) : ""}
                                </React.Fragment>
                            ))}
                        </FormSelect>
                        : (
                            (group != null) ? (
                                (parent) ? <Badge style={{ backgroundColor: parent.color, width: "100px" }}>{parent.name}</Badge> : "Aucun groupe"
                            ) : (<></>)
                        )
                    }
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
                                {(group != null) ? (
                                    <>
                                        <Button onClick={() => setEditing(true)}><FaPen /></Button>
                                        <Button onClick={() => setDeleting(!deleting)} theme="danger"><FaTrash /></Button>
                                    </>
                                ) : (<React.Fragment />)}
                            </ButtonGroup>
                        )}
                </td>
                {(group != null) ? (
                    <DeleteGroup open={deleting} setOpen={setDeleting} name={name} color={color} id={group.id} />
                ) : (<></>)}
            </tr>
        </>
    );
}
