import React from "react";

export default function Comment(props)
{
    return (
        <div>
            De : {props.name} à : {props.date} {props.hour}  : {props.comment}
        </div>
    )
}