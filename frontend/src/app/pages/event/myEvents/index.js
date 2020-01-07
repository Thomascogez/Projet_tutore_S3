import React, {useEffect, useState} from 'react';
import { Card, Container, CardHeader } from 'shards-react'
import style from './myEvents.module.css';
import Event from '../../../components/event_components/Event';
import { APIgetMyEvents } from '../../../api/event';

export default function MyEvents() {

    const [events, setEvents] = useState({})

    useEffect(() => {
        APIgetMyEvents()
        .then(data =>{setEvents(data.data)})
    }, [])

    return (
        <Container fluid className={style.EventsContainer}>        
            <Card >
                <CardHeader><h5>Mes évènements</h5></CardHeader>
                <div className="table-responsive">
                    <table className={`table  ${style.EventTable}`}>
                        <thead>
                        <tr>
                            <th>Type</th>
                            <th>Nom séance</th>
                            <th>Type séance</th>
                            <th>Description</th>
                            <th>Durée</th>
                            <th>Echéance</th>
                            <th>Pièces jointes</th>
                            <th>Edition</th>
                        </tr>
                        </thead>
                        <tbody>
                            {
                                Object.entries(events).map(event => 
                                    event[1].map(m => (
                                        <Event key={m.id} event={m} />
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