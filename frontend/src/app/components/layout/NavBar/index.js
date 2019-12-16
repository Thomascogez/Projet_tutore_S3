import React from "react";
import style from "./navbar.module.css";
import logo from "../../../assets/images/logo.svg"
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'shards-react'

export default function NavBar () {
  return (
    <Navbar className={style.NavBar}>
        
      <NavbarBrand className={style.Name}> <img className={style.logo} src={logo} alt='logo' /> SCHOOLSHARE </NavbarBrand>

      <Nav>
        <NavItem>
          <NavLink>
            1
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink>2</NavLink>
        </NavItem>
      </Nav>

      <Nav navbar className='ml-auto'>
        <NavItem> Profil </NavItem>
      </Nav>
    </Navbar>
  )
}
