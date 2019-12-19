import React, {useState} from "react";
import {Modal, ModalHeader, ModalBody, ModalFooter, Button} from "shards-react";
import style from "./deleteModal.module.css";


export default function DeleteModal({name, open, setOpen, color}) {
    return (
        <div>
            <Modal size="lg" open={open} toggle={setOpen}>
                <ModalHeader className={style.header}>Suppression du module</ModalHeader>
                <ModalBody>Voulez-vous confirmer la suppression du module <span style={{color:color, fontWeight: "bold"}}>{name}</span> ?</ModalBody>
                <ModalFooter class={style.comment}>
                    <Button onClick={() => setOpen(!open)}>Annuler</Button>
                    <Button theme={"danger"}>Confirmer</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}