import React from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Badge, Button, Modal, ModalBody, ModalFooter, ModalHeader } from "shards-react";
import { removeUser } from "../../../providers/actions/userActions";
import style from "./deleteUser.module.css";



export default function DeleteUser({ user, open, setOpen }) {

    const dispatch = useDispatch();

    const handleRemove = (e) => {
        e.preventDefault();
        dispatch(removeUser(user.id));
        setOpen(!open);
        toast.success("Utilisateur " + user.username + " correctement supprimé !")
    };

    return (
        <div>
            <Modal size="lg" open={open} toggle={setOpen}>
                <ModalHeader className={style.header}>Suppression de l'utilisateur</ModalHeader>
                <ModalBody>Voulez-vous confirmer la suppression de l'utilisateur <Badge style={{ backgroundColor: user.color }}>#{user.username}</Badge> <span style={{ fontWeight: "bold" }}>{user.firstname + " " + user.lastname}</span> ?</ModalBody>
                <ModalFooter class={style.comment}>
                    <Button onClick={() => setOpen(!open)}>Annuler</Button>
                    <Button onClick={(e) => handleRemove(e)} theme={"danger"}>Confirmer</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}