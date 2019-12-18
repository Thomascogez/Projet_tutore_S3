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
import { FaLock, FaUserCircle } from "react-icons/fa";
import logo from "../../assets/images/scShare_logo.png";
import style from "./home.module.css";
import { CSSTransition } from "react-transition-group";

export default function Home() {
  return (
    <CSSTransition in={true} appear={true} timeout={1000} classNames="fade">
      <Container fluid className={style.LoginContainer}>
        {/* <div className={style.Polygon}></div> */}

        <Container className={style.LoginFormContainer}>
          <h1>Connexion</h1>
          <Form>
            <FormGroup className={style.FormGroup}>
              <InputGroup seamless>
                <InputGroupAddon type="prepend">
                  <InputGroupText>
                    <FaUserCircle />
                  </InputGroupText>
                </InputGroupAddon>
                <FormInput id="#username" placeholder="Nom d'utilisateur ..." />
              </InputGroup>
            </FormGroup>
            <FormGroup className={style.FormGroup}>
              <InputGroup seamless>
                <InputGroupAddon type="prepend">
                  <InputGroupText>
                    <FaLock />
                  </InputGroupText>
                </InputGroupAddon>
                <FormInput
                  type="password"
                  id="#password"
                  placeholder="Mot de passe ..."
                />
              </InputGroup>
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
    </CSSTransition>
  );
}
