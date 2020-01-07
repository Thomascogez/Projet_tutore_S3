import React, { useState } from 'react'
import { Modal, ModalHeader, ModalBody  } from 'shards-react'
import { FaFileAlt } from "react-icons/fa";
import File from './File'
const ModalViewsFiles = ({files}) => {
    const [open, setOpen] = useState(false)
    return (

        <>
            <a href="#" onClick={() => setOpen(!open)} style={{color:"green"}}><FaFileAlt/></a>
            <Modal s open={open} toggle={setOpen}>
                <ModalHeader>Pièces jointes de l'évènement</ModalHeader>
                <ModalBody>
                {files && files.map(item =>(
                    <File key={item.id} link={item.source} />
                ))}
                </ModalBody>
                
            </Modal>
        </>
    )
}


export default ModalViewsFiles
