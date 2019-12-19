import React, {useState, useEffect, ReactFragment} from "react";
import {
  Container,
  Form,
  FormGroup,
  FormInput,
  Button,
} from "shards-react";
import logo from "../../../assets/images/scShare_logo.png";
import style from "./../home.module.css";
import { navigate } from "hookrouter";
import axios from 'axios';
import {PASSWORD_FORGET_GET} from "../../../types/apiConst";
import Loader from "react-loader-spinner";
import {toast} from 'react-toastify';


export default function Home() {
    const [username, setUsername] = useState("");
    const [errorUsername, setErrorUsername] = useState("");
    const [loading, setLoading] = useState(false);
    useEffect(()=>{
        console.log("load")
    },[])

    const sendForget = () => {
        setLoading(!loading)

        axios.get(PASSWORD_FORGET_GET + '?username=' + username)
            .then(res => {
                toast.success("Un email vient de vous être envoyé !");
                console.log(toast);
                //navigate('/');
            })
            .catch(error => {
                toast("Un email vient de vous être envoyé !");
                setLoading(false)
                setErrorUsername(error.response.data.message);
            })
    };

    return (
        <Container fluid className={style.LoginContainer}>
            <div>
                <Container className={style.LoginFormContainer}>
                    <h2 style={{paddingBottom:"30px"}}>Mot de passe oublié</h2>
                    {loading?(
                        <div>
                            <Loader
                                type="Oval"
                                color="green"
                                width={200}
                                style={{marginBottom:"40px"}}
                            />
                        </div>
                    ):(
                        <FormGroup className={style.FormGroup}>
                            <label className={style.LabelText}>Identifiant</label>
                            <FormInput
                                id="#identifiant"
                                placeholder="identifiant ..."
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                invalid={true}
                            />
                            {(errorUsername)?(<label className={style.textError}>{errorUsername}</label>):''}
                        </FormGroup>
                    )}
                    <Button type="success" onClick={() => sendForget() }>Changer le mot de passe    </Button>
                    <Button type="primary" onClick={()=> navigate("/")}>Retour à l'authentification</Button>
                </Container>
                <div className={style.SiteLogo}>
                    <span>
                        <img src={logo} alt="logo" />
                    </span>
                </div>
            </div>
        </Container>
    );
}