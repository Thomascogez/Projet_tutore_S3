/**
 * Ajout
 *
 * Component by the route /ajoutUsers and contain all the functionnality to add a new Course / event
 */

import React, { useState } from "react";

import {Container, FormGroup, Button, FormSelect, NavLink} from "shards-react";
import style from "./addUser.module.css";
import CheckBox from '../../../../../components/addUser_components/CheckBox'
import {navigate} from "hookrouter";
import { FaArrowRight } from "react-icons/fa";

export default function Ajout() {
  const [groupe, setGroupe] = useState([]);

  return (
    <div className={style.BoxGenerale}>
      <Container className={style.Box}>
        <div className={style.Titre}><label htmlFor="#modules" className={style.LabelText}>Modules</label></div>
        <div className={style.Form}>
          <CheckBox id="maths" value="Mathématiques"/>
          <CheckBox id="cpoa" value="CPOA"/>
          <CheckBox id="bado" value="BADO"/>
        </div>
      </Container>

      <Container className={style.Box2}>
        <FormGroup className={style.FormGroup}>
          <div className={style.Titre}><label htmlFor="#groups" className={style.LabelText}>Groupes</label></div>

            <FormSelect onChange={e => setGroupe([...groupe, e.target.value])} className={style.FormSelect}>
              <option value="j1">J1</option>
              <option value="j2">J2</option>
              <option value="j2">G2</option>
              <option value="j2">G1</option>
            </FormSelect>
          </FormGroup>

          <NavLink onClick={() => navigate("/administration/utilisateurs/ajout/etape2")}>
            <Button type="success" className={style.Btn}>Suivant <FaArrowRight /></Button>
          </NavLink>
      </Container>
    </div>
  );
}
