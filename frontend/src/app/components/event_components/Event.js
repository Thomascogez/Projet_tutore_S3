import { navigate } from 'hookrouter';
import moment from 'moment';
import React from 'react';
import { FaFileAlt, FaPen } from 'react-icons/fa';
import { Badge } from 'shards-react';
import ModalViewDetail from './ModalViewDetails';
import ModalViewFiles from './ModalViewsFiles';


export default function Event({ data, editable }) {

  return (
    <tr key={data.id}>
      <td>
        {data.type === "fait" ? (
          <Badge theme="info">{data.type}</Badge>
        ) : (
            <Badge theme="warning">{data.type}</Badge>
          )}
      </td>
      <td scope="row">{`${data.user.firstname} ${data.user.lastname}`}</td>
      <td>
        <ModalViewDetail text={data.name} />
      </td>
      <td>
        {data.duration ? (
          ('0' + Math.floor(data.duration) % 24).slice(-2) + 'h' + ((data.duration % 1) * 60 + '0').slice(0, 2)
        ) : ("Pas définie")}
      </td>

      <td>{(data.dueAt) ? (moment(data.dueAt).format("DD/MM/YYYY")) : "Pas définie"}</td>

      <td style={{ textAlign: "center" }}>
        {data.attachmentEvents.length !== 0 ? (
          <ModalViewFiles
            files={data.attachmentEvents}
          ></ModalViewFiles>
        ) : (
            <FaFileAlt style={{ color: "grey" }} />
          )}
      </td>
      {editable && <td><FaPen style={{ cursor: "pointer" }} onClick={() => navigate(`/evenement/modifier/${data.id}`)} /></td>}
    </tr>
  )
}