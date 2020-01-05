import React from 'react'

export default function LstModule({modules}) {
    return (
        <>
            {modules && modules.map(module => <option key={module.id} value={module.id} style={{color:module.color}}>{`${module.code} - ${module.name}`}</option>)}
        </>
    )
}
