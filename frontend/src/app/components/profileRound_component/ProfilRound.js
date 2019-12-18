import React,{useState} from "react";
import {Dropdown, DropdownMenu, DropdownItem} from "shards-react";
import {FaUserNinja, FaCog, FaPowerOff} from "react-icons/fa";

export default function ProfilRound({bgcolor,fcolor,letter})
{
    const [open, setOpen] = useState(false);
    return (
        <Dropdown open={open} toggle={() =>setOpen(!open)} group>
        <div onClick={() => setOpen(!open)} style={{borderRadius:"50%", fontSize:"20px", fontWeight:"450", backgroundColor:bgcolor, color:fcolor, width:"50px", height:"50px", paddingLeft:"18px", lineHeight:"47px"}}>
            {letter}
        </div>
      
        <DropdownMenu right>
          <DropdownItem><FaUserNinja style={{marginRight:"15px"}}/>Voir profil</DropdownItem>
          <DropdownItem><FaCog style={{marginRight:"15px"}}/>Options</DropdownItem>
          <DropdownItem><FaPowerOff style={{marginRight:"15px"}}/>Se déconnecter</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    )
}