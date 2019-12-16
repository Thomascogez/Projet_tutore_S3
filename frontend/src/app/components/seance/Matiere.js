import React from "react";
import { Button } from "shards-react";
import style from "./seance.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"


export default function Matiere(props) {
    return (
      <div>
        <Button
          onClick={() => alert("Bienvenue dans le cours de " + props.name)}
          style={{ backgroundColor: props.color, borderColor: props.color }}
        >
          {props.name}
        </Button>
      </div>
}

