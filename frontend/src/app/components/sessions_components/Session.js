import React from "react";
import { Badge, Button } from 'shards-react';
import moment from 'moment';
import { MdDelete } from 'react-icons/md';
import { APIdelSessionID } from '../../api/sessionFetch';
import { navigate } from 'hookrouter'

export default function Session({ session, setRefresh, refresh }) {

    const delSession = (id) => {
        APIdelSessionID(id).then(() => {
            setRefresh(refresh+1)
        })
    }

    return (
        <>
            <tr>
                <td >{moment(session.createdAt).format("DD/MM/YYYY")}</td>
                <td><Badge style={{ backgroundColor: session.module.color, width: "100px" }}>{session.module.name}</Badge></td>
                <td>{session.groups && session.groups.map(group => (<Badge style={{ backgroundColor: group.color, marginRight: "2px" }}>{group.name}</Badge>))}</td>
                <td>
                    <Button onClick={() => navigate(`/seances/modifier/${session.id}`)}>Éditer</Button>
                    <Button theme='danger' style={{ height: '41px', marginLeft: '5px' }} onClick={() => delSession(session.id)}><MdDelete size={20} /></Button>
                </td>
            </tr>
        </>
    );
}