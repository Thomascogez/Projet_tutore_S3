import React, {useState, useEffect} from 'react';
import {APIgetMySession} from '../../api/sessionFetch';
import style from './mySession.module.css';
import {
    Container,
    Row,
    Col
} from 'shards-react';

export default function MySession()
{
    const [mySession, setMySession] = useState({})

    useEffect(() => {
        APIgetMySession()
        .then(data => {
            setMySession(data);
        })
        .catch(err => console.log(err));
    }, [])

    return (
            <div>
                <h1 className={style.Titre}>Mes seances</h1>
                <div className={style.Box}>
                    <Container className={style.Contain}>
                        <Row>
                            <Col>Date</Col>
                            <Col>Modude</Col>
                            <Col>Groupe</Col>
                        </Row>
                    </Container>
                </div>
            </div>
    )
}