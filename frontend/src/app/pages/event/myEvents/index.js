import React, {useEffect, useState} from 'react';
import {Card, CardHeader, Container} from 'shards-react'
import style from './myEvents.module.css';
import Event from '../../../components/event_components/Event';
import {APIgetMyEvents} from '../../../api/event';
import moment from "moment";

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
                        tmp[m.session.id].push(m)
                    } else {
                        tmp[m.session.id] = [];
                        tmp[m.session.id][0] = m
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
                <div className="table-responsive">
                    <table className={`table  ${style.EventTable}`}>
                        <thead>
                        <tr>
                            <th>Type</th>
                            <th>Nom séance</th>
                            <th>Type séance</th>
                            <th>Description</th>
                            <th>Durée ({totalDuration}h)</th>
                            <th>Echéance</th>
                            <th>Pièces jointes</th>
                            {/* <th>Edition</th> */}
                        </tr>
                        </thead>
                        <tbody>
                            {
                                Object.entries(events).map(event => 
                                    event[1].map(m => (
                                        <Event key={m.id} event={m} size={event[1].length}/>
                                    ))
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </Card>
        </Container>
    )
}