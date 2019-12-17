import React from "react";
import ReactDOM from "react-dom";
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
        <Modal size="lg" open={open} toggle={setOpen(!open)}>
            <ModalHeader>{props.name}</ModalHeader>
            <ModalBody>{props.cours}</ModalBody>
            <ModalFooter>{props.fichier}</ModalFooter>
        </Modal>
      </div>
    )
  }