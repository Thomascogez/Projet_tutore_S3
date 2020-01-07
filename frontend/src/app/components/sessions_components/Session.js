import React from "react";
import moment from 'moment';

export default function Session({session}) {

    return (
        <React.Fragment>
            <tr>
                <td >{moment(session.createdAt).format("DD/MM/YYYY")}</td>
                <td>{session.module.name}</td>
                <td></td>
            </tr>
        </React.Fragment>
  );
}
