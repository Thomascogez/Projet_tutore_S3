/**
 * Ajout
 *
 * Component by the route /ajoutUsers and contain all the functionnality to add a new Course / event
 */

import React, { useState } from "react";

import {Container} from "shards-react";
import style from "./addUser.module.css";
import { FormCheckbox } from "shards-react";

export default function Options() {
	const [coul, setCoul] = useState("white");
	const [btnAct, setBtnAct] = useState(false);

	const handleChange = (coul) => {
		setCoul(coul =="white"? "gray":"white");
		setBtnAct(!btnAct);

	}

	return (
		<Container fluid className={style.Box} style={{backgroundColor:(coul =="white"? "gray":"white"), color:(coul =="white"? "white":"gray")}}>
				<div className={style.Titre}><label htmlFor="#modules" className={style.LabelText}>Options</label></div>
				<div className={style.Form}>
						<FormCheckbox toggle style={{width:"20px", height:"20px"}} checked={btnAct} onChange={() => handleChange(coul=='white'?'white':'gray')}>
							Thème sombre
						</FormCheckbox>
				</div>
		</Container>
	);
}
