import React, {useState} from "react";
import style from '../../pages/sessions/sessions.module.css'

import { FaCheckCircle } from 'react-icons/fa'
export default function Matiere({color, name, duration,done, finished}) {
  const [open, setOpen] = useState(false);
  return (
    <div onClick={() => setOpen(!open)} className={style.Work} >

     
      {finished ? <div style={{float:"right",position:"relative", margin:"2px 5px 0px 0px", color:"green"}}><FaCheckCircle /></div>: ""}
      <div style={{borderLeftColor:color}} className={style.WorkContent}>
        <div style={finished ?{textDecoration:"line-through", color:"rgb(211,211,211)"} : {} } className={style.WorkTitle}>{name}</div>
        <span style={finished ?{textDecoration:"line-through", color:"rgb(211,211,211)"} : {} }> {duration} </span>
        <span style={finished ?{textDecoration:"line-through",color:"rgb(211,211,211)"} : {fontWeight:"490"} }> {done}</span>
      </div>        
    </div>
  );
} 
