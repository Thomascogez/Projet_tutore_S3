import React from 'react'
import MouthSelector from '../../components/seance/MounthSelector'
import SeanceModal from '../../components/seance/SeanceModal'
export default function Seances() {
    return (
        <div>
            <MouthSelector semaine="Decembre 2018" />
            <SeanceModal/>
        </div>
    )
}
