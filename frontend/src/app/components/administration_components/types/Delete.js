import React from "react";
import {Modal, ModalHeader, ModalBody, ModalFooter, Button} from "shards-react";
import style from "./deleteType.module.css";
import {useDispatch} from "react-redux";
import {toast} from "react-toastify";
import {removeEventType, removeSessionType} from "../../../providers/actions/typeActions";


toast.configure();

export default function DeleteType(props) {

    const dispatch = useDispatch();

    const handleRemove = (e) => {
        e.preventDefault();
        if(props.type === "seance") {
            dispatch(removeSessionType(props.id));
        } else {
            dispatch(removeEventType(props.id))
        }
        props.setOpen(!props.open);
        toast.success("Type " + props.name + " correctement supprimé !")
    };

    return (
        <div>
            <Modal size="lg" open={props.open} toggle={props.setOpen}>
                <ModalHeader className={style.header}>Suppression du groupe</ModalHeader>
                <ModalBody>Voulez-vous confirmer la suppression du type {(props.type === "seance")?"de seance":"d'évènement"} <span style={{fontWeight: "bold"}}>{props.name}</span> ?</ModalBody>
                <ModalFooter class={style.comment}>
                    <Button onClick={() => props.setOpen(!props.open)}>Annuler</Button>
                    <Button onClick={(e) => handleRemove(e)} theme={"danger"}>Confirmer</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}