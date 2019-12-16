import React from 'react'
import style from './seance.module.css'
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import { Button, Row, Col } from 'shards-react';
export default function MounthSelector({semaine}) {
    return (
        <Row className={style.MounthSelector}>
            <Col style = {{textAlign: 'left',float:'left'}} lg="4"><FaArrowLeft/></Col>
            <Col style = {{textAlign: 'center'}} lg="4">{semaine}</Col>
            <Col style={{textAlign: 'right',float:'right'}} lg="4"><FaArrowRight/></Col>
        </Row>
    )
}
