import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Card, CardHeader, CardTitle, CardBody, Badge, FormInput, FormGroup, Button } from 'shards-react'
import Collapse from '../../components/layouts/Collapse'
import { FaAngleRight, FaAngleDown } from 'react-icons/fa'

import style from './_userprofile.module.css'

import { useDispatch, useSelector } from 'react-redux'
import { getUserProfile } from '../../providers/actions/userActions'

import ProfileRound from '../../components/profileRound_component/ProfileRound'

//page loader

import ProfileLoader from '../../components/loader/ProfileLoader'
import TextLoader from '../../components/loader/TextLoader'

export default function UserProfile() {

    // hook that handle collapse view
    const [collapseGroup, setcollapseGroup] = useState(false);
    const [collapseEdit, setcollapseEdit] = useState(true);


    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserProfile()) //Fetch user profile on component load
    }, [])

    //user info from the store
    const user = useSelector(state => state.user);

    return (
        <Container fluid className={style.UserProfileContainer}>
            <Row className={style.UserProfileRow}>
                <Col sm="12" lg="4">
                    <Card className={style.UserCard} >
                        <>{user.user.firstname ? <ProfileRound size="Big" bgcolor={user.user.color} letter={user.user.firstname.charAt(0)} fcolor="#fff" /> : <ProfileLoader />}</>
                        <CardBody>
                            <CardTitle>{user.user.firstname ? user.user.firstname + " " + user.user.lastname : <TextLoader width="100" x="51" />}</CardTitle>
                            <>{user.user.username ? <Badge theme="light">{user.user.username}</Badge> : <TextLoader width="80" x="60" />}  </>

                        </CardBody>

                    </Card>

                </Col>
                <Col sm="12" lg="8">
                    <Card className={style.UserEditCard} >
                        <CardHeader style={{ fontSize: "25px", fontWeight: "400" }}>Vos Informations</CardHeader>
                        <CardBody>
                            <Collapse title="Voir vos groupes" open={collapseGroup} toggler={setcollapseGroup}>
                                {user.user.groups ? user.user.groups.map(group => (<h5 className={style.Group} style={{ backgroundColor: group.color }} key={group.name} >{group.name}</h5>)) : <></>}
                            </Collapse>

                            <Collapse title="Edition de vos informations" open={collapseEdit} toggler={setcollapseEdit}>
                                <form>
                                    <Row>

                                        <Col sm="12" lg="6"><FormGroup><label htmlFor="#name">Nom</label><FormInput name="firstname" defaultValue={user.user.lastname} type="text" id="#name" placeholder="Votre nom ..." /></FormGroup></Col>
                                        <Col sm="12" lg="6"><FormGroup><label htmlFor="#surname">Prénom</label><FormInput name="lastname" type="text" defaultValue={user.user.firstname} id="#surname" placeholder="Votre prénom ..." /></FormGroup></Col>
                                        <Col sm="12" lg="6"><FormGroup><label htmlFor="#password">Nouveau mot de passe</label><FormInput name="password" type="password" id="#password" placeholder="Nouveau mot de passe ..." /></FormGroup></Col>
                                        <Col sm="12" lg="6"><FormGroup><label htmlFor="#passwordvalidate">Confirmer Nouveau mot de passe</label><FormInput name="passwordvalidation" id="#passwordvalidate" placeholder="Confirmer votre nouveau mot de passe ..." /></FormGroup></Col>

                                    </Row>

                                    <Button style={{ width: "100%", margin: "10px auto 0px auto" }} theme="primary">Valider vos Changement</Button>
                                </form>

                            </Collapse>



                        </CardBody>

                    </Card>

                </Col>
            </Row>
        </Container>
    )
}
