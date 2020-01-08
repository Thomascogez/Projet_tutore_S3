import React, {useEffect, useState} from "react";
import {
    Badge,
    Card,
    CardBody,
    CardHeader,
    CardTitle,
    Col,
    Container,
    Row
} from "shards-react";
import Collapse from "../../components/layouts/Collapse";
import style from "./_userprofile.module.css";

import ProfileRound from "../../components/profileRound_component/ProfileRound";
import ProfileLoader from "../../components/loader/ProfileLoader";
import TextLoader from "../../components/loader/TextLoader";
import {APIGetUser} from "../../api/userFetch";

export default function UserprofileEdit({idUser}) {
    // hook that handle collapse view
    const [collapseGroup, setcollapseGroup] = useState(false);
    const [collapseModules, setcollapseModules] = useState(false);
    const [user, setUser] = useState({});

    useEffect(() => {
        APIGetUser(idUser.idUser).then(data => setUser(data.data))
    }, []);


    return (
        <Container fluid className={style.UserProfileContainer}>
            <Row className={style.UserProfileRow}>
                <Col sm="12" lg="4">
                    <Card className={style.UserCard}>
                        {user.firstname ? (
                            <>
                                <div>
                                    <ProfileRound
                                        size="Big"
                                        bgcolor={user.color}
                                        letter={user.firstname.charAt(0)}
                                        fcolor="#fff"
                                    />
                                </div>
                            </>
                        ) : (
                            <ProfileLoader />
                        )}

                        <CardBody>
                            <CardTitle>
                                {user.firstname ? (
                                    user.firstname + " " + user.lastname
                                ) : (
                                    <TextLoader width="100" x="51" />
                                )}
                            </CardTitle>

                            <>
                                {user.username ? (
                                    <Badge theme="light">
                                        <a href={`mailto:${user.username}@${(user.roles.includes('ROLE_TUTOR'))?"etu.":""}univ-lehavre.fr`}>
                                            {user.username}@{(user.roles.includes('ROLE_TUTOR'))?"etu.":""}univ-lehavre.fr
                                        </a>
                                    </Badge>
                                ) : (
                                    <TextLoader width="80" x="60" />
                                )}{" "}
                            </>
                        </CardBody>
                    </Card>
                </Col>
                <Col sm="12" lg="8">
                    <Card className={style.UserEditCard}>
                        <CardHeader style={{ fontSize: "25px", fontWeight: "400" }}>
                            Informations
                        </CardHeader>
                        <CardBody>
                            <Collapse
                                title="Voir les groupes"
                                open={collapseGroup}
                                toggler={setcollapseGroup}
                            >
                                {user.groups ? (
                                    user.groups.map(group => (
                                        <h5
                                            className={style.Group}
                                            style={{ backgroundColor: group.color }}
                                            key={group.name}
                                        >
                                            {group.name}
                                        </h5>
                                    ))
                                ) : (
                                    <></>
                                )}
                            </Collapse>

                            <Collapse
                                title="Voir les modules"
                                open={collapseModules}
                                toggler={setcollapseModules}
                            >
                                {user.modules ? (
                                    user.modules.map(module => (
                                        <Badge style={{marginRight: "10px", backgroundColor: module.color}}>
                                            [{module.code}] {module.name}
                                        </Badge>
                                    ))
                                ) : (
                                    <></>
                                )}
                            </Collapse>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}
