import React, { useState } from "react";
import {Badge, Button, Modal, ModalBody, ModalFooter, ModalHeader} from "shards-react";
import moment from "moment";
import {navigate} from 'hookrouter';
import DeleteModal from "../session/DeleteModal";
import style from "./deleteModal.module.css";
import Event from "../../view_event_components/Event";

export default function Session(props) {

    const [deleting,  setDeleting] = useState(false);
    const [modalEvent, setModalEvent] = useState(false);

    const reload = props.setReload;
    props = props.session;

    return (
        <tr>
            <td>{moment(props.createdAt).format("DD-MM-YYYY")}</td>
            <td>{props.user.firstname + " " + props.user.lastname}</td>
            <td>{props.module.name}</td>
            <td>
                {props.groups.map(m => <Badge style={{backgroundColor: m.color, marginRight: "10px"}}>{m.name}</Badge>)}
            </td>
            <td><Badge theme="success">{props.type}</Badge></td>
            <td><a href="#" onClick={e => {e.preventDefault(); setModalEvent(true)}}>Voir les évènements</a></td>
            <td>
                <Button onClick={() => navigate(`/seances/modifier/${props.id}`)}>Edition</Button>
                <Button onClick={() => setDeleting(!deleting)} theme="danger">Supprimer</Button>
            </td>
            <DeleteModal open={deleting} setOpen={setDeleting} id={props.id} reload={reload}/>


            <Modal size="lg" open={modalEvent} toggle={setModalEvent}>
                <ModalHeader className={style.header}>Les évènements</ModalHeader>
                <ModalBody>
                    <div className="table-responsive">
                        <table className={`table  ${style.EventTable}`}>
                            <thead>
                            <tr>
                                <th>Type</th>
                                <th scope="col">Professeur</th>
                                <th>Description</th>
                                <th>Durée</th>
                                <th>Echéance</th>
                                <th>Pièces jointes</th>
                                <th></th>

                            </tr>
                            </thead>
                            <tbody>
                            {
                                props.events.length > 0 &&
                                props.events.map(event => (
                                    <Event key={event.id} data={event} editable={true}  />
                                    )
                                )
                            }
                            </tbody>
                        </table>
                    </div>
                </ModalBody>
                <ModalFooter>
                </ModalFooter>
            </Modal>
        </tr>
    );
}
