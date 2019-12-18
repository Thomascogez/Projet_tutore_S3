import React from 'react'
import style from '../../pages/seances/seances.module.css'
export default function WeekContainer(props) {
    return (
        <div className={`align-middle ${style.WeekContainer}`}>{props.week}</div>
    )
}
