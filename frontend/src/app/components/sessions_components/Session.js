import React from "react";
import {Button} from 'shards-react';
import moment from 'moment';
import {MdDelete} from 'react-icons/md';
import {APIdelSessionID} from '../../api/sessionFetch';

export default function Session({session}) {
    
    const delSession = (id) => {
        APIdelSessionID(id)
    }

    return (
        <>
            {console.log(session)}
            <tr>
                <td >{moment(session.createdAt).format("DD/MM/YYYY")}</td>
                <td>{session.module.name}</td>
                <td>{session.groups && session.groups.map(groupeName => (groupeName.name + " "))}</td>
                <td><Button theme='danger' onClick={() => delSession(session.id)}><MdDelete size={25}/></Button></td>
            </tr>
        </>
  );
}
