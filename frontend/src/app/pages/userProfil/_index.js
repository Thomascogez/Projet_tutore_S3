import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Card, CardHeader, CardTitle, CardBody, Badge, Collapse, FormInput, FormGroup, Button } from 'shards-react'
import { FaAngleRight, FaAngleDown } from 'react-icons/fa'
import style from './_userprofile.module.css'

import { useDispatch, useSelector } from 'react-redux'
import { getUserProfile } from '../../providers/actions/userActions'

import ProfileRound from '../../components/profileRound_component/ProfileRound'

//page loader

import ProfileLoader from '../../components/loader/ProfileLoader'

export default function UserProfile() {
    const [collapseGroup, setcollapseGroup] = useState(false);
    const [collapseEdit, setcollapseEdit] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserProfile())
    }, [])
    const user = useSelector(state => state.user);

    return (
        <Container fluid className={style.UserProfileContainer}>
            <Row className={style.UserProfileRow}>
                <Col sm="12" lg="4">
                    <Card className={style.UserCard} >
                        <>{user.user.firstname ? <ProfileRound size="Big" bgcolor={user.user.color} letter={user.user.firstname.charAt(0) } fcolor="#fff" /> : <ProfileLoader /> }</>
                        <CardBody>
                            <CardTitle>{`${user.user.firstname} ${user.user.lastname}`}</CardTitle>
                            <Badge theme="light">{user.user.username}</Badge>
                        </CardBody>

                    </Card>

                </Col>
                <Col sm="12" lg="8">
                    <Card className={style.UserEditCard} >
                        <CardHeader style={{ fontSize: "25px", fontWeight: "400" }}>Vos Informations</CardHeader>
                        <CardBody>
                            <div onClick={() => setcollapseGroup(!collapseGroup)} className={style.ViewCollapse}>
                                {collapseGroup ? <FaAngleDown /> : <FaAngleRight />} Voir vos groupes
                            </div>
                            <Collapse open={collapseGroup}>
                                {user.user.groups ? user.user.groups.map(group => (<h5 style={{ color: group.color }} >{group.name}</h5>)) : <div></div>}
                            </Collapse>

                            <div onClick={() => setcollapseEdit(!collapseEdit)} className={style.ViewCollapse}>
                                {collapseEdit ? <FaAngleDown /> : <FaAngleRight />} Edition de vos information
                            </div>
                            <Collapse open={collapseEdit}>
                                <Row>
                                    <Col sm="12" lg="6"><FormGroup><label htmlFor="#name">Nom</label><FormInput type="text" value={user.user.lastname} id="#name" placeholder="Votre nom ..." /></FormGroup></Col>
                                    <Col sm="12" lg="6"><FormGroup><label htmlFor="#surname">Prénom</label><FormInput type="text" value={user.user.firstname} id="#surname" placeholder="Votre prénom ..." /></FormGroup></Col>
                                    <Col sm="12" lg="6"><FormGroup><label htmlFor="#password">Nouveau mot de passe</label><FormInput type="password" id="#password" placeholder="Nouveau mot de passe ..." /></FormGroup></Col>
                                    <Col sm="12" lg="6"><FormGroup><label htmlFor="#password">Confirmer Nouveau mot de passe</label><FormInput id="#password" placeholder="Confirmer votre nouveau mot de passe ..." /></FormGroup></Col>

                                </Row>
                                <Button style={{ width: "100%", margin: "10px auto 0px auto" }} theme="primary">Valider vos Changement</Button>
                            </Collapse>


                        </CardBody>

                    </Card>

                </Col>
            </Row>
        </Container>
    )
}
