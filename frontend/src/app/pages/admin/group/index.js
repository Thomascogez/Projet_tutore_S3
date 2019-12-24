import React, {useState, useEffect} from 'react'
import adminStyle from '../../../components/administration_components/module/adminmodule.module.css';
import BarreRecherche from '../../../components/administration_components/module/BarreRecherche'
import Groupe from '../../../components/administration_components/groupe/Groupe'
import PageLoader from "../../../components/layouts/loader";
import {useDispatch, useSelector} from "react-redux";
import {getGroups} from "../../../providers/actions/groupActions";

export default function Group()
{
    const dispatch   = useDispatch();
    const groupState = useSelector(state => state.group);

    useEffect( () => {
        dispatch(getGroups());
    }, []);

    return (
        <div>
            <h1 style={{padding:20}}>Gestion des groupes</h1>   
            {<BarreRecherche />}

            <div style={{margin:50, marginTop:100, padding:10}}>
                <table  className={`table table-striped ${adminStyle.Scroll}`}>
                    <thead>
                        <tr>
                            <th>Groupe</th>
                            <th>Couleur</th>
                            <th>Dépendance</th>
                            <th style={{width: 20 + '%'}}>Edition</th>
                        </tr>
                    </thead>
                    <tbody >
                        { (groupState.groups.length > 0) ? (
                            <React.Fragment>
                                {groupState.groups.map((m) =>
                                    <Groupe key={m.id} group={m}/>
                                ) }
                            </React.Fragment>
                        ):(<React.Fragment />
                        )}
                    </tbody>
                </table>
            </div>
            { (groupState.groups.length > 0) ? (
                <React.Fragment />
            ):(
                <PageLoader />
            )}
        </div>
    )
}