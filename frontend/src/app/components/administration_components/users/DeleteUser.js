import React from "react";
import {Modal, ModalHeader, ModalBody, ModalFooter, Button, Badge} from "shards-react";
import style from "./deleteUser.module.css";
import {useDispatch} from "react-redux";
import {toast} from "react-toastify";
import {getUsers, removeUser} from "../../../providers/actions/userActions";


toast.configure();

export default function DeleteUser(props) {

    const dispatch = useDispatch();

    const handleRemove = (e) => {
        e.preventDefault();
        dispatch(removeUser(props.user.id));
        props.setOpen(!props.open);
        toast.success("Utilisateur " + props.user.username + " correctement supprimé !")
    };

    return (
        <div>
            <Modal size="lg" open={props.open} toggle={props.setOpen}>
                <ModalHeader className={style.header}>Suppression de l'utilisateur</ModalHeader>
                <ModalBody>Voulez-vous confirmer la suppression de l'utilisateur <Badge style={{backgroundColor: props.user.color}}>#{props.user.username}</Badge> <span style={{fontWeight: "bold"}}>{props.user.firstname + " " + props.user.lastname}</span> ?</ModalBody>
                <ModalFooter class={style.comment}>
                    <Button onClick={() => props.setOpen(!props.open)}>Annuler</Button>
                    <Button onClick={(e) => handleRemove(e)} theme={"danger"}>Confirmer</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}