/**
 * Ajout
 *
 * Component by the route /ajoutUsers and contain all the functionnality to add a new Course / event
 */

import React from "react";

import { Container, FormGroup, FormInput, FormRadio } from "shards-react";
import style from "./ajoutUser.module.css";

export default function Ajout() {
  return (
    <Container className={style.Box}>
        <h2 style={{textAlign:"center"}}>Ajout d'un utilisateur</h2>

        <FormGroup className={style.FormGroup}>
            <label htmlFor="#id" className={style.LabelText}>Identifiant</label>
            <FormInput id="#id" className={style.FormInp} />
        </FormGroup>

        <FormGroup className={style.FormGroup}>
            <label htmlFor="#lastname" className={style.LabelText}>Nom</label>
            <FormInput id="#lastname" className={style.FormInp} />
        </FormGroup>

        <FormGroup className={style.FormGroup}>
            <label htmlFor="#firstname" className={style.LabelText}>Prénom</label>
            <FormInput id="#firstname" className={style.FormInp} />
        </FormGroup>

        <FormGroup className={style.FormGroup}>
            <label htmlFor="#role" className={style.LabelText}>Rôles</label>
            
        </FormGroup>


    </Container>
  );
}
