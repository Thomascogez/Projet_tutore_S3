/**
 * Ajout
 *
 * Component by the route /ajoutUsers and contain all the functionnality to add a new Course / event
 */

import React, { useState } from "react";

import {Container} from "shards-react";
import style from "./addUser.module.css";
import Toggle from '../../components/options_components/Toggle'

export default function Options() {
  const [coul, setCoul] = useState("white");

  return (
    <Container className={style.Box} style={{backgroundColor:(coul =="white"? "gray":"white"), color:(coul =="white"? "white":"gray")}}>
        <div className={style.Titre}><label htmlFor="#modules" className={style.LabelText}>Options</label></div>
        <div className={style.Form}>
            <Toggle text="Thème sombre"/>
        </div>

        <div style={{width:"20px", height:"20px", backgroundColor:(coul =="white"? "white":"gray")}} onClick={() => setCoul(coul =="white"? "gray":"white")}/>
    </Container>
  );
}
