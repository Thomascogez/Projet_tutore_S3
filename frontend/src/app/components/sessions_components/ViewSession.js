import React, {useState} from "react";
import style from '../../pages/sessions/sessions.module.css'

import { navigate } from "hookrouter"

import { FaCheckCircle } from 'react-icons/fa'
import {Badge, Row} from "shards-react";
import Work from "./Work";
import {Tooltip} from "shards-react";

export default function ViewSession(props) {

    const [tooltip, setTooltip] = useState(false);

    return (
        <>
            <Work key={props.session.id} id={props.session.id} groups={props.session.groups} type={props.session.type} color={props.session.module.color === "" ? "#000000" : props.session.module.color} name={props.session.module.name} duration={props.duration} id={props.session.id} />
            <Tooltip
                placement="right"
                open={tooltip}
                target={"#tooltip_"+props.session.id}
                toggle={() => setTooltip(!tooltip)}
            >

                {props.session.groups.map(group => (<Badge style={{backgroundColor: group.color, marginRight: "5px"}}>{group.name}</Badge>))}
            </Tooltip>
        </>
    );
}
