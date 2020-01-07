import React from "react";
import moment from 'moment';

export default function Session({session}) {

    return (
        <>
            <tr>
                <td >{moment(session.createdAt).format("DD/MM/YYYY")}</td>
                <td>{session.module.name}</td>
                <td>{session.groups && session.groups.map(groupeName => (groupeName.name + " "))}</td>
            </tr>
        </>
  );
}
