import React from "react";
import {Modal, ModalHeader, ModalBody, ModalFooter, Button} from "shards-react";
import style from "./deleteGroup.module.css";
import {useDispatch} from "react-redux";
import {removeGroups} from "../../../providers/actions/groupActions";
import {toast} from "react-toastify";


toast.configure();

export default function DeleteGroup(props) {

    const dispatch = useDispatch();

    const handleRemove = (e) => {
        e.preventDefault();
        dispatch(removeGroups(props.id));
        props.setOpen(!props.open);
        toast.success("Groupes " + props.name + " correctement supprimé !")
    };

    return (
        <div>
            <Modal size="lg" open={props.open} toggle={props.setOpen}>
                <ModalHeader className={style.header}>Suppression du groupe</ModalHeader>
                <ModalBody>Voulez-vous confirmer la suppression du Groupe <span style={{color: props.color, fontWeight: "bold"}}>{props.name}</span> ?</ModalBody>
                <ModalBody style={{fontWeight: "bold"}}>Cette action supprimeras tous les groupes dépendants de ce groupe !</ModalBody>
                <ModalFooter class={style.comment}>
                    <Button onClick={() => props.setOpen(!props.open)}>Annuler</Button>
                    <Button onClick={(e) => handleRemove(e)} theme={"danger"}>Confirmer</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}