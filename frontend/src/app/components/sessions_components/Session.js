import React from "react";
import {Button} from 'shards-react';
import moment from 'moment';
import {MdDelete} from 'react-icons/md';

export default function Session({session}) {

    return (
        <>
            <tr>
                <td >{moment(session.createdAt).format("DD/MM/YYYY")}</td>
                <td>{session.module.name}</td>
                <td>{session.groups && session.groups.map(groupeName => (groupeName.name + " "))}</td>
                <td><Button theme='danger' onClick={() => alert("CHEH !")}><MdDelete size={25}/></Button></td>
            </tr>
        </>
  );
}
