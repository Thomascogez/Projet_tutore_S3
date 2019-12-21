import React from 'react'
import style from "./profileround.module.css"
export default function ProfileRound({letter, bgcolor, fcolor, size}) {
    return (
        <div className = {`${style.ProfileRound} ${style[size]}`} style={{backgroundColor:bgcolor, color:fcolor}}>
            {letter}
        </div>
    )
}
