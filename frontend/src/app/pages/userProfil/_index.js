import React, { useState } from 'react'
import { Container, Row, Col, Card, CardHeader, CardTitle, CardBody, Badge, Collapse, FormInput, FormGroup, Button } from 'shards-react'
import { FaAngleRight, FaAngleDown } from 'react-icons/fa'
import style from './_userprofile.module.css'

import ProfileRound from '../../components/profileRound_component/ProfileRound'
export default function UserProfile() {
    const [collapseGroup, setcollapseGroup] = useState(false);
    const [collapseEdit, setcollapseEdit] = useState(true);
    return (
        <Container fluid className={style.UserProfileContainer}>
            <Row className={style.UserProfileRow}>
                <Col sm="12" lg="4">
                    <Card className={style.UserCard} >
                        <ProfileRound className={style.UserProfileLetter} bgcolor='red' letter="t" fcolor="#fff" />
                        <CardBody>
                            <CardTitle>Thomas Cogez--Allix</CardTitle>
                            <Badge theme="light">ct183385</Badge>
                        </CardBody>

                    </Card>

                </Col>
                <Col sm="12" lg="8">
                    <Card className={style.UserEditCard} >
                        <CardHeader style={{fontSize:"25px",fontWeight:"400"}}>Vos Informations</CardHeader>
                        <CardBody>
                            <div onClick={() => setcollapseGroup(!collapseGroup)} className={style.ViewCollapse}>
                            {collapseGroup? <FaAngleDown /> : <FaAngleRight/>} Voir vos groupes
                            </div>
                            <Collapse open={collapseGroup}>
                                <div className={style.Group}><h5>Info J1</h5></div>
                            </Collapse>

                            <div onClick={() => setcollapseEdit(!collapseEdit)} className={style.ViewCollapse}>
                            {collapseEdit? <FaAngleDown /> : <FaAngleRight/>} Edition de vos information
                            </div>
                            <Collapse open={collapseEdit}>
                                <Row>
                                    <Col sm="12" lg="6"><FormGroup><label htmlFor="#name">Nom</label><FormInput id="#name" placeholder="Votre nom ..." /></FormGroup></Col>
                                    <Col sm="12" lg="6"><FormGroup><label htmlFor="#surname">Prénom</label><FormInput id="#surname" placeholder="Votre prénom ..." /></FormGroup></Col>
                                    <Col sm="12" lg="6"><FormGroup><label htmlFor="#password">Mot de passe</label><FormInput id="#password" placeholder="Votre nom ..." /></FormGroup></Col>
                                    
                                </Row>
                                <Button style={{width:"100%",margin:"10px auto 0px auto"}} theme="primary">Valider vos Changement</Button>
                            </Collapse>


                        </CardBody>

                    </Card>

                </Col>
            </Row>
        </Container>
    )
}
