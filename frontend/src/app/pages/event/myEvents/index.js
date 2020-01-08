import React, {useEffect, useState} from 'react';
import {Card, CardHeader, Container} from 'shards-react'
import style from './myEvents.module.css';
import {APIgetMyEvents} from '../../../api/event';
import Collapse from "../../../components/layouts/Collapse/CollapseEvents";

export default function MyEvents() {

    const [events, setEvents] = useState({})
    const [totalDuration, setTotalDuration] = useState(0);


    useEffect(() => {
        APIgetMyEvents()
        .then(data =>{

            

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

                    //settest(test =>[...test.sort((a,b) => new moment(a.session.createdAt).format('YYYYMMDD') - new moment(b.session.createdAt).format('YYYYMMDD')), m])
                    /*settest(test =>
                        [...test.sort(function(a, b)
                        {
                            if(a.session.module.name < b.session.module.name) { return -1; }
                            if(a.session.module.name > b.session.module.name) { return 1; }
                            return 0;
                        }),m])*/
                })
            });
            
            setEvents(tmp)
            
        })
    }, [])

    return (
        <Container fluid className={style.EventsContainer}>        
            <Card>
                <CardHeader><h5>Mes évènements </h5></CardHeader>
                    {
                        events.length > 0 &&
                        events.map(session =>(
                            <Collapse
                                    title={session[0].module.name}
                                    size={session[1].length}
                                    events={session[1]}
                                >
                                </Collapse>
                        ))}
                
            </Card>
        </Container>
    )
}