import React, {useEffect, useState} from 'react'
import adminStyle from '../../../components/administration_components/module/adminmodule.module.css';
import BarreRecherche from '../../../components/administration_components/module/BarreRecherche'
import Module from '../../../components/administration_components/module/Module'
import {useDispatch, useSelector} from "react-redux";
import {getModules} from "../../../providers/actions/moduleAction";
import PageLoader from "../../../components/layouts/loader";
import {APIgetAllSession} from "../../../api/sessionFetch";
import Session from "../../../components/administration_components/session/Session";

export default function Sessions()
{

    function sortFunction(a, b) {
        if (a[0] === b[0]) {
            return 0;
        }
        else {
            return (a[0] < b[0]) ? -1 : 1;
        }
    }

    const [sessions, setSessions] = useState({});
    useEffect( () => {
        APIgetAllSession()
            .then(data => {
                let tmp = [];

                Object.entries(data.data).map(weekSessions => {
                    tmp[weekSessions[0]] = [];
                    let test = Object.entries(weekSessions[1]).sort(sortFunction);

                    test.map(daySessions => {
                        tmp[weekSessions[0]].push(daySessions)
                    })
                })
                console.log(tmp)
                setSessions(data.data);
            })
    }, []);

    return (
        <div >
            <h1 style={{padding:20}}>Gestion des séances</h1>
            {<BarreRecherche />}

            <div style={{margin:50, marginTop:100, padding:10}}>
                <table  className={`table table-striped ${adminStyle.Scroll}`}>
                    <thead>
                    <tr>
                        <th>Code</th>
                        <th>Module</th>
                        <th>Couleur</th>
                        <th style={{width: 20 + '%'}}>Edition</th>
                    </tr>
                    </thead>
                    <tbody >
                    { (sessions.length > 0) ? (
                        <React.Fragment>
                            <Session key={-1} session={null} />
                            {sessions.map(m =>
                                <Session key={m.id} session={m} />
                            ) }
                        </React.Fragment>
                    ):(<React.Fragment />
                    )}
                    </tbody>
                </table>
            </div>
            { (Object.entries(sessions).length > 0 ) ? (
                <React.Fragment />
            ):(
                <PageLoader />
            )}
        </div>
    )

}