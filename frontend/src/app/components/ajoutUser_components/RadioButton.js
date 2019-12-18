import React from "react";

export default function RadioButton(props)
{
    return (
        <div className="custom-control custom-radio">
            <input
              type="radio"
              id={props.id}
              name={props.name}
              className="custom-control-input"
            />
            <label className="custom-control-label" for={props.id}>{props.value}</label>
          </div>
    )
}