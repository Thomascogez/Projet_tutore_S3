import React, {useState, useEffect} from "react";
import {Container,Button} from "shards-react";
import logo from "../../../assets/images/scShare_logo.png";
import style from "./../home.module.css";
import { navigate } from "hookrouter";

import Loader from 'react-loader-spinner'
import { toast } from 'react-toastify';
import { ApiPasswordForgetCheck, ApiPasswordPatch } from '../../../api/PasswordReset'
import PageLoader from "../../../components/layouts/loader";

toast.configure();

export default function PasswordReset(props) {
    const [loading, setLoading] = useState(true);
   

    useEffect(() => {
        ApiPasswordForgetCheck({'token': props.token})
            .then( data =>  {setLoading(!loading);})
            .catch(err =>  navigate("/"));
    }, []);

    const acceptRestore = () => {
        setLoading(true)
        ApiPasswordPatch({'token': props.token})
            .then(res => {
                setLoading(false)
                toast.success("Un nouveau mot de passe vous à été envoyé en email !");
                navigate('/');
            })
            .catch(error => {
                setLoading(false)
               navigate('/');
               toast.error("Demande expirée")
            })
    };

    return (
        <>
            {loading &&
                <PageLoader />
            }
            <Container fluid className={style.LoginContainer}>
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
            </Container>
        </>
    );
}