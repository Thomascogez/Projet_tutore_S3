import React,{useState} from 'react'
import { Navbar, NavLink, NavbarToggler, Collapse, Nav, NavbarBrand, NavItem } from 'shards-react'
import { navigate } from 'hookrouter'
import style from './navbar.module.css'
import logo from '../../../assets/images/scShare_logo.png'

export default function NavBar() {

    //hook to handle navBar collapse when on responsive mode
    const[open, setOpen] = useState(false);


    return (
        <Navbar className={style.Navbar} expand="md">
        <NavbarBrand className={style.Brand} onClick = {() => navigate('/')} > <img src={logo} alt="SchoolShare Logo" />schoolShare</NavbarBrand>
        <NavbarToggler className= {style.NavBarToggler} onClick={() => setOpen(!open)}/>
        <Collapse open={open} navbar>
          <Nav navbar className="ml-auto">
            <NavItem>
              <NavLink className={style.NavLink} active href="#">
                Connexion
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    )
}
