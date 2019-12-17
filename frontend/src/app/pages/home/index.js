import React from 'react'
import { Container, Form, FormGroup, FormInput, Button } from 'shards-react'

import style from './home.module.css'
export default function Home() {
    return (
        <Container className={style.LoginContainer}>
            <h1>Connexion</h1>
            <Form>
                <FormGroup>
                    <label htmlFor="#username">Utilisateur</label>
                    <FormInput id="#username" placeholder="Nom d'utilisateur ..." />
                </FormGroup>
                <FormGroup>
                    <label htmlFor="#password">Mot de passe</label>
                    <FormInput type="password" id="#password" placeholder="Mot de passe ..." />
                </FormGroup>
                <Button type="success">Connexion !</Button>
            </Form>
        </Container>
    )
}
