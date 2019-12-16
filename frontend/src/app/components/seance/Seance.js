import React from 'react'
import  { Button } from 'shards-react'

export default function Seance({module, date, type, groupe, enseignant}) {
    return (
        <tr>
            <th>{module}</th>
            <th>{date}</th>
            <th>{type}</th>
            <th>{groupe}</th>
            <th>{enseignant}</th>
            <th><Button>Voir plus</Button></th>
        </tr>
    )
}
