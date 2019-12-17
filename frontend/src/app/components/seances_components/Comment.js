import React,{ useState } from "react";

import style from '../../pages/seances/seances.module.css';

export default function Comment(props)
{
    return (
        <div>
            De : {props.name} à : {props.date} {props.hour}  : {props.comment}
        </div>
    )
}