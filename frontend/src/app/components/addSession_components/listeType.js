import React from 'react'

export default function ListeType({lstType})
{
    return (
        <React.Fragment>
            {lstType.map((type) => <option key={type} value={type}> {type} </option>)}
        </React.Fragment>
    )
}