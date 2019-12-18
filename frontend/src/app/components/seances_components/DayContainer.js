import React from 'react'
import style from '../../pages/seances/seances.module.css'
export default function DayContainer({day}) {
    return (
        <div className= {style.DayContainer}>{day}</div>
    )
}
