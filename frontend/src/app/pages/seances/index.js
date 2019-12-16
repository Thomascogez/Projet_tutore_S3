import React from 'react'
import SeanceContainer from '../../components/seance/SeanceContainer'
import Seance from '../../components/seance/Seance'
export default function Seances() {
    return (
        <div>
            <SeanceContainer>
                <Seance module="Math" date="11/12/19" type="TP" groupe="J1" enseignant="Mr Kilo" />
                <Seance module="Math" date="11/12/19" type="TP" groupe="J1" enseignant="Mr Kilo" />
                <Seance module="Math" date="11/12/19" type="TP" groupe="J1" enseignant="Mr Kilo" />
                
            </SeanceContainer>
        </div>
    )
}
