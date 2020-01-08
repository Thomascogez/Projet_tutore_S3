import React from "react";
import moment from 'moment'
import ProfileRound from '../profileRound_component/ProfileRound'
import {navigate} from "hookrouter";

export default function Comment({data}) {
  console.log(data);
  
  return (
    <tr>
      <td style={{ textAlign: "center" }}>
        {" "}

        <a onClick={() => navigate("/profil/"+data.user.id)}>
            <ProfileRound
                size="Small"
                letter={ data.user.username &&
                  data.user.username.charAt(data.user.username.length - 1)}
                bgcolor={data.user.color}
                fcolor="#fff"
            />
        </a>
        {data.user.username}
      </td>
      <td>{data.comment}</td>
      <td>{moment(data.createdAt).format("MM/DD/YYYY")}</td>
    </tr>
  );
}
