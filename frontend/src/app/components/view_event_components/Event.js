import React from 'react'
import ModalViewDetail from './ModalViewDetails'
import ModalViewFiles from './ModalViewsFiles'
import moment from 'moment';
import { FaFileAlt } from 'react-icons/fa';
import { Badge } from 'shards-react'

export default function data({data}) {

    return (
        <tr key={data.id}>
        <td>
          {data.type === "fait" ? (
            <Badge theme="info">{data.type}</Badge>
          ) : (
            <Badge theme="warning">{data.type}</Badge>
          )}
        </td>
        <th scope="row">{`${data.user.firstname} ${data.user.lastname}`}</th>
        <td>
          <ModalViewDetail text={data.name} />
        </td>
        { console.log( data ) }
        <td>  {('0' + Math.floor(data.duration) % 24).slice(-2) + 'h' + ((data.duration % 1)*60 + '0').slice(0, 2)} </td>

        <td>{moment(data.dueAt).format("DD/MM//YYYY")}</td>

        <td style={{ textAlign: "center" }}>
          {data.attachmentEvents.length !== 0 ? (
            <ModalViewFiles
              files={data.attachmentEvents}
            />
          ) : (
            <FaFileAlt style={{ color: "grey" }} />
          )}
        </td>
      </tr>
    )
}
