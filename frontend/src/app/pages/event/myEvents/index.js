import React, {useEffect, useState} from 'react';
import {Card, CardHeader, Container} from 'shards-react'
import style from './myEvents.module.css';
import {APIgetMyEvents} from '../../../api/event';
import Collapse from "../../../components/layouts/Collapse/CollapseEvents";
import PageLoader from "../../../components/layouts/loader";
import moment from "moment";

export default function MyEvents() {

    const [events, setEvents] = useState({})
    const [totalDuration, setTotalDuration] = useState(0);
    const [loader, setLoader] = useState(false);


    useEffect(() => {
        setLoader(true)
        APIgetMyEvents()
        .then(data =>{
            setLoader(false)
            let tmp = [];

            Object.entries(data.data).forEach(event => {
                event[1].forEach(m => {
                    
                    if(tmp[m.session.id]) {
                        tmp[m.session.id][1].push(m)
                    } else {
                        tmp[m.session.id] = [];
                        tmp[m.session.id][1] = [];
                        tmp[m.session.id][0] = m.session
                        tmp[m.session.id][1].push(m)
                    }

                    if (m.duration) setTotalDuration(totalDuration => m.duration + totalDuration)

                })
            });
            console.log(tmp)
            setEvents(tmp)
            
        })
    }, [])

    return (
        <>
            <Container fluid className={style.EventsContainer}>
                <Card>
                    <CardHeader><h5>Mes évènements </h5></CardHeader>
                        {
                            events.length > 0 &&
                            events.map(session =>(
                                <Collapse
                                        key={session[0].id}
                                        title={(<>{session[0].module.name} <span style={{fontSize: "15px"}}>{moment(session[0].createdAt).format("DD/MM/YYYY")}</span></>)}
                                        size={session[1].length}
                                        events={session[1]}
                                    >
                                    </Collapse>
                            ))}

                </Card>
            </Container>
            {loader &&
            <PageLoader />
            }
        </>
    )
}