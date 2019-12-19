import React from 'react'
import style from '../../pages/event/sessions.module.css'
export default function DayContainer({day}) {
    return (
        <div className= {style.DayContainer}>{day}</div>
    )
}
