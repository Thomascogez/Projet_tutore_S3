import React, {useState} from "react";
import style from '../../pages/sessions/sessions.module.css'

import { navigate } from "hookrouter"

import { FaCheckCircle } from 'react-icons/fa'
import {Badge, Row} from "shards-react";
export default function Matiere({color, name, duration, done, finished, id, groups, type}) {

    return (
        <div onClick={() => navigate('seance/' + id)} className={style.Work} >


            {finished ? <div style={{float:"right",position:"relative", margin:"2px 5px 0px 0px", color:"green"}}><FaCheckCircle /></div>: ""}

            <div style={{borderLeftColor:color}} className={style.WorkContent}>
                <Row style={{marginLeft: "7px"}}>
                    <div style={finished ?{textDecoration:"line-through", color:"rgb(211,211,211)"} : {} } className={style.WorkTitle}>{name} <Badge theme="success" style={{maxWidth: "40px", display: "inline"}}>{type && type}</Badge></div>
                </Row>
                <Row style={{marginLeft: "7px", marginTop: "4px"}}>
                    {groups.map(group => (<Badge style={{backgroundColor: group.color, marginRight: "5px"}}>{group.name}</Badge>))}
                </Row>
                {duration?(
                    <span style={finished ?{textDecoration:"line-through", color:"rgb(211,211,211)"} : {} }> durée : {('0' + Math.floor(duration) % 24).slice(-2) + 'h' + ((duration % 1)*60 + '0').slice(0, 2)} </span>
                ):("Durée : Aucune")}

                <span style={finished ?{textDecoration:"line-through",color:"rgb(211,211,211)"} : {fontWeight:"490"} }> {done}</span>
            </div>
        </div>
    );
} 
