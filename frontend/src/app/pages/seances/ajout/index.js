/**
 * Ajout
 * 
 * Component by the route /ajout and contain all the functionnality to add a new Course / event
 */

import React from 'react'

import { Container, Row, Col, FormSelect } from 'shards-react'
import style from './ajout.module.css'


export default function Ajout() {
    return (
        <Container fluid className={style.AddContainer}>
            <h1>Ajouter une Séance</h1>
            <Row>
                <Col sm="12" lg="12">
                    <FormSelect className= {style.AddSelector}>
                        <option value="first">This is the first option</option>
                        <option value="second">This is the second option.</option>
                        <option value="third" disabled>This option is disabled.</option>
                    </FormSelect>
                    <FormSelect className= {style.AddSelector}>
                        <option value="first">This is the first option</option>
                        <option value="second">This is the second option.</option>
                        <option value="third" disabled>This option is disabled.</option>
                    </FormSelect>
                </Col>
            </Row>
        </Container>
    )
}
