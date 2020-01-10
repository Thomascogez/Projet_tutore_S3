import React from "react";
import {Nav, Navbar, NavbarBrand} from "shards-react";
import {navigate} from "hookrouter";
import style from "./navbar.module.css";
import logo from "../../../assets/images/scShare_logoNav.png";
import ProfilRound from "../../../components/profileRound_component/ProfilRoundNav";
import {useSelector} from "react-redux";
import Loader from "react-loader-spinner";


export default function NavBar() {


    const user = useSelector(state => state.user);

    return (
        <Navbar className={style.Navbar} expand="md">
            <NavbarBrand className={style.Brand} onClick={() => navigate("/seances")}>
                {" "}
                <img src={logo} alt="SchoolShare Logo"/>
                schoolShare
            </NavbarBrand>
            <Nav className="ml-auto">
                <>
                    {user.isLoggedIn ? (
                        <ProfilRound
                            bgcolor={user.user.color && user.user.color}
                            fcolor="#fff"
                            letter={
                                user.user.firstname &&
                                user.user.firstname.charAt(0)
                            }
                        />
                    ) : (
                        <>{window.location.pathname !== "/" &&
                        <Loader type="Puff" color="#FFFF" height={50} width={50}/>}</>
                    )}
                </>
            </Nav>
        </Navbar>
    );
}
