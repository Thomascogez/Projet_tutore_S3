import React, { useState } from 'react'
import { Modal, ModalBody, ModalHeader } from 'shards-react'
import { FaFileAlt } from "react-icons/fa";
import File from './File'
import PropTypes from 'prop-types'

const ModalViewsFiles = ({ files }) => {
    const [open, setOpen] = useState(false)

    ModalViewsFiles.propTypes = {

        /** String contenant les détails d'un évènement */
        files : PropTypes.array
    
    }

    return (
        <>
            <a href='#' onClick={(e) => {
                e.preventDefault();
                setOpen(!open)
            }} style={{ color: "green" }}><FaFileAlt /></a>
            <Modal size="lg" open={open} toggle={setOpen}>
                <div style={ {overflowY:"auto",maxHeight: "300px" }} >
                    <ModalHeader>Pièces jointes de l'évènement</ModalHeader>
                    <ModalBody className="table-responsive">
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
                                {files && files.map(item => (
                                    <>
                                        <File key={item.id} file={item} />
                                    </>
                                ))}
                            </tbody>
                        </table>
                    </ModalBody>
                </div>

            </Modal>
        </>
    )
}


export default ModalViewsFiles
