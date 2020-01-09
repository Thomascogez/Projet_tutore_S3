import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../providers/actions/userActions";
import {
    Container,
    Form,
    FormGroup,
    FormInput,
    Button,
    InputGroup,
    InputGroupAddon,
    InputGroupText
} from "shards-react";
import { FaLock, FaUserCircle } from "react-icons/fa";
import logo from "../../assets/images/scShare_logo.png";
import style from "./home.module.css";
import { navigate } from "hookrouter";
import Loader from 'react-loader-spinner'
import {RESET_INVALID_MESSAGE} from "../../types/actionsTypes";

export default function Home() {
    const [password, setPassword] = useState("");
    const [username, setUserName] = useState("");
    const [loading, setLoading] = useState(false);

    const userState = useSelector(state => state.user);

    const dispatch = useDispatch();

    useEffect(() => {
        if (userState.isLoggedIn) {
            navigate("/seances");
        }
        if(userState.loginMessage) {
            setLoading(false)
        }
    }, [userState.isLoggedIn, userState.loginMessage]);

    const handleSubmit = e => {
        e.preventDefault();
        setLoading(!loading);
        dispatch({type: RESET_INVALID_MESSAGE, loginMessage: false});
        dispatch(login(username, password));
    };

    return (
        <Container fluid className={style.LoginContainer}>
            <Container className={style.LoginFormContainer}>
                <h1>Connexion</h1>
                {loading?(
                    <div>
                        <Loader
                            type="Oval"
                            color="green"
                            width={200}
                            style={{paddingTop: "50px"}}
                        />
                    </div>
                ):(
                    <Form onSubmit={e => handleSubmit(e)}>
                        <FormGroup className={style.FormGroup}>
                            <InputGroup seamless>
                                <InputGroupAddon type="prepend">
                                    <InputGroupText>
                                        <FaUserCircle />
                                    </InputGroupText>
                                </InputGroupAddon>
                                <FormInput
                                    id="#username"
                                    placeholder="Nom d'utilisateur ..."
                                    type="text"
                                    value={username}
                                    onChange={e => setUserName(e.target.value)}
                                    invalid={userState.loginMessage}
                                />
                            </InputGroup>
                        </FormGroup>
                        <FormGroup className={style.FormGroup}>
                            <InputGroup seamless>
                                <InputGroupAddon type="prepend">
                                    <InputGroupText>
                                        <FaLock />
                                    </InputGroupText>
                                </InputGroupAddon>
                                <FormInput
                                    type="password"
                                    id="#password"
                                    placeholder="Mot de passe ..."
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    invalid={userState.loginMessage}
                                />
                            </InputGroup>
                        </FormGroup>
                        <Button type="success">Connexion !</Button>
                        <a
                            href="#"
                            style={{ display: "inline-block" }}
                            onClick={() => navigate("/passwordForget")}
                        >
                            Mot de passe oublié?
                        </a><br/>
                        <a
                            href="#"
                            style={{float: "right", fontSize: "12px"}}
                            onClick={() => navigate("/mentionLegales")}
                        >
                            Mentions légales
                        </a>
                    </Form>
                )}
            </Container>
            <div className={style.SiteLogo}>
                <img src={logo} alt="logo" />
            </div>
        </Container>
    );
}
