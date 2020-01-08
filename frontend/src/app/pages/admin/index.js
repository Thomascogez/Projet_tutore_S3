import React from 'react'
import { Container, Row, Col, Card, CardHeader, CardBody, CardTitle, Button, } from 'shards-react'
import { FaUserFriends, FaBookOpen } from 'react-icons/fa'
import { TiGroup } from 'react-icons/ti'
import { navigate } from 'hookrouter'
import style from './admin.module.css'
import {IoLogoBuffer} from "react-icons/io";
import {GiTeacher} from "react-icons/gi";
import {GoGear} from "react-icons/go";

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
            <Row>
                <Col sm="12" lg="4">
                    <Card className={style.AdminCard} >
                        <CardHeader></CardHeader>
                        <FaBookOpen className={style.AdminCardIcon} />
                        <CardBody className={style.AdminCardType}>
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
                <Col sm="12" lg="4">
                    <Card className={style.AdminCard} >
                        <CardHeader></CardHeader>
                        <GoGear className={style.AdminCardIcon} />
                        <CardBody>
                            <CardTitle>Gérer les paramètres</CardTitle>
                            <p>paramètres du site.</p>
                            <Button className={style.AdminCardBtn} onClick = {() => navigate('/administration/parametres')}>Continuer</Button>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}
