import React from 'react'
import style from '../../pages/event/sessions.module.css'
import ScrollContainer from 'react-indiana-drag-scroll'

export default function WorkContainers(props) {
    return <ScrollContainer className= {style.WorkContainer}>{props.children}</ScrollContainer>;
}
