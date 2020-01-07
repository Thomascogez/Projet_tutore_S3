import React from 'react'
import { Container, Row, Col, Card, CardHeader, CardImg, CardBody, CardTitle, Button, CardFooter } from 'shards-react'
import { FaUserFriends, FaBookOpen } from 'react-icons/fa'
import { TiGroup } from 'react-icons/ti'
import { navigate } from 'hookrouter'
import style from './admin.module.css'
import {IoLogoBuffer} from "react-icons/io";
import {GiTeacher} from "react-icons/gi";

export default function index() {
    return (
        <Container fluid className={style.AdminCardContainer}>
            <Row>
                <Col sm="12" lg="4">
                    <Card className={style.AdminCard} >
                        <CardHeader></CardHeader>
                        <TiGroup className={style.AdminCardIcon} />
                        <CardBody>
                            <CardTitle>Gérer les groupes</CardTitle>
                            <p>Ajouter, modifier, supprimer.</p>
                            <Button className={style.AdminCardBtn} onClick = {() => navigate('/administration/groupe')}>Continuer</Button>
                        </CardBody>
                    </Card>
                </Col>
                <Col sm="12" lg="4">
                    <Card className={style.AdminCard} >
                        <CardHeader></CardHeader>
                        <FaUserFriends className={style.AdminCardIcon} />
                        <CardBody>
                            <CardTitle>Gérer les utilisateur</CardTitle>
                            <p>Ajouter, modifier, supprimer.</p>
                            <Button className={style.AdminCardBtn} onClick = {() => navigate('/administration/utilisateurs')}>Continuer</Button>
                        </CardBody>
                    </Card>

                </Col>
                <Col sm="12" lg="4">
                    <Card className={style.AdminCard} >
                        <CardHeader></CardHeader>
                        <IoLogoBuffer className={style.AdminCardIcon} />
                        <CardBody>
                            <CardTitle>Gérer les modules</CardTitle>
                            <p>Ajouter, modifier, supprimer.</p>
                            <Button className={style.AdminCardBtn} onClick = {() => navigate('/administration/modules')}>Continuer</Button>
                        </CardBody>
                    </Card>

                </Col>
            </Row>
            <Row style={{paddingTop: "20px"}}>
                <Col sm="12" lg="4">
                    <Card className={style.AdminCard} >
                        <CardHeader></CardHeader>
                        <FaBookOpen className={style.AdminCardIcon} />
                        <CardBody>
                            <CardTitle>Gérer les types<br/>(séances et évènements)</CardTitle>
                            <p>Ajouter, modifier, supprimer.</p>
                            <Button className={style.AdminCardBtn} onClick = {() => navigate('/administration/type')}>Continuer</Button>
                        </CardBody>
                    </Card>
                </Col>
                <Col sm="12" lg="4">
                    <Card className={style.AdminCard} >
                        <CardHeader></CardHeader>
                        <GiTeacher className={style.AdminCardIcon} />
                        <CardBody>
                            <CardTitle>Gérer les séances</CardTitle>
                            <p>Ajouter, modifier, supprimer.</p>
                            <Button className={style.AdminCardBtn} onClick = {() => navigate('/administration/sessions')}>Continuer</Button>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}
