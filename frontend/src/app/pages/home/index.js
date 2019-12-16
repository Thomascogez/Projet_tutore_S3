import React from "react";
import { Form, FormInput, FormGroup } from "shards-react";
import { Button } from "shards-react";
import Style from './index.module.css'

export default function Home() {
    return (
        <div className={Style.connection}>
            <Form>
                <label className={Style.title}> <h2> Connexion </h2> </label>

                <FormGroup className={Style.txt}>
                   
                    <FormInput id="#username" placeholder=" @ Email" />
                </FormGroup>

                <FormGroup className={Style.txt} >
                    <FormInput type="password" id="#password" placeholder="Mot de passe" />
                </FormGroup>
            </Form>


            <Button className={Style.button} theme="success"> Connexion </Button>
        </div>
    );
}