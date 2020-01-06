import React, {useEffect, useState} from 'react';
import { Card, Container, CardHeader } from 'shards-react'
import style from './myEvents.module.css';
import Event from '../../../components/event_components/Event';
import { APIgetMyEvents } from '../../../api/event';
import { APIgetAllsessionTypes } from "../../../api/type/session";

export default function MyEvents() {

    const [events, setEvents] = useState({})
    const [types, setTypes] = useState({})

    useEffect(() => {
        APIgetMyEvents()
        .then(data =>{setEvents(data.data)})
    }, [])

    return (
        <Container fluid className={style.EventsContainer}>
            {/* <h1 className={style.Title}></h1> */}
        
            <Card >
                <CardHeader>Mes évènements</CardHeader>
                <div className="table-responsive">
                    <table className={`table  ${style.EventTable}`}>
                        <thead>
                        <tr>
                            <th>Etat</th>
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