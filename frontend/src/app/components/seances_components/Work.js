import React from "react";
import style from "../../pages/seances/seances.module.css";
import { FaCheckCircle } from 'react-icons/fa'
export default function Matiere({color, name, finished}) {
  return (
    <div className={style.Work}>

      {finished ? <div style={{float:"right",position:"relative", margin:"2px 5px 0px 0px", color:"green"}}><FaCheckCircle /></div>: ""}
      <div style={{borderLeftColor:color}} className={style.WorkContent}>
        <div style={finished ?{textDecoration:"line-through", color:"rgb(211,211,211)"} : {} } className={style.WorkTitle}>{name}</div>
        <span style={finished ?{textDecoration:"line-through", color:"rgb(211,211,211)"} : {} }>durée 1h00</span>
        <span style={finished ?{color:"rgb(211,211,211)"} : {} }>Date d'ajout : 24/12/19</span>
      </div>
      
    </div>
  );
}
