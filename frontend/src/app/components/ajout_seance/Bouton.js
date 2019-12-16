import React from 'react'
import { Button } from "shards-react";
import style from './ajoutseance.module.css'

export default function Bouton(props) {
    return (
        <div className={style.Bouton}>
            <Button block style={{backgroundColor: props.color, borderColor: props.color}}>{props.name}</Button>
        </div>
    )
}
