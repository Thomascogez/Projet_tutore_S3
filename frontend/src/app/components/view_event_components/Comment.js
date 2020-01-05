import React from "react";
import moment from 'moment'
import ProfileRound from '../profileRound_component/ProfileRound'
export default function Comment({data}) {
  return (
    <tr>
      <td style={{ textAlign: "center" }}>
        {" "}
        <ProfileRound
          size="Small"
          letter={data.user.username.charAt(0)}
          bgcolor={"red"}
          fcolor="#fff"
        />
        {data.user.username}
      </td>
      <td>{data.comment}</td>
      <td>{moment(data.createdAt).format("MM/DD/YYYY")}</td>
    </tr>
  );
}
