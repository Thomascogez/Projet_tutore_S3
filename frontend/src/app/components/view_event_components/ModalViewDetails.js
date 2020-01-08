import React, { useState } from 'react'
import { Modal, ModalHeader, ModalBody } from 'shards-react'

export default function ModalViewDetails({text}) {
    const [open, setOpen] = useState(false)
    return (
        <>
            <a href="#" onClick = {e => {e.preventDefault(); setOpen(!open)}} >Voir plus de détails ...</a>
            <Modal open={open} toggle={setOpen} >
                <ModalHeader>Détail de l'événement</ModalHeader>
                <ModalBody>{text}</ModalBody>
            </Modal>
        </>
    )
}
