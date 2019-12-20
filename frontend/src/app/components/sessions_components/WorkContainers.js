import React from 'react'
import style from '../../pages/event/sessions.module.css'

export default function WorkContainers(props) {
    return <div className= {style.WorkContainer}>{props.children}</div>;
}
