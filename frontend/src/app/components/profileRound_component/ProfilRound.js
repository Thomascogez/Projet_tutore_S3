import React,{useState} from "react";
import {Dropdown, DropdownMenu, DropdownItem, NavLink} from "shards-react";
import {FaUserNinja, FaCog, FaPowerOff, FaUserCog} from "react-icons/fa";
import { navigate } from 'hookrouter'

export default function ProfilRound({bgcolor,fcolor,letter})
{
    const [open, setOpen] = useState(false);
    return (
        <Dropdown open={open} toggle={() =>setOpen(!open)} group>
        <div onClick={() => setOpen(!open)} style={{borderRadius:"50%", fontSize:"20px", fontWeight:"450", backgroundColor:bgcolor, color:fcolor, width:"50px", height:"50px", paddingLeft:"18px", lineHeight:"47px", cursor: "pointer"}}>
            {letter}
        </div>
      
        <DropdownMenu right>
            <NavLink><DropdownItem><FaUserNinja style={{marginRight:"15px"}}/>Voir profil</DropdownItem></NavLink>
            <NavLink><DropdownItem><FaCog style={{marginRight:"15px"}}/>Options</DropdownItem></NavLink>
            <NavLink onClick={() => navigate('/administration')}><DropdownItem><FaUserCog style={{marginRight:"15px"}}/>Administration</DropdownItem></NavLink>
            <NavLink onClick={() => navigate('/')}><DropdownItem><FaPowerOff style={{marginRight:"15px"}}/>Se déconnecter</DropdownItem></NavLink>
        </DropdownMenu>
      </Dropdown>
    )
}