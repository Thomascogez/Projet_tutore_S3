import React,{useState} from "react";
import { FormCheckbox } from "shards-react";

export default function ProfilRound({text})
{
    const [open, setOpen] = useState(false);
    return (
        <div style={{fontSize:"18px"}}>
            <FormCheckbox
                toggle
                checked={open}
                onChange={() =>setOpen(!open)}>
                {text}
            </FormCheckbox>
        </div>
    )
}