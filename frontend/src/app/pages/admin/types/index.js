import React, {useEffect} from 'react'
import adminStyle from '../../../components/administration_components/module/adminmodule.module.css';
import BarreRecherche from '../../../components/administration_components/module/BarreRecherche'
import PageLoader from "../../../components/layouts/loader";
import {useDispatch, useSelector} from "react-redux";
import {Col, Row} from "shards-react";
import SessionType from "../../../components/administration_components/types/SessionType";
import {getEventTypes, getSessionTypes} from "../../../providers/actions/typeActions";
import EventType from "../../../components/administration_components/types/EventType";

export default function Types()
{
    const dispatch = useDispatch();

    const sessionTypeState = useSelector(state => state.type);


    useEffect( () => {
        dispatch(getSessionTypes());
        dispatch(getEventTypes());
    }, []);

    return (
        <div>
            <h1 style={{padding:20}}>Gestion des types</h1>
            {<BarreRecherche />}

            <Row>
                <Col sm="12" lg="6">
                    <div style={{margin:50, marginTop:100, padding:10}}>
                        <h4>Types de séances</h4>
                        <table className={`table table-striped ${adminStyle.Scroll}`}>
                            <thead>
                            <tr>
                                <th>Nom</th>
                                <th style={{width: 20 + '%'}}>Edition</th>
                            </tr>
                            </thead>
                            <tbody >
                            { (sessionTypeState.sessionType.length > 0) ? (
                                <React.Fragment>
                                    <SessionType key={-1} sessionType={null} />
                                    {sessionTypeState.sessionType.map((m) =>
                                        <SessionType key={m.id} sessionType={m} />
                                    ) }
                                </React.Fragment>
                            ):(<React.Fragment />
                            )}
                            </tbody>
                        </table>
                    </div>
                </Col>


                <Col sm="12" lg="6">
                    <div style={{margin:50, marginTop:100, padding:10}}>
                        <h4>Types d'évènements</h4>
                        <table className={`table table-striped ${adminStyle.Scroll}`}>
                            <thead>
                            <tr>
                                <th>Nom</th>
                                <th>Prof</th>
                                <th>Tuteur</th>
                                <th style={{width: 20 + '%'}}>Edition</th>
                            </tr>
                            </thead>
                            <tbody >
                            { (sessionTypeState.eventType.length > 0) ? (
                                <React.Fragment>
                                    <EventType key={-1} eventType={null} />
                                    {sessionTypeState.eventType.map((m) =>
                                        <EventType key={m.id} eventType={m} />
                                    ) }
                                </React.Fragment>
                            ):(<React.Fragment />
                            )}
                            </tbody>
                        </table>
                    </div>
                </Col>
            </Row>
            { (sessionTypeState.sessionType.length > 0 || sessionTypeState.eventType.length > 0) ? (
                <React.Fragment />
            ):(
                <PageLoader />
            )}
        </div>
    )
}