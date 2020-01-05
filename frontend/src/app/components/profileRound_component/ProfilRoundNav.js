import React,{useState} from "react";
import {Dropdown, DropdownMenu, DropdownItem, NavLink} from "shards-react";
import {FaUserNinja, FaCog, FaPowerOff, FaUserCog} from "react-icons/fa";
import { navigate } from 'hookrouter'
import style from "./profileround.module.css"
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../providers/actions/userActions'
export default function ProfilRound({bgcolor, fcolor, letter})
{
    const dispatch = useDispatch();
    const user = useSelector(state => state.user)
    const [open, setOpen] = useState(false);


    
    return (
        <Dropdown open={open} toggle={() =>setOpen(!open)} group>
        <div onClick={() => setOpen(!open)} style={{backgroundColor:bgcolor, color:fcolor}} className={`${style.ProfileRound} ${style.Medium}`}>
            {letter}
        </div>
        
        <DropdownMenu right>
            <NavLink onClick={() => navigate('/profil')}><DropdownItem><FaUserNinja style={{marginRight:"15px"}}/>Voir profil</DropdownItem></NavLink>
            <NavLink onClick={() => navigate('/options')}><DropdownItem><FaCog style={{marginRight:"15px"}}/>Options</DropdownItem></NavLink>
            {user.user.roles ? user.user.roles.includes('ROLE_ADMIN') && <NavLink onClick={() => navigate('/administration')}><DropdownItem><FaUserCog style={{marginRight:"15px"}}/>Administration</DropdownItem></NavLink> : <></>}
            <NavLink onClick={() =>  dispatch(logout())}><DropdownItem><FaPowerOff style={{marginRight:"15px"}}/>Se déconnecter</DropdownItem></NavLink>
        </DropdownMenu>
      </Dropdown>
    )
}