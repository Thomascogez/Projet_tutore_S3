import React from 'react';
import Modal from '../../components/seances_components/Modal'

export default function test() {
    return (
        <div>
            <Modal name="Mathematiques"
                   cours="Veuillez remplir le questionnaire ci-joint !"
                   fichier= "FichierARemplir.odf"
            />
            <Modal name="CPOA"
                   cours="Il y aura un contrôle le 12/09/20, reviser tout depuis le début d'année"
                   fichier= ""
            />
        </div>
    )
}