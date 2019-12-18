import React from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "shards-react";

import style from '../../pages/seances/seances.module.css';

export default function CoursModal({name, color, open,setOpen, cours, fichier, children, typeCours }) {
    return (
      <div>
        <Modal size="lg" open={open} toggle={setOpen}>
            <ModalHeader>{name} <div style={{display:'inline-block',backgroundColor:color, borderColor : color, borderRadius: '5px'}}>{typeCours}</div></ModalHeader>
            <ModalBody>{cours}</ModalBody>
            <ModalBody class={style.fichierModal}>{fichier}</ModalBody>
            <ModalFooter class={style.comment}>{children}</ModalFooter>
        </Modal>
      </div>
    )
  }