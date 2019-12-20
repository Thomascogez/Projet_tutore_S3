/**
 * Ajout
 *
 * Component by the route /ajoutUsers and contain all the functionnality to add a new Course / event
 */

import React, { useState } from "react";

import {Container, FormGroup, Button, FormInput, NavLink, Row, Col} from "shards-react";
import style from "./addUser.module.css";
import CheckBox from '../../../../../components/addUser_components/CheckBox'
import {navigate} from "hookrouter";
import { FaArrowRight } from "react-icons/fa";
import { Multiselect } from 'react-widgets'

export default function Ajout() {
  const [groupe, setGroupe] = useState([]);
  const tabGroup = ["J1","J2","G1","G2"]
  const tabModule = ["Maths","CPOA","ALGO","MPA"]

  return (
    <div className={style.BoxGenerale}>
        <Container className="dr-example-container">
            <Row>
                <Col sm="12" lg="6">
                    <Container className={style.Box}>
                        <FormGroup className={style.FormGroup}>
                            <div className={style.Titre}><label htmlFor="#modules" className={style.LabelText}>Modules</label></div>
                        </FormGroup>
                        <Multiselect
                            placeholder="Selectionner un/des module(s)..."
                            data={tabModule}
                        />
                    </Container>
                </Col>
                <Col sm="12" lg="6">
                    <Container className={style.Box}>
                        <FormGroup className={style.FormGroup}>
                            <div className={style.Titre}><label htmlFor="#groups" className={style.LabelText}>Groupes</label></div>
                        </FormGroup>

                        <Multiselect
                            placeholder="Selectionner un/des groupe(s)..."
                            data={tabGroup}
                        />

                        <NavLink onClick={() => navigate("/administration/utilisateurs/ajout/etape2")}>
                            <Button type="success" className={style.Btn}>Suivant <FaArrowRight /></Button>
                        </NavLink>
                    </Container>
                </Col>
            </Row>
        </Container>
    </div>
  );
}
