import React from "react";

export default function CheckBox(props)
{
    return (
        <div className="custom-control custom-checkbox">
            <input type="checkbox" className="custom-control-input" id={props.id} />
            <label className="custom-control-label" for={props.id}>{props.value}</label>
        </div>
    )
}