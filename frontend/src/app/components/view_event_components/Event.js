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
        <td>00h30</td>

        <td>{moment(data.dueAt).format("MM/DD/YYYY")}</td>

        <td style={{ textAlign: "center" }}>
          {data.attachmentEvents.length !== 0 ? (
            <ModalViewFiles
              files={data.attachmentdatas}
            />
          ) : (
            <FaFileAlt style={{ color: "grey" }} />
          )}
        </td>
      </tr>
    )
}
