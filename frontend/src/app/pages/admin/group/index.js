import React, {useState, useEffect} from 'react'
import adminStyle from '../../../components/administration_components/module/adminmodule.module.css';
import BarreRecherche from '../../../components/administration_components/module/BarreRecherche'
import Groupe from '../../../components/administration_components/groupe/Groupe'
import PageLoader from "../../../components/layouts/loader";
import {useDispatch, useSelector} from "react-redux";
import {getGroups} from "../../../providers/actions/groupActions";
import { Container } from 'shards-react';
import style from "./group.module.css"

export default function Group()
{
    const [loader, setLoader] = useState(false);

    const dispatch   = useDispatch();
    const groupState = useSelector(state => state.group);

    useEffect( () => {
        dispatch(getGroups());
    }, []);

    return (
        <Container fluid className={style.AdminGroupContainer}>
            <h1 className={style.Titre}>Gestion des groupes</h1>   
            {<BarreRecherche />}

            <div className={`${style.AdminGroupeDiv} table-responsive`}>
                <table  className={`table table-striped ${adminStyle.Scroll}`}>
                    <thead>
                        <tr>
                            <th>Groupe</th>
                            <th>Couleur</th>
                            <th>Dépendance</th>
                            <th style={{width: '20%'}}>Edition</th>
                        </tr>
                    </thead>
                    <tbody >
                        <Groupe key={-1} group={null} />
                        { (groupState.groups.length > 0) ? (
                            <React.Fragment>
                                {groupState.groups.map((m) =>
                                    <Groupe key={m.id} group={m} />
                                ) }
                            </React.Fragment>
                        ):(<React.Fragment />
                        )}
                    </tbody>
                </table>
            </div>
            { (groupState.groups.length > 0 || loader === true) ? (
                <React.Fragment />
            ):(
                <PageLoader />
            )}
        </Container>
    )
}