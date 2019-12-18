import React from 'react'
import { Container, Row, Col, Card, CardHeader, CardImg, CardBody, CardTitle, Button, CardFooter } from 'shards-react'
import { FaUserPlus, FaUserFriends, FaBookReader } from 'react-icons/fa'
import style from './administration.module.css'

export default function index() {
    return (
        <Container fluid className={style.AdminCardContainer}>
            <Row>
                <Col sm="12" lg="4">
                    <Card className={style.AdminCard} >
                        <CardHeader></CardHeader>
                        <FaUserPlus className={style.AdminCardIcon} />
                        <CardBody>
                            <CardTitle>Ajouter un utilisateur</CardTitle>
                            <p>Lorem ipsum dolor sit amet.</p>
                            <Button className={style.AdminCardBtn}>Continuer</Button>
                        </CardBody>
                    </Card>

                </Col>
                <Col sm="12" lg="4">
                    <Card className={style.AdminCard} >
                        <CardHeader></CardHeader>
                        <FaUserFriends className={style.AdminCardIcon} />
                        <CardBody>
                            <CardTitle>Gérer les utilisateur</CardTitle>
                            <p>Lorem ipsum dolor sit amet.</p>
                            <Button className={style.AdminCardBtn}>Continuer</Button>
                        </CardBody>
                    </Card>

                </Col>
                <Col sm="12" lg="4">
                    <Card className={style.AdminCard} >
                        <CardHeader></CardHeader>
                        <FaBookReader className={style.AdminCardIcon} />
                        <CardBody>
                            <CardTitle>Gérer les séances</CardTitle>
                            <p>Lorem ipsum dolor sit amet.</p>
                            <Button className={style.AdminCardBtn}>Continuer</Button>
                        </CardBody>
                    </Card>

                </Col>
            </Row>
        </Container>
    )
}
