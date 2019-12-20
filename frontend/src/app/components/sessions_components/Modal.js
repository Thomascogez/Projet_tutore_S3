import React, {useState} from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Badge, Button } from "shards-react";


import style from "../../pages/event/sessions.module.css";
import {FaAngleDown, FaAngleRight} from 'react-icons/fa'
export default function CoursModal({
  name,
  color,
  open,
  cours,
  fichier,
  children,
  typeCours
}) {
  const [collapsedEvent, setCollapsedEvent] = useState(true);
  return (
    <Modal size="lg" open={open} >
      <ModalHeader>
        <div onClick = {() => setCollapsedEvent(!collapsedEvent)} style={{textTransform:"uppercase"}}>{name}<Badge style={{marginLeft:"3px",color:"#fff", display:"inline"}} theme="success">{typeCours}</Badge></div>
      </ModalHeader>
      <ModalBody>
        <div className={style.SessionEventCollapse}>
         {collapsedEvent ? <FaAngleDown/> : <FaAngleRight /> } Voir les Evénements du cours
        </div>
      </ModalBody>
      <ModalFooter ><Button theme="warning">Fermer</Button></ModalFooter>
    </Modal>
  );
}
