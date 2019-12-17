import React from 'react'

import style from '../../pages/seances/seances.module.css';
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
export default function WeekSelector(props) {
    return (
        <div className= {style.MounthSelector}>
            
            <GoArrowLeft style={{float:"left",width: "34%",textAlign:"left"}} />
            <span style={{float:"left",width: "33%",textAlign:"center"}}>{props.mounth}</span>
            <GoArrowRight style={{float:"left",width: "33%",textAlign:"right"}} />
            <div style={{clear:"both"}}></div>
        </div>
    )
}
