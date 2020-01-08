import React, {useState} from "react";
import style from '../../pages/sessions/sessions.module.css'

import { navigate } from "hookrouter"

import { FaCheckCircle } from 'react-icons/fa'
import {Badge, Row} from "shards-react";
export default function Matiere({color, name, duration, finished, id, groups, type}) {

    return (
        <div id={"tooltip_" + id} onClick={() => navigate('seance/' + id)} className={style.Work} >
            {finished === 1 ? <div style={{float:"right",position:"relative", margin:"2px 5px 0px 0px", color:"green"}}><FaCheckCircle /></div>: ""}

            <div style={{borderLeftColor:color}} className={style.WorkContent}>
                <Row style={{marginLeft: "7px"}}>
                    <div style={finished === 1? { color:"rgb(211,211,211)"} : {} } className={style.WorkTitle}>{name} <Badge theme="success" style={{fontSize: "9px", display: "inline"}}>{type && type}</Badge></div>
                </Row>
                {duration?(
                    <span style={finished === 1 ?{ color:"rgb(211,211,211)"} : {} }> durée : {('0' + Math.floor(duration) % 24).slice(-2) + 'h' + ((duration % 1)*60 + '0').slice(0, 2)} </span>
                ):("Durée : Aucune")}
                <span style={finished === 1 ?{ color:"rgb(211,211,211)"} : {fontWeight:"490"} }>  </span>

                <div style={ finished === 1 ? {backgroundColor:"rgb(211,211,211)", height:"20%", width:"10%", margin:" 10px 10px 10px 200px " } : {backgroundColor:"rgb(33,187,3)", height:"20%", width:"10%",margin:" 10px 10px 10px 200px"}}  > </div>
            </div>
        </div>
    );
}