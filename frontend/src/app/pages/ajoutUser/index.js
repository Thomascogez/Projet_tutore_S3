/**
 * Ajout
 *
 * Component by the route /ajoutUsers and contain all the functionnality to add a new Course / event
 */

import React, { useState } from "react";

import { Container, FormGroup, FormInput, Button } from "shards-react";
import style from "./ajoutUser.module.css";

export default function Ajout() {
  return (
    <Container className={style.Box}>
      <h2 style={{ textAlign: "center" }}>Ajout d'un utilisateur</h2>

      <div className={style.SousBox}>
        <FormGroup className={style.FormGroup}>
          <label htmlFor="#id" className={style.LabelText}>
            Identifiant
          </label>
          <FormInput id="#id" className={style.FormInp} />
        </FormGroup>

        <FormGroup className={style.FormGroup}>
          <label htmlFor="#lastname" className={style.LabelText}>
            Nom
          </label>
          <FormInput id="#lastname" className={style.FormInp} />
        </FormGroup>

        <FormGroup className={style.FormGroup}>
          <label htmlFor="#firstname" className={style.LabelText}>
            Prénom
          </label>
          <FormInput id="#firstname" className={style.FormInp} />
        </FormGroup>

        <FormGroup className={style.FormGroup2}>
        <label htmlFor="#roles" className={style.LabelText}>Rôles</label>

        <div className={style.Form}>
          <div className="custom-control custom-radio">
            <input
              type="radio"
              id="enseignant"
              name="customRadio"
              className="custom-control-input"
            />
            <label className="custom-control-label" for="enseignant">Enseignant</label>
          </div>
          <div className="custom-control custom-radio">
            <input
              type="radio"
              id="tuteur"
              name="customRadio"
              className="custom-control-input"
            />
            <label className="custom-control-label" for="tuteur">Tuteur</label>
          </div>
          <div className="custom-control custom-checkbox">
            <input type="checkbox" className="custom-control-input" id="admin" />
            <label className="custom-control-label" for="admin">Administrateur</label>
          </div>
        </div>
      </FormGroup>

      <Button outline squared className={style.Btn}>Suivant</Button>

      </div>

    </Container>
  );
}
