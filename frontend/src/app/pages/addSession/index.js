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

    const [module, setModule] = useState(true);
    const [type, setType]     = useState( false);
    const [group, setGroup]   = useState(false);
    const [button, setButton] = useState(false);

    function handleChangeModule(){
        setStatus(!status);
        setModule(!module);
        setType(!type);
    }
    function handleChangeType(){
        setStatus(!status);
        setType(!type);
        setGroup(!group);
    }

    return (
        <Container fluid>
            <h1 className={style.title}>Ajout séance</h1>
            <div className={style.Border}>                
                <form> 
                            {module ? <FormSelect onChange={() => handleChangeModule()} className= {style.AddSubject}>
                                <option value="first"> Module </option>
                                <option value="systeme">Systeme</option>
                                <option value="algo">Algo</option>
                                <option value="bado">BADO</option>
                                <option value="cpoa">CPOA</option>
                            </FormSelect> : <div></div>}
                            
                            {type ?  <div><FormSelect  onChange={() => handleChangeType()} className= {style.AddSubject}>
                                <option value="first">Type</option>
                                <option value="td">TD</option>
                                <option value="tp">TP</option>
                                <option value="amphi">Amphi</option>
                            </FormSelect> <Button className={style.AddSubject} onClick={() => handleChangeModule()}>Retour</Button> </div>: <div> </div>}
                            
                            {group ? <div><FormSelect  onChange={() => setButton(true)} className= {style.AddSubject}>
                                <option value="first" >Groupe</option>
                                <option value="a1" >A1</option>
                                <option value="a2" >A2</option>
                                <option value="b1" >B1</option>
                                <option value="b2" >B2</option>
                                <option value="c2" >C2</option>
                            </FormSelect> <Button className={style.AddSubject} onClick={() =>handleChangeType()}>Retour</Button> </div> : <div></div>}

                            { button ? <Button className={style.AddSubject}>Valider</Button> : <div></div>}
                        </form>
                    </div>
        </Container>
    )
}