import React, {useEffect, useState} from "react";
import {
    Badge,
    Button,
    Card,
    CardBody,
    CardHeader,
    CardTitle,
    Col,
    Container,
    FormGroup,
    FormInput,
    Row
} from "shards-react";
import Collapse from "../../components/layouts/Collapse";

import style from "./_userprofile.module.css";

import {useDispatch, useSelector} from "react-redux";
import {getUserProfile, setProfileColor, setUserProfile} from "../../providers/actions/userActions";
import Loader from 'react-loader-spinner'

import ProfileRound from "../../components/profileRound_component/ProfileRound";
import {CirclePicker} from "react-color";
import ProfileLoader from "../../components/loader/ProfileLoader";
import TextLoader from "../../components/loader/TextLoader";
import {APIEditUser} from "../../api/userFetch";
import {toast} from "react-toastify";
//page loader

export default function UserProfile() {
    // hook that handle collapse view
    const [collapseGroup, setcollapseGroup] = useState(false);
    const [collapseModules, setcollapseModules] = useState(false);
    const [collapseEdit, setcollapseEdit] = useState(true);
    const [edittingColor, setEdittingColor] = useState(false)
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch();

    //user info from the store
    let user = useSelector(state => state.user);

    useEffect(() => {
        dispatch(getUserProfile()); //Fetch user profile on component load
    }, []);


    const [userInfo, setUserInfo] = useState({
        firstName: user.user.firstname,
        lastName: user.user.lastname,
        password: "",
        passwordConfirmation: "",
        profileColor: user.user.color
    });


    /**
     * passwordValidation
     *
     * Check if a password math with the reg
     * @param {*} password password to check
     */
    const passwordValidation = password => {
        return new RegExp(
            /^.*(?=.{8,})(?=.*[!-@#$%^&(),.?":{}|<>].*[!-@#$%^&(),.?":{}|<>].*)(?=.*[A-Z].*[A-Z].*)(?=.*[a-z].*[a-z].*).*$/m
        ).test(password);
    };

    /**
     * isValid
     *
     * Use to disable button if edited information are invalid
     */
    const isValid = () => {
        if (userInfo.password.trim() !== "") {
            return !(
                userInfo.password.trim() !== "" &&
                passwordValidation(userInfo.password) &&
                userInfo.password === userInfo.passwordConfirmation
            );
        }else{
            return !(userInfo.firstName.trim() !== "" && userInfo.lastName.trim () !== "" )
        }

    };

    const handleSubmit = e => {
        e.preventDefault();
        let data = {
            firstname: userInfo.firstName,
            lastname: userInfo.lastName,
            color: userInfo.profileColor
        };
        if (userInfo.password) data.plainPassword = userInfo.password;
        setLoading(true);
        APIEditUser(user.user.id, data)
            .then(data => {
                toast.success("Information modifié !")
                dispatch((setUserProfile(data.data)));
                setLoading(false);
            })
            .catch(err => {
                setLoading(false);
                console.log(err.response)
            });
    };

    const handleColorChange = color => {
        setUserInfo({...userInfo, profileColor:color});
        dispatch(setProfileColor(color))
    }

    useEffect(() => {
        setUserInfo({
            ...userInfo,
            firstName: user.user.firstname,
            lastName: user.user.lastname,
            password: "",
            passwordConfirmation: "",
            profileColor: user.user.color
        });
    }, [user]);

    return (
        <Container fluid className={style.UserProfileContainer}>
            <Row className={style.UserProfileRow}>
                <Col sm="12" lg="4">
                    <Card className={style.UserCard}>
                        {user.user.firstname ? (
                            <>
                                <div onClick={() => setEdittingColor(!edittingColor)}>
                                    <ProfileRound
                                        bgcolor={user.user.color}
                                        letter={user.user.firstname.charAt(0)}
                                        fcolor="#fff"     
                                        size='Big'                                   
                                    />
                                </div>
                                {edittingColor && <div style={{margin : "0px auto 0px auto"}}><CirclePicker onChange={val => handleColorChange(val.hex)} /></div>}
                            </>
                        ) : (
                            <ProfileLoader />
                        )}

                        <CardBody>
                            <CardTitle>
                                {user.user.firstname ? (
                                    user.user.firstname + " " + user.user.lastname
                                ) : (
                                    <TextLoader width="100" x="51" />
                                )}
                            </CardTitle>

                            <>
                                {user.user.username ? (
                                    <Badge theme="light">
                                        <a href={`mailto:${user.user.username}@${(user.user.roles.includes('ROLE_TUTOR'))?"etu.":""}univ-lehavre.fr`}>
                                            {user.user.username}@{(user.user.roles.includes('ROLE_TUTOR'))?"etu.":""}univ-lehavre.fr
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
                            Vos Informations
                        </CardHeader>
                        <CardBody>
                            <Collapse
                                title="Voir vos groupes"
                                open={collapseGroup}
                                toggler={setcollapseGroup}
                            >
                                {user.user.groups ? (
                                    user.user.groups.map(group => (
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
                                title="Voir vos modules"
                                open={collapseModules}
                                toggler={setcollapseModules}
                            >
                                {user.user.modules ? (
                                    user.user.modules.map(module => (
                                        <Badge style={{marginRight: "10px", backgroundColor: module.color}}>
                                            [{module.code}] {module.name}
                                        </Badge>
                                    ))
                                ) : (
                                    <></>
                                )}
                            </Collapse>

                            <Collapse
                                title="Edition de vos informations"
                                open={collapseEdit}
                                toggler={setcollapseEdit}
                            >
                                <form onSubmit={e => handleSubmit(e)}>
                                    <Row>
                                        <Col sm="12" lg="6">
                                            <FormGroup>
                                                <label htmlFor="#name">Nom</label>
                                                <FormInput
                                                    onChange={e =>
                                                        setUserInfo({
                                                            ...userInfo,
                                                            lastName: e.target.value
                                                        })
                                                    }
                                                    name="firstname"
                                                    value={userInfo.lastName}
                                                    type="text"
                                                    id="#name"
                                                    placeholder="Votre nom ..."
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col sm="12" lg="6">
                                            <FormGroup>
                                                <label htmlFor="#surname">Prénom</label>
                                                <FormInput
                                                    onChange={e =>
                                                        setUserInfo({
                                                            ...userInfo,
                                                            firstName: e.target.value
                                                        })
                                                    }
                                                    name="lastname"
                                                    type="text"
                                                    value={userInfo.firstName}
                                                    defaultValue={user.user.firstname}
                                                    id="#surname"
                                                    placeholder="Votre prénom ..."
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col sm="12" lg="6">
                                            <FormGroup>
                                                <label htmlFor="#password">Nouveau mot de passe</label>
                                                <FormInput
                                                    valid={
                                                        passwordValidation(userInfo.password) &&
                                                        userInfo.password.trim() !== ""
                                                    }
                                                    invalid={
                                                        userInfo.password.trim() !== "" &&
                                                        !passwordValidation(userInfo.password)
                                                    }
                                                    onChange={e =>
                                                        setUserInfo({
                                                            ...userInfo,
                                                            password: e.target.value
                                                        })
                                                    }
                                                    value={userInfo.password}
                                                    name="password"
                                                    type="password"
                                                    id="#password"
                                                    placeholder="Nouveau mot de passe ..."
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col sm="12" lg="6">
                                            <FormGroup>
                                                <label htmlFor="#passwordvalidate">
                                                    Confirmer Nouveau mot de passe
                                                </label>
                                                <FormInput
                                                    valid={
                                                        passwordValidation(userInfo.password) &&
                                                        userInfo.password ===
                                                        userInfo.passwordConfirmation &&
                                                        userInfo.password.trim() !== ""
                                                    }
                                                    invalid={
                                                        userInfo.password.trim() !== "" &&
                                                        userInfo.password !== userInfo.passwordConfirmation
                                                    }
                                                    onChange={e =>
                                                        setUserInfo({
                                                            ...userInfo,
                                                            passwordConfirmation: e.target.value
                                                        })
                                                    }
                                                    value={userInfo.passwordConfirmation}
                                                    name="passwordvalidation"
                                                    id="#passwordvalidate"
                                                    type="password"
                                                    placeholder="Confirmer votre nouveau mot de passe ..."
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>

                                    <Button
                                        disabled={isValid() || loading}
                                        style={{ width: "100%", margin: "10px auto 0px auto" }}
                                        theme="primary"
                                    >
                                        {loading ?<Loader
                                            type="ThreeDots"
                                            color="#FFF"
                                            height={30}
                                            width={100}
                                            timeout={3000} //3 secs

                                        /> : "Valider vos Changement"}
                                    </Button>
                                </form>
                            </Collapse>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}
