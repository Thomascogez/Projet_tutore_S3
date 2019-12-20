/**
 * Ajout
 * Component by the route /ajout and contain all the functionnality to add a new Course / event
 */

import React, { useState } from 'react';
import { Container } from 'shards-react';
import style from './addEvent.module.css';
import Eventcomp from '../../../components/addEvent_components/Eventcomp'

import { ToastContainer, toast } from 'react-toastify';
import { IoMdAddCircleOutline,IoMdRemoveCircleOutline } from "react-icons/io";

export default function Ajout() {


    const [add, setAdd] = useState(false);
    const [nbEvent, setNbEvent] = useState([])

    const handleClickAdd=() =>{
        setNbEvent([...nbEvent, 0 ])
    }
    const handleClickRemove=() =>{
        setNbEvent([ nbEvent.pop(0) ])
    }

    toast.configure()

    const notifyA = () => toast('Bah GG tu as tout supprimer', {containerId: 'A'});


    return (
    <Container fluid >
        <h1 className={style.title}>AJOUTER UN EVENEMENT</h1>

        <IoMdAddCircleOutline  onClick={() => handleClickAdd() } className={style.add}/>
        <IoMdRemoveCircleOutline onClick={() =>{ notifyA(); handleClickRemove()}} className={style.remove}/>

        {nbEvent.map(() => <Eventcomp/>)}

    </Container>
    )
}