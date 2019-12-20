import React from 'react'

export default function ListeGroupe({lst})
{
    return (
        <React.Fragment>
            {lst.map((groupe) => <option key={groupe} value={groupe}> {groupe} </option>)}
        </React.Fragment>
    )
}