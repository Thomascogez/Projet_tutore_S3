import React from 'react'
import style from '../../pages/seances/seances.module.css'

export default function WorkContainers(props) {
    return <div className= {style.WorkContainer}>{props.children}</div>;
}
