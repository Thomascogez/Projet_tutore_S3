import React, {useState} from "react";
import style from '../../pages/sessions/sessions.module.css'

import { FaCheckCircle } from 'react-icons/fa'
import Modal from './Modal'

export default function Matiere({color, name, finished, cours, typeCours, fichier, children}) {
  const [open, setOpen] = useState(false);
  return (
    <div onClick={() => setOpen(!open)} className={style.Work} >
      <Modal open={open} setOpen={setOpen} name={name} color={color} cours={cours} typeCours={typeCours} fichier={fichier} children={children} /> 
      {finished ? <div style={{float:"right",position:"relative", margin:"2px 5px 0px 0px", color:"green"}}><FaCheckCircle /></div>: ""}
      <div style={{borderLeftColor:color}} className={style.WorkContent}>
        <div style={finished ?{textDecoration:"line-through", color:"rgb(211,211,211)"} : {} } className={style.WorkTitle}>{name}</div>
        <span style={finished ?{textDecoration:"line-through", color:"rgb(211,211,211)"} : {} }>durée 1h00</span>
        <span style={finished ?{color:"rgb(211,211,211)"} : {} }>Date d'ajout : 24/12/19</span>
      </div>   
    </div>
  );
} 
