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
                    <table className={`table table-striped`}>
                        <thead>
                        <tr>
                            <td>Nom</td>
                            <td>Type</td>
                            <td>Taille</td>
                            <td>Téléchargements</td>
                        </tr>
                        </thead>
                        <tbody>
                        {files && files.map(item =>(
                            <>
                                <File key={item.id} file={item} />
                            </>
                        ))}
                        </tbody>
                    </table>
                </ModalBody>
                
            </Modal>
        </>
    )
}


export default ModalViewsFiles
