import React from "react";
import {Button} from 'shards-react';
import moment from 'moment';
import {MdDelete} from 'react-icons/md';
import {APIdelSessionID} from '../../api/sessionFetch';
import {navigate} from 'hookrouter'

export default function Session({session}) {

    const delSession = (id) => {
        APIdelSessionID(id);
        setTimeout(function(){
            window.location.reload();
        }, 500);
        
    }

    return (
        <>
            {console.log(session)}
            <tr>
                <td >{moment(session.createdAt).format("DD/MM/YYYY")}</td>
                <td>{session.module.name}</td>
                <td>{session.groups && session.groups.map(groupeName => (groupeName.name + " "))}</td>
                <td>
                    <Button onClick={() => navigate('/seances/modifier')}>Edit</Button>
                    <Button theme='danger' style={{height:'41px', marginLeft:'5px'}} onClick={() => delSession(session.id)}><MdDelete size={20}/></Button>                
                </td>
            </tr>
        </>
  );
}
