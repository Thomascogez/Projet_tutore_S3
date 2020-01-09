import React, {useState} from "react";
import {
    Container,
    FormGroup,
    FormInput,
    Button, Form,
} from "shards-react";
import logo from "../../../assets/images/scShare_logo.png";
import style from "./../home.module.css";
import { navigate } from "hookrouter";
import axios from 'axios';
import {PASSWORD_FORGET_GET} from "../../../types/apiConst";
import Loader from "react-loader-spinner";
import { toast } from 'react-toastify';

toast.configure();

export default function Home() {
    const [username, setUsername] = useState("");
    const [errorUsername, setErrorUsername] = useState({isError:false,message:""});
    const [loading, setLoading] = useState(false);

    const sendForget = () => {
        setLoading(true)
        axios.get(PASSWORD_FORGET_GET + '?username=' + username)
            .then(res => {
                setLoading(false)
                toast.success("Un email vous à été envoyé !");
                navigate('/');
            })
            .catch(error => {
                setLoading(false)
                setErrorUsername({isError:true,message:error.response.data.message});
            })
    };

    return (
        <Container fluid className={style.LoginContainer}>
            <div>
                <Container className={style.LoginFormContainer}>
                    <h2 style={{paddingBottom:"30px"}}>Mot de passe oublié</h2>
                    <Form>
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
                                    invalid={errorUsername.isError}
                                />
                                {(errorUsername.isError)?(<label className={style.textError}>{errorUsername.message}</label>):''}
                            </FormGroup>
                        )}
                        <Button type="success" onClick={e => {e.preventDefault(); sendForget()}}>Changer le mot de passe </Button>
                    </Form>
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