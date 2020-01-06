import React, {useState, useEffect} from 'react';
import {APIgetMySession} from '../../api/sessionFetch';
import moment from 'moment'
import style from './mySession.module.css';
import {
    Container,
    Row,
    Col
} from 'shards-react';
import PageLoader from '../../components/layouts/loader';

export default function MySession()
{
    const [mySession, setMySession] = useState({})

    useEffect(() => {
        APIgetMySession()
        .then(data => {     
            setMySession(data.data);            
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
                            <Col>Module</Col>
                            <Col>Groupe</Col>
                        </Row>
                        { (Object.keys(mySession).length === 0)? (
                            <PageLoader />
                        ):(                            
                            Object.entries(mySession). map(m => (
                                <div>
                                    {
                                        Object.entries(m[1]). map(n => (
                                            <Row>
                                                {
                                                    Object.entries(n[1]). map(o => (
                                                        <div>
                                                            {console.log(o[1])}
                                                            <Col>{moment(o[1][0].createdAt).format('DD/MM/YYYY')}</Col>
                                                            {Object.keys(o[1][0].module).map(q => (
                                                                <Col>
                                                                    { q[1]}
                                                                </Col>
                                                            ))}
                                                            {Object.keys(o[1][0].groupe).map(q => (
                                                                <Col>
                                                                    {q[2]}
                                                                </Col>
                                                            ))}
                                                        </div>
                                                    ))
                                                }
                                            </Row>
                                            
                                        ))
                                    }
                                </div>
                                
                            ))
                        )}
                    </Container>
                </div>
            </div>
    )
}