import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Card, CardBody, CardHeader, Container } from 'shards-react';
import Groupe from '../../../components/administration_components/groupe/Groupe';
import adminStyle from '../../../components/administration_components/module/adminmodule.module.css';
import PageLoader from "../../../components/layouts/loader";
import { getGroups } from "../../../providers/actions/groupActions";
import style from "./group.module.css";


export default function Group() {

    const dispatch = useDispatch();
    const groupState = useSelector(state => state.group);

    useEffect(() => {
        dispatch(getGroups());
    }, []);

    return (
        <>
            <Container fluid>
                <Card style={{marginTop: "20px"}}>
                    <CardHeader><h3>Gestion des groupes</h3></CardHeader>
                    <CardBody className={style.GroupCardBody}>
                        <div className="table-responsive">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Groupe</th>
                                        <th>Couleur</th>
                                        <th>Dépendance</th>
                                        <th style={{ width: '20%' }}>Edition</th>
                                    </tr>
                                </thead>
                                <tbody >
                                    <Groupe group={null} />
                                    {(groupState.groups.length > 0) ? (
                                        <>
                                            {groupState.groups.map((m) =>
                                                <Groupe key={m.id} group={m} />
                                            )}
                                        </>
                                    ) : (<></>)}
                                </tbody>
                            </table>
                        </div>
                    </CardBody>
                </Card>
            </Container>
            {groupState.groups.length < 0 && <PageLoader />}
        </>
    )
}