import React, { useState } from 'react'
import { Modal, ModalBody, ModalHeader } from 'shards-react'

export default function SeanceModal() {
    const[open, isOpen] = useState(true);
    return (
        <Modal size="lg" open={open} toggle={isOpen}>
          <ModalHeader>Cours de Math</ModalHeader>
          <ModalBody>
              
          </ModalBody>
        </Modal>
    )
}
