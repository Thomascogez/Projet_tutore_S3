import React,{ useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "shards-react";

import style from '../../pages/seances/seances.module.css';


export default function CoursModal(props) {
    const [open, setOpen] = useState(false);
    return (
      <div>
        <Button pill style={{backgroundColor:props.color, borderColor:props.color}} onClick={() => setOpen(!open)}>{props.name}</Button>
        <Modal size="lg" open={open} toggle={() =>setOpen(!open)}>
            <ModalHeader>{props.name} <div style={{display:'inline-block',backgroundColor:props.color, borderColor : props.color, borderRadius: '5px'}}>{props.typeCours}</div></ModalHeader>
            <ModalBody>{props.cours}</ModalBody>
            <ModalBody class={style.fichierModal}>{props.fichier}</ModalBody>
            <ModalFooter class={style.comment}>{props.children}</ModalFooter>
        </Modal>
      </div>
    )
  }