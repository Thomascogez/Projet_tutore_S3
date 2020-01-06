import React from 'react'
import style from '../../pages/sessions/sessions.module.css'

import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import moment from "moment";

export default function WeekSelector({date, getSetDate}) {
    const jsUcfirst = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return (
        <div className= {style.MounthSelector}>

            <a href="javascript:void(0)"><GoArrowLeft style={{float:"left",width: "34%",textAlign:"left"}}   onClick={() => getSetDate(moment(date).subtract("1", "M"))} /></a>
            <span style={{float:"left",width: "33%",textAlign:"center", fontWeight: "bold"}}>{jsUcfirst(moment(date).format("MMMM YYYY"))}</span>
            <a href="javascript:void(0)"><GoArrowRight style={{float:"left",width: "33%",textAlign:"right"}} onClick={() => getSetDate(moment(date).add("1", "M"))}      /></a>
            <div style={{clear: "both"}}/>
        </div>
    )
}