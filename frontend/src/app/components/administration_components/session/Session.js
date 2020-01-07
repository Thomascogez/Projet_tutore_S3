import React, { useState } from "react";
import {Badge, Button} from "shards-react";
import moment from "moment";

export default function Session(props) {

    const [deleting,  setDeleting] = useState(false);

    props = props.session;

    return (
        <tr>
            <td>{moment(props.createdAt).format("DD-MM-YYYY")}</td>
            <td>{props.user.firstname + " " + props.user.lastname}</td>
            <td>{props.module.name}</td>
            <td>
                {props.groups.map(m => <Badge style={{backgroundColor: m.color, marginRight: "10px"}}>{m.name}</Badge>)}
            </td>
            <td><Badge theme="success">{props.type}</Badge></td>
            <td>
                <Button onClick={() => setDeleting(!deleting)} theme="danger">X</Button>
            </td>
        </tr>
    );
}
