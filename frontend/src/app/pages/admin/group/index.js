import React from 'react'
import style from '../../sessions/sessions.module.css'
import adminStyle from '../../../components/administration_components/module/adminmodule.module.css';
import {
    Button
  } from "shards-react" 
  import BarreRecherche from '../../../components/administration_components/module/BarreRecherche'
  import Groupe from '../../../components/administration_components/groupe/Groupe'

export default function Group()
{
    const groupe = [{name:"J1", color:"red"},
                    {name:"C2", color:"green"}
                ];
    return (
        <div >
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
                        {groupe.map((m) =>
                                <Groupe name={m.name} color={m.color} />
                            ) }
                    </tbody>
                </table>
            </div>
        </div>
    )
}