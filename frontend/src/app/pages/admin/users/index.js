import React from "react";
import {
  Container,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  FormInput
} from "shards-react";
import { FaSearch } from "react-icons/fa";

import User from "../../../components/administration_components/utilisateurs/User";
import style from "./users.module.css";

export default function index() {

  const testData =["J1","C1","H1"] //display testing only
  return (
    <Container fluid className={style.AdmnUtilisateurContainer}>
      <h1 className= {style.AdmnUtilisateurTitle }>Gestion des utilisateurs</h1>
      <div className={style.AdmnActions}>
        <InputGroup className= {style.AdmnActionsInpt} seamless>
          <InputGroupAddon type="append">
            <InputGroupText>
              <FaSearch />
            </InputGroupText>
          </InputGroupAddon>
          <FormInput placeholder="Rechercher un utilisateur ...." />
        </InputGroup>
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
          </tr>
        </thead>
        <tbody>
          <User
            identifier="XXXXXXX"
            name="John"
            surname="Doe"
            groups={testData}
            roles="Administrateur professeur"
          />
        </tbody>
      </table>
    </Container>
  );
}
