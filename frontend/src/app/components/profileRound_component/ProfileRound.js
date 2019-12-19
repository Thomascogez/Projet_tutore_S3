import React from 'react'

export default function ProfileRound({letter, bgcolor, fcolor, className}) {
    return (
        <div className = {className} style={{borderRadius:"50%", fontWeight:"450", backgroundColor:bgcolor, color:fcolor}}>
            {letter}
        </div>
    )
}
