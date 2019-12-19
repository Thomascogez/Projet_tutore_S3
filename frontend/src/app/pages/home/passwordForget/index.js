import React, {useState, useEffect} from "react";
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
import logo from "../../../assets/images/scShare_logo.png";
import style from "./../home.module.css";
import { navigate } from "hookrouter";
import axios from 'axios';
import PASSWORD_FORGET_GET from "../../../types";

export default function Home() {
    const [username, setUsername] = useState("");
    const [errorUsername, setErrorUsername] = useState("");

    var sendForget = () => {
        const req = {
            'username': username
        };
        axios.get(PASSWORD_FORGET_GET + '?username=' + username)
            .then(res => {
                navigate('/');
            })
            .catch(error => {
                setErrorUsername(error.response.data.message);
            })
    };

    return (
        <Container fluid className={style.LoginContainer}>
            <Container className={style.LoginFormContainer}>
                <h2 style={{paddingBottom:"30px"}}>Mot de passe oublié</h2>
                <FormGroup className={style.FormGroup}>
                    <label className={style.LabelText}>Identifiant</label>
                    <FormInput
                        id="#identifiant"
                        placeholder="identifiant ..."
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        invalid={(errorUsername)}
                    />
                    {(errorUsername)?(<label className={style.textError}>{errorUsername}</label>):''}
                </FormGroup>
                <Button type="success" onClick={() => sendForget() }>Changer le mot de passe    </Button>
                <Button type="primary" onClick={()=> navigate("/")}>Retour à l'authentification</Button>
            </Container>
            <div className={style.SiteLogo}>
                <span>
                    <img src={logo} alt="logo" />
                </span>
            </div>
        </Container>
    );
}