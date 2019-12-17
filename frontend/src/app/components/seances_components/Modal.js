import React,{ useState } from "react";
import ReactDOM from "react-dom";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "shards-react";
import Matiere from './Matiere'

import style from '../../pages/seances/seances.module.css';


export default function CoursModal(props) {
    const [open, setOpen] = useState(false);
    return (
      <div>
        <Button onClick={() => setOpen(!open)}>{props.name}</Button>
        <Modal size="lg" open={open} toggle={() =>setOpen(!open)}>
            <ModalHeader>{props.name}</ModalHeader>
            <ModalBody>{props.cours}</ModalBody>
            <ModalFooter>{props.fichier}</ModalFooter>
        </Modal>
      </div>
    )
  }