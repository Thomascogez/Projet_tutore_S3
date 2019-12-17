import React from 'react';
import { Button } from 'shards-react';
import style from '../../pages/seances/seances.module.css';
export default function Matiere(props) {
    return <Button style={{ backgroundColor: props.color, borderColor: props.color }} className= {style.Matiere}>{props.name}</Button>;
}
