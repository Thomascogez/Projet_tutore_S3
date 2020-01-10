import React, {useEffect, useState} from 'react'
import adminStyle from '../../../components/administration_components/module/adminmodule.module.css';
import PageLoader from "../../../components/layouts/loader";
import {APIgetAllSession} from "../../../api/sessionFetch";
import Session from "../../../components/administration_components/session/Session";
import moment from "moment";
import "moment/locale/fr";
import {Card, Col, FormSelect, Row, CardBody, Container, CardHeader} from "shards-react";
import Collapse from "../../../components/layouts/Collapse/CollapseSessions";
import style from "../group/group.module.css";

export default function Sessions()
{
    const [date, setDate] = useState(moment());
    const [arrayYears, setArrayYears] = useState([]);
    const [loading, setLoading] = useState(false);
    const [reload, setReload] = useState(0);

    const jsUcfirst = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function sortFunction(a, b) {
        if (a[0] === b[0]) {
            return 0;
        }
        else {
            return (a[0] < b[0]) ? -1 : 1;
        }
    }

    moment.locale('fr')

    const [sessions, setSessions] = useState({});

    useEffect( () => {
        setLoading(!loading);
        let year = [];
        for(let i = moment().year()+3; i > moment().year()-30; i--)
            year.push(i);
        setArrayYears(year);

        APIgetAllSession(date.format("MM"), date.format("YYYY"), "", "") //fetching session types
            .then(data => {
                let tmp = {};

                Object.entries(data.data).map(weekSessions => {
                    tmp[parseInt(weekSessions[0])] = [];
                    let test = Object.entries(weekSessions[1]).sort(sortFunction);

                    test.map(daySessions => {
                        tmp[parseInt(weekSessions[0])].push(daySessions)
                    })
                })
                setSessions(tmp);
                setLoading(false)
            })
            .catch(err => console.log(err.response));
    }, [date, reload]);

    const setteReload = () => {
        setReload(reload+1);
    }

    return (
        <>
            <Container fluid>
                <Card style={{marginTop: "20px"}}>
                    <CardHeader><h3>Gestion des séances</h3></CardHeader>
                    <CardBody className={style.GroupCardBody}>

                        <div >
                            <Row style={{marginBottom: "7px"}}>
                                <Col md="6">
                                    <FormSelect style={{fontWeight: "bold"}}  value={date.format("M")} onChange={e => setDate(moment(date).set('month', e.target.value-1))}>
                                        { moment.months().map(m => (<option style={{fontWeight: "bold"}} value={moment.months().indexOf(m)+1}>{jsUcfirst(m)}</option>)) }
                                    </FormSelect>
                                </Col>
                                <Col md="6">
                                    <FormSelect style={{fontWeight: "bold"}} value={date.format("YYYY")} onChange={e => setDate(moment(date).set('year', e.target.value))} >
                                        { arrayYears.map(m => (<option style={{fontWeight: "bold"}} value={m} >{m}</option>)) }
                                    </FormSelect>
                                </Col>
                            </Row>
                            <Card>
                                <CardBody>
                                    { (Object.entries(sessions).length > 0) ? (
                                        <React.Fragment>
                                            {Object.entries(sessions).map(weekSessions =>
                                                <>
                                                    <Collapse title={<><span style={{fontWeight: "bold"}}>Semaine n°{weekSessions[0]}</span><span style={{fontSize: "20px"}}> (du {moment().day("Lundi").year(date.year()).week(weekSessions[0]).format("DD/MM/Y")} au {moment().day("Dimanche").year(date.year()).week(weekSessions[0]).format("DD/MM/Y")})</span></>}>
                                                        {
                                                            Object.entries(weekSessions[1]).map(daySessions => (
                                                                <>
                                                                    <Collapse title={<>{moment( date.year() + "-" + date.format("MM") + "-" + daySessions[1][0]).format("dddd DD") }</>}>
                                                                        <table  className={`table table-striped table-hover table-bordered ${adminStyle.Scroll}`}>
                                                                            <thead>
                                                                            <tr>
                                                                                <th>Date</th>
                                                                                <th>Utilisateur</th>
                                                                                <th>Module</th>
                                                                                <th>Groupes</th>
                                                                                <th>Type</th>
                                                                                <th>Evènements</th>
                                                                                <th style={{width: 20 + '%'}}>Edition</th>
                                                                            </tr>
                                                                            </thead>
                                                                            <tbody >
                                                                            {
                                                                                daySessions[1][1].map(session => (
                                                                                    <Session key={session.id} session={session} setReload={setteReload}/>
                                                                                ))
                                                                            }
                                                                            </tbody>
                                                                        </table>
                                                                    </Collapse>
                                                                </>
                                                            ))
                                                        }
                                                    </Collapse>
                                                </>
                                            ) }
                                        </React.Fragment>
                                    ):(<React.Fragment />
                                    )}
                                </CardBody>
                            </Card>
                        </div>
                    </CardBody>
                </Card>
            </Container>

            { (loading) ? (
                <PageLoader />
            ):(
                <React.Fragment />
            )}
        </>
    )
}