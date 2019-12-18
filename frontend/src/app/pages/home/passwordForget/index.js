import React from "react";
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

export default function Home() {
  return (
    <Container fluid className={style.LoginContainer}>
        <Container className={style.LoginFormContainer}>
            <h2 style={{paddingBottom:"30px"}}>Mot de passe oublié</h2>
            <FormGroup className={style.FormGroup}>
                <label className={style.LabelText}>Identifiant</label>
                <FormInput
                    id="#identifiant"
                    placeholder="identifiant ..."
                />
            </FormGroup>
            <Button type="success">changer le mot de passe</Button>
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
