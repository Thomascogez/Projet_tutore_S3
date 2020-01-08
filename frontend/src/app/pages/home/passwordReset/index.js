import React, {useState, useEffect} from "react";
import {Container,Button} from "shards-react";
import logo from "../../../assets/images/scShare_logo.png";
import style from "./../home.module.css";
import { navigate } from "hookrouter";

import Loader from 'react-loader-spinner'
import { toast } from 'react-toastify';
import { ApiPasswordForgetCheck, ApiPasswordPatch } from '../../../api/PasswordReset'

toast.configure();

export default function PasswordReset(props) {
    const [loading, setLoading] = useState(true);
   

    useEffect(() => {
        ApiPasswordForgetCheck({'token': props.token})
            .then( () =>  setLoading(!loading))
            .catch(() =>  navigate("/")       );
    }, []);

    const acceptRestore = () => {
        
        ApiPasswordPatch({'token': props.token})
            .then(res => {
                toast.success("Un nouveau mot de passe vous à été envoyé en email !");
                navigate('/');
            })
            .catch(error => {
               navigate('/');
               toast.error("Demande expirée")
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