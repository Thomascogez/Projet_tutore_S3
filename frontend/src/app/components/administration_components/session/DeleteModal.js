import React, {useState} from "react";
import {Modal, ModalHeader, ModalBody, ModalFooter, Button} from "shards-react";
import style from "./deleteModal.module.css";
import {useDispatch} from "react-redux";
import {toast} from "react-toastify";
import {removeModules} from "../../../providers/actions/moduleAction";
import {APIdelSessionID} from "../../../api/sessionFetch";


export default function DeleteModal(props) {

    const dispatch = useDispatch();

    const handleRemove = (e) => {
        e.preventDefault();
        APIdelSessionID(props.id).then(data => {
            toast.success("Séance correctement supprimé !")
            props.reload()
        })
        props.setOpen(!props.open);
    };

    return (
        <div>
            <Modal size="lg" open={props.open} toggle={props.setOpen}>
                <ModalHeader className={style.header}>Suppression du module</ModalHeader>
                <ModalBody>Voulez-vous confirmer la suppression de la séance ?</ModalBody>
                <ModalFooter class={style.comment}>
                    <Button onClick={() => props.setOpen(!props.open)}>Annuler</Button>
                    <Button onClick={(e) => handleRemove(e)} theme={"danger"}>Confirmer</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}