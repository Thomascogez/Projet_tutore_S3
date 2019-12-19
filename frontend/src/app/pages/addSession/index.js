import React, {useState} from 'react'
import { Container, Row, Col, FormSelect } from 'shards-react'

import { Button,ButtonGroup,} from "shards-react";
import { Form, FormInput, FormGroup } from "shards-react";
import { FormTextarea } from "shards-react";
import { IoMdAddCircleOutline } from "react-icons/io";
import style from './addSession.module.css'

export default function AjoutSeance()
{
    const [status, setStatus] = useState( false );

    return (
        <Container fluid>
            <div>
                <h1 className={style.Titre}>Ajout séance</h1>
                <form> 
                            <FormSelect onChange={() => setStatus(!status)} className= {style.AddSubject}>
                                <option value="first"> Module </option>
                                <option value="second">Systeme</option>
                            </FormSelect> 

                            <FormSelect  onChange={() => setStatus(!status)} className= {style.AddClassType}>
                                <option value="first">Type</option>
                                <option value="second">TD</option>
                            </FormSelect> 
                        </form>

            </div>
        </Container>
    )
}