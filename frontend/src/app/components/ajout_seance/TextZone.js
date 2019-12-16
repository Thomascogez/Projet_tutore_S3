import React from 'react'
import style from './ajoutseance.module.css'
export default function TextZone(props) {
    return (
        <div className={style.ZoneTexte}>
            <h1>{props.text}</h1>
        </div>
    )
}
