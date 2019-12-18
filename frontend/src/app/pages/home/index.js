import React from "react";
import { Container, Form, FormGroup, FormInput, Button, InputGroup } from "shards-react";
import logo from "../../assets/images/scShare_logo.png";
import style from "./home.module.css";
export default function Home() {
  return (


    <Container fluid className={style.LoginContainer}>
      {/* <div className={style.Polygon}></div> */}
      <Container className={style.LoginFormContainer}>
        <h1>Connexion</h1>
        <Form>
          <FormGroup>
            <InputGroup className="mb-2">
              <FormInput id="#username" placeholder="Nom d'utilisateur ..." />
            </InputGroup>
          </FormGroup>
          <FormGroup>
            <FormInput
              type="password"
              id="#password"
              placeholder="Mot de passe ..."
            />
          </FormGroup>
          <Button type="success">Connexion !</Button>
        </Form>
      </Container>
      <div className={style.SiteLogo}>
        <span>
          <img src={logo} alt="logo" />
          schoolshare
        </span>
      </div>
    </Container>

  );
}
