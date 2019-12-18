import React from "react";
import { Container, Button } from "shards-react";
import TransitionGroup from 'react-addons-transition-group'

import User from '../../../components/administration_components/utilisateurs/User'
import style from "./administration-utilisateur.module.css";
export default function index() {
  return (
    <Container fluid className={style.AdmnUtilisateurContainer}>
        <div className = { style.AdmnActions }>

        </div>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Identifiant</th>
            <th scope="col">Nom</th>
            <th scope="col">Prénom</th>
            <th scope="col">Groupes</th>
            <th scope="col">Autorisations</th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
            <User identifier="XXXXXXX" name="John" surname="Doe" groups="J1, J2" roles="Administrateur professeur" /> 
        </tbody>
      </table>
    </Container>
  );
}
