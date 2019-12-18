import React from 'react'
import style from '../../seances/seances.module.css'
import {
    Button
  } from "shards-react"
  import BarreRecherche from '../../../components/administration_components/module/BarreRecherche'
  import Module from '../../../components/administration_components/module/Module'

export default function gererModule()
{
    const module = [{name:"MATH",color:"#FF0000"},
                    {name:"CPOA",color:"#00FF00"},
                    {name:"JAVA",color:"#0000FF"},
                    {name:"Base de données",color:"#F0F00F"},
                   ];
    return (
        <div>
            <h1 style={{padding:20}}>Gestion des modules</h1>   
            {<BarreRecherche />}

            <div style={{borderStyle:'solid', margin:50, marginTop:100, padding:10}}>
                <table class="table table-striped">
                    <tbody>
                        <tr>
                            <th>Module</th>
                            <th>Couleur</th>
                            <th>Edition</th>
                        </tr>
                        {module.map((m) =>
                                <Module name={m.name} color={m.color} />
                            ) }
                    </tbody>
                </table>
            </div>
        </div>
    )

}