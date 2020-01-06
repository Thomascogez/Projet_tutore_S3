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
                                            <div>
                                                {
                                                    Object.entries(n[1]). map(o => (
                                                        <Row>
                                                            <Col>{moment(o[1][0].createdAt).format('DD/MM/YYYY')}</Col>
                                                            <Col>{o[1][0].module.name}</Col>
                                                            <Col>{o[1][0].groupe.name}</Col>
                                                        </Row>
                                                    ))
                                                }
                                            </div>
                                            
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