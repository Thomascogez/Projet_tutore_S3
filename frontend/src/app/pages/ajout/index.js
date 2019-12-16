import React from 'react'
import TextZone from '../../components/ajout_seance/TextZone'
import Button from '../../components/ajout_seance/Bouton'
import InpText from '../../components/ajout_seance/InputText'
import style from './style.module.css'

import { FormSelect, Container, Row, Col, InputGroup, FormInput, InputGroupAddon } from "shards-react"

export default function Ajout() {
    return (
        <div className={style.Zone}>
            <TextZone text="Ajout de contenu" />

            <br/>

            <Container>
                <Row style={{textAlign:'left'}}>
                    <Col  sm="12" lg="4">
                        <FormSelect className={style.SelectControl}>
                            <option value="maths">Mathématiques</option>
                            <option value="second">This is the second option.</option>
                        </FormSelect>  
                    </Col>
                    <Col  sm="12" lg="4">
                        <FormSelect className={style.SelectControl}>
                            <option value="TD">TD</option>
                            <option value="second">This is the second option.</option>
                        </FormSelect>
                    </Col>
                    <Col sm="12" lg="4">
                        <Button name="Ajouter" color="#177E89"/>
                    </Col>
                </Row>
            </Container>

            <br/>

            <TextZone text="Détails du cours" />

            <br/>

            <InpText ph="détails..."/>

            <br/>

            <InputGroup>
                <FormInput placeholder="" />
                <InputGroupAddon type="append">
                    <Button name="Browse"/>
                </InputGroupAddon>
            </InputGroup>
        </div>
    )
}
