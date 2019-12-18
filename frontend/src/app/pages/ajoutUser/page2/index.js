/**
 * Ajout
 *
 * Component by the route /ajoutUsers and contain all the functionnality to add a new Course / event
 */

import React, { useState } from "react";

import { Container, FormGroup, Button, FormSelect } from "shards-react";
import style from "./ajoutUser.module.css";

export default function Ajout() {
  const [groupe, setGroupe] = useState([]);


  return (
    <Container className={style.Box}>
      <FormGroup className={style.FormGroup}>
        <label htmlFor="#groups" className={style.LabelText}>
          Groupes
        </label>

        <FormSelect onChange={e => setGroupe([...groupe, e.target.value])} className={style.FormSelect}>
          <option value="j1">J1</option>
          <option value="j2">J2</option>
          <option value="j2">G2</option>
          <option value="j2">G1</option>
        </FormSelect>
      </FormGroup>

      <Button outline squared className={style.Btn}>Créer</Button>

    </Container>
  );
}
