import React from 'react'

export default function ListeModule({lstModule})
{    
    return (
        <React.Fragment>
            {lstModule.map((module) =><option key={module} value={module}> {module} </option>)}
        </React.Fragment>
    )
}