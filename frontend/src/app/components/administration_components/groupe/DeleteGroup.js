import React, {useState} from "react";
import {Modal, ModalHeader, ModalBody, ModalFooter, Button} from "shards-react";
import style from "./deleteGroup.module.css";


export default function DeleteGroup({name, open, setOpen, color}) {
    return (
        <div>
            <Modal size="lg" open={open} toggle={setOpen}>
                <ModalHeader className={style.header}>Suppression du groupe</ModalHeader>
                <ModalBody>Voulez-vous confirmer la suppression du Groupe <span style={{color:color, fontWeight: "bold"}}>{name}</span> ?</ModalBody>
                <ModalFooter class={style.comment}>
                    <Button onClick={() => setOpen(!open)}>Annuler</Button>
                    <Button theme={"danger"}>Confirmer</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}