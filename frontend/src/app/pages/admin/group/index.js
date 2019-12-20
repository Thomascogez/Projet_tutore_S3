import React, {useState, useEffect} from 'react'
import adminStyle from '../../../components/administration_components/module/adminmodule.module.css';
import BarreRecherche from '../../../components/administration_components/module/BarreRecherche'
import Groupe from '../../../components/administration_components/groupe/Groupe'
import PageLoader from "../../../components/layouts/loader";
import {getAllGroups} from "../../../api/groups";

export default function Group()
{
    const [groups, setGroups] = useState({});

    useEffect(() => {
        getAllGroups(setGroups);
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
                            <th style={{width: 20 + '%'}}>Edition</th>
                        </tr>
                    </thead>
                    <tbody >
                        { (groups.length > 0) ? (
                            <React.Fragment>
                                {groups.map((m) =>
                                    <Groupe name={m.name} color={m.color} />
                                ) }
                            </React.Fragment>
                        ):(<React.Fragment />
                        )}
                    </tbody>
                </table>
            </div>

            { (groups.length > 0) ? (
                <React.Fragment />
            ):(
                <PageLoader />
            )}
        </div>
    )
}