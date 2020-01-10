import React from "react";
import {Modal, ModalHeader, ModalBody, ModalFooter, Button} from "shards-react";
import style from "./deleteModal.module.css";
import {toast} from "react-toastify";
import {APIdelSessionID} from "../../../api/sessionFetch";


export default function DeleteModal({open, id, setOpen, reload }) {


    const handleRemove = (e) => {
        e.preventDefault();
        APIdelSessionID(id).then(data => {
            toast.success("Séance correctement supprimée !")
            reload()
        })
        setOpen(!open);
    };

    return (
        <div>
            <Modal size="lg" open={open} toggle={setOpen}>
                <ModalHeader className={style.header}>Suppression du module</ModalHeader>
                <ModalBody>Voulez-vous confirmer la suppression de la séance ?</ModalBody>
                <ModalFooter class={style.comment}>
                    <Button onClick={() => setOpen(!open)}>Annuler</Button>
                    <Button onClick={(e) => handleRemove(e)} theme={"danger"}>Confirmer</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}