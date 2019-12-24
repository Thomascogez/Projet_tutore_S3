import React from 'react'
import { FaFileAlt } from 'react-icons/fa'
export default function File({fileName, link}) {
    return (
        <>
            <div style={{display:"block", fontSize:"10px", textAlign:"left"}}>
                <FaFileAlt style={{fontSize:"30px"}} />
                <a href={link}>Nom du fichier</a>
            </div>
        
         
        </>
    )
}
