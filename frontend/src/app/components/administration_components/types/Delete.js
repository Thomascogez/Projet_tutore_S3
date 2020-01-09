import React from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "shards-react";
import { removeEventType, removeSessionType } from "../../../providers/actions/typeActions";
import style from "./deleteType.module.css";


toast.configure();

export default function DeleteType({type, id, name, setOpen, open}) {

    const dispatch = useDispatch();

    const handleRemove = (e) => {
        e.preventDefault();
        if(type === "seance") {
            dispatch(removeSessionType(id));
        } else {
            dispatch(removeEventType(id))
        }
        setOpen(!open);
        toast.success("Type " + name + " correctement supprimé !")
    };

    return (
        <div>
            <Modal size="lg" open={open} toggle={setOpen}>
                <ModalHeader className={style.header}>Suppression du groupe</ModalHeader>
                <ModalBody>Voulez-vous confirmer la suppression du type {(type === "seance")?"de seance":"d'évènement"} <span style={{fontWeight: "bold"}}>{name}</span> ?</ModalBody>
                <ModalFooter class={style.comment}>
                    <Button onClick={() => setOpen(!open)}>Annuler</Button>
                    <Button onClick={(e) => handleRemove(e)} theme={"danger"}>Confirmer</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}