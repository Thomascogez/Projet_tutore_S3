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
                        <Row style={{border:"1px solid black", padding:"10px", fontSize:"30px"}}>
                            <Col style={{marginLeft:"1%"}}>Date</Col>
                            <Col>Module</Col>
                            <Col>Groupe</Col>
                        </Row>
                        { (Object.keys(mySession).length === 0)? (
                            <PageLoader />
                        ):(                            
                            Object.entries(mySession). map(m => (
                                <div style={{border:"1px solid black", padding:"5px", marginTop:"5px", marginBottom:"5px"}}>
                                    <scan style={{marginLeft:"2%"}}>{m[0]}</scan>
                                    {
                                        Object.entries(m[1]). map(n => (
                                            <div style={{border:"1px solid black", padding:"5px", marginTop:"5px", marginBottom:"5px"}}>
                                                <scan style={{marginLeft:"4%"}}>{n[0]}</scan>
                                                {
                                                    Object.entries(n[1]). map(o => (
                                                        <Row>
                                                            {console.log(o)}
                                                            <Col style={{marginLeft:"6%"}}>{moment(o[1][0].createdAt).format("DD/MM")}</Col>
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