/**
 * Ajout
 * 
 * Component by the route /ajout and contain all the functionnality to add a new Course / event
 */

import React from 'react'
import { useState } from 'react';
import { Container, Row, Col, FormSelect } from 'shards-react'

import { Button,ButtonGroup,} from "shards-react";
import { Form, FormInput, FormGroup } from "shards-react";
import { FormTextarea } from "shards-react";
import { IoMdAddCircleOutline } from "react-icons/io";

import style from './addSession.module.css'

export default function Ajout() {

    const [statu, setStatue]   = useState( false );
    const [click, setClick]    = useState(false);

    
    const [add, setAdd]    = useState(false);

    const handleCLickAfaire = () => {
        setStatue(true);
        setClick(true);
    }
    const handleCLickFait=() => {
        setStatue(false);
        setClick(true);
    }

    const handleClickAdd=() => {
        setAdd(true)
    }

    return (
    <Container fluid >
        <h1 className={style.title}>Ajouter une Séance</h1>
        
        <div className={ style.page }> 
        <IoMdAddCircleOutline onClick={() => handleClickAdd()} className={style.add}/>

        <Row>
            <Col sm="12" lg="12">
                <form> 
                    <FormSelect className= {style.AddSubject}>
                        <option value="first"> Matière </option>
                        <option value="Systeme">Systeme</option>
                        <option value="third">E.C</option>
                        <option value="fourth">Bado</option>
                        <option value="fifth">CDIN</option>
                        <option value="second">Systeme</option>
                        <option value="third">E.C</option>
                        <option value="fourth">Bado</option>
                        <option value="fifth">CDIN</option>
                    </FormSelect> 

                    <FormSelect className= {style.AddClassType}>
                        <option value="first">Type</option>
                        <option value="second">TD</option>
                        <option value="third">Amphi</option>
                        <option value="fourth">TP</option>
                    </FormSelect> 
                </form>
            </Col>
        </Row>

        <div className={style.Content}> 
            <ButtonGroup className={style.Button} >
                <Button theme="success" onClick={() => handleCLickAfaire()}>A FAIRE</Button>
                <Button theme="success" onClick={() => handleCLickFait()}>FAIT</Button>
            </ButtonGroup>
            {click ? 
                <div>
                     { statu ? <Form>
                                <FormGroup className={style.info}>
                                    <label className={style.txt}>A faire pour le </label>
                                    <FormInput className={style.date} placeholder=". . / . . / . . . ." />
                                    
                                </FormGroup>

                                <FormGroup className={style.note}>
                                    <label className={style.txt}> Note </label>
                                    <FormTextarea maxlength="90" placeholder="90 caractère max"   />
                                    
                                    <input className={style.fileSelect} type="file"></input>
                                </FormGroup>
                                <Button className={style.button} theme="success">Ajouter</Button>
                             </Form>
                    :
                        <Form>
                            <FormGroup className={style.info}>
                                <label className={style.txt}>Durée</label>
                                <FormInput className={style.duree} placeholder=". . : . ." />
                            </FormGroup>

                            <FormGroup className={style.note}>
                                <label className={style.txt}> Note </label>
                                <FormTextarea maxlength="90" placeholder="90 caractère max"/>
                                <input  className={style.fileSelect} type="file"></input>
                            </FormGroup>
                            <Button className={style.button} theme="success">Ajouter</Button>
                        </Form>
            }
                </div>
                :
                <div></div>
            }

        </div>
            <span className={style.bas} >  </span>
        </div>
        </Container>
)}
