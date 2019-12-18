import React from 'react'
import style from '../../seances/seances.module.css'
import { FaSearch } from "react-icons/fa"
import {
    Button,
    InputGroup,
    InputGroupText,
    InputGroupAddon,
    FormInput,
    Container, 
    Row, 
    Col
  } from "shards-react"

function barreRecherche()
{
    return(
        <div>
            <InputGroup seamless>
                    <InputGroupAddon type="prepend">                  
                        <InputGroupText>
                            <FormInput placeholder="Module"/>  
                            <Button ><FaSearch /></Button>
                        </InputGroupText>
                    </InputGroupAddon>
            </InputGroup>
        </div>
    )
}

export default function gererModule({lstModule})
{
    return (
        <div>
            <h1 style={{padding:20}}>Gestion des modules</h1>   
            {barreRecherche()}
            <div style={{borderStyle:'solid', marginTop:50}}>
            <Container fluid className={style.SeancesContainer}>
                <Row>
                    <Col>Module</Col>
                    <Col>Couleur</Col>
                    <Col>Enseignant</Col>
                </Row>
                <Row>
                    <Col></Col>
                </Row>
            </Container>
            </div>
        </div>
    )

}