import { navigate } from "hookrouter";
import moment from 'moment';
import React from "react";
import ProfileRound from '../profileRound_component/ProfileRound';
import PropTypes from 'prop-types'

export default function Comment({ data }) {

  Comment.propTypes = {

    /** Objet json représentant les données d'un commentaire */
    data : PropTypes.object

  }

  return (
    <tr>
      <td style={{ textAlign: "center" }}>
        {" "}

        <a onClick={() => navigate("/profil/" + data.user.id)}>
          <ProfileRound
            size="Small"
            letter={data.user.firstname &&
              data.user.firstname.charAt(0)}
            bgcolor={data.user.color}
            fcolor="#fff"
          />
        </a>
        {data.user.username}
      </td>
      <td>{data.comment}</td>
      <td>{moment(data.createdAt).format("DD/MM/YYYY")}</td>
    </tr>
  );
}
