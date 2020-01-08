import React from "react";
import {Modal, ModalHeader, ModalBody, ModalFooter, Button} from "shards-react";
import style from "./deleteModal.module.css";
import {useDispatch} from "react-redux";
import {toast} from "react-toastify";
import {removeModules} from "../../../providers/actions/moduleAction";


export default function DeleteModal(props) {

    const dispatch = useDispatch();

    const handleRemove = (e) => {
        e.preventDefault();
        dispatch(removeModules(props.id));
        props.setOpen(!props.open);
        toast.success("Module  " + props.name + " correctement supprimé !")
    };

    return (
        <div>
            <Modal size="lg" open={props.open} toggle={props.setOpen}>
                <ModalHeader className={style.header}>Suppression du module</ModalHeader>
                <ModalBody>Voulez-vous confirmer la suppression du module <span style={{color:props.color, fontWeight: "bold"}}>{props.name}</span> ?</ModalBody>
                <ModalFooter class={style.comment}>
                    <Button onClick={() => props.setOpen(!props.open)}>Annuler</Button>
                    <Button onClick={(e) => handleRemove(e)} theme={"danger"}>Confirmer</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}