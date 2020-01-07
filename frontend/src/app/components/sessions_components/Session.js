import React from "react";
import moment from 'moment';

export default function Session({session}) {

    return (
        <React.Fragment>
            {console.log(session)}
            <tr style={{border:"1px solid black"}}>
                <td>{moment(session.createdAt).format("DD/MM/YYYY")}</td>
                <td>{session.module.name}</td>
                <td>{session.groupe.map(groupeName => ( {groupeName}))}</td>
            </tr>
        </React.Fragment>
  );
}
