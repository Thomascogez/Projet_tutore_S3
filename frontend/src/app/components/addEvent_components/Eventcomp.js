/**
 * Ajout
 * Component by the route /ajout and contain all the functionnality to add a new Course / event
 */

import React, { useState } from 'react';
import { Button, ButtonGroup, Container, Form, FormGroup, FormInput, FormTextarea } from 'shards-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import style from './addEventcomp.module.css';

export default function Eventcomp() {

    const [statu, setStatue] = useState(false);
    const [click, setClick]  = useState(false);
    const [add, setAdd]      = useState(true);

    toast.configure()

    const notifyA = () => toast('Évenement ajouter à votre scéance', {containerId: 'A'});



    const handleCLickAfaire = () => {
        setStatue(true);
        setClick(true);
    }
    const handleCLickFait=() => {
        setStatue(false);
        setClick(true);
    }
    const handleClickAdd=() => {
        setAdd(!add)
    }

    return (
    <Container fluid >

        <div className={ style.page }> 
            { add ? 
                <React.Fragment>
                    <div className={style.Content}> 
                        <ButtonGroup className={style.Button}>
                            <Button theme="success" onClick={() => handleCLickAfaire()}>A FAIRE</Button>
                            <Button theme="success" onClick={() => handleCLickFait()}>FAIT</Button>
                        </ButtonGroup>
                        {click ?
                            <div>
                                { statu ?
                                    <Form>
                                        <FormGroup className={style.info}>
                                            <label className={style.txt}>A faire pour le </label>
                                            <FormInput className={style.date} placeholder=". . / . . / . . . ." />
                                            <label className={style.txt}>Durée</label>
                                            <FormInput className={style.duree} placeholder=". . : . ." />
                                        </FormGroup>
                                    </Form>
                                :
                                    <Form>
                                        <FormGroup className={style.info}>
                                            <label className={style.txt}>Durée</label>
                                            <FormInput className={style.duree} placeholder=". . : . ." />
                                        </FormGroup>
                                    </Form>
                                }
                                <FormGroup className={style.note}>
                                    <label className={style.txt}> Note </label>
                                    <FormTextarea maxLength="90" placeholder="90 caractère max"/>
                                    <input className={style.fileSelect} type="file"></input>
                                </FormGroup>
                                
                                <Button className={style.button} onClick={() =>{ notifyA(); handleClickAdd() }} theme="success"> Ajouter</Button>
                                </div>
                        :
                            <div></div>
                        }
                    </div>
                    <span className={style.bas}></span>
                </React.Fragment>:
                <div className={style.fermer}> Evenement ajouter à la scéances </div>
            }
        </div>
    </Container>
    )
}