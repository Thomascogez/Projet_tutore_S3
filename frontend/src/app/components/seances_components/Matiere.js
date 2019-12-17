import React from "react";
import { Button } from "shards-react";
import style from "../../pages/seances/seances.module.css";
export default function Matiere(props) {
  return (
    <div className={style.Matiere}>
      <div style={{borderLeftColor:props.color}} className={style.MatiereContent}>
        <div className={style.MatiereTitle}>{props.name}</div>
        <span>durée 1h00</span>
      </div>
    </div>
  );
}
