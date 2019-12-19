import React, {useState, useEffect, ReactFragment} from "react";
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
import {PASSWORD_FORGET_VERIFY} from "../../../types/apiConst";
import Loader from 'react-loader-spinner'
import { toast } from 'react-toastify';

toast.configure();

export default function PasswordReset(props) {
    const [loading, setLoading] = useState(true);
    console.log(props)
    const req = {
        'token': props.token
    };

    useEffect(() => {
        axios.post(PASSWORD_FORGET_VERIFY, req)
            .then( () =>  setLoading(!loading))
            .catch(() =>  navigate("/")       );
    }, []);


    const [username, setUsername] = useState("");
    const [errorUsername, setErrorUsername] = useState("");

    const acceptRestore = () => {

        axios.patch(PASSWORD_FORGET_VERIFY, req)
            .then(res => {
                toast.success("Un nouveau mot de passe vous à été envoyé en email !");
                navigate('/');
            })
            .catch(error => {
                setErrorUsername(error.response.data.message);
            })
    };

    return (
        <Container fluid className={style.LoginContainer}>
            {loading?(
                <div>
                    <Container className={style.LoginFormContainer}>
                    <Loader
                        type="Oval"
                        color="green"
                        width={200}
                    />
                    </Container>
                </div>
            ):(
                <div>
                    <Container className={style.LoginFormContainer}>
                        <h2 style={{paddingBottom:"30px"}}>Réinitialiser votre mot de passe</h2>
                        <Button theme="success" onClick={() => acceptRestore() }>Réinitialiser</Button>
                    </Container>
                    <div className={style.SiteLogo}>
                        <span>
                            <img src={logo} alt="logo" />
                        </span>
                    </div>
                </div>
            )}
        </Container>
    );
}