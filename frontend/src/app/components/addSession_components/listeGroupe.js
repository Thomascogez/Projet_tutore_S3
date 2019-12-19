import React from 'react'

export default function ListeGroupe({lstGroupe})
{
    return (
        <React.Fragment>
            {lstGroupe.map((groupe) => <option key={groupe} value={groupe}> {groupe} </option>)}
        </React.Fragment>
    )
}