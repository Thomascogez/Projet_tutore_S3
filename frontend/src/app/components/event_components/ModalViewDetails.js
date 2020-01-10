import React, { useState } from 'react';
import { Modal, ModalBody, ModalHeader } from 'shards-react';
import PropTypes from 'prop-types'

export default function ModalViewDetails({ text }) {
    const [open, setOpen] = useState(false)

    ModalViewDetails.propTypes = {

        /** String contenant les détails d'un évènement */
        text : PropTypes.string
    
    }

    return (
        <>
            <a href="#" onClick={e => { e.preventDefault(); setOpen(!open) }} >Voir plus de détails ...</a>
            <Modal open={open} toggle={setOpen} >
                <ModalHeader>Détails de l'événement</ModalHeader>
                <ModalBody>{text}</ModalBody>
            </Modal>
        </>
    )
}
