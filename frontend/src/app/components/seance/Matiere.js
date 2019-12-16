import React from "react";
import { Button } from "shards-react";
import style from "./seance.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"  

function activateClick (){
    
}

export default function Matiere(props) {
    return (
        <div>
            <Button onClick={activateClick} style={{backgroundColor: props.color}} >{props.name}</Button>
        </div>
    )
}

