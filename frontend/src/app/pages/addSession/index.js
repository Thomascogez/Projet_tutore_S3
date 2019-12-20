import React, {useState} from 'react'
import { Container, Row, Col, FormSelect } from 'shards-react'

import { Button,ButtonGroup,} from "shards-react";
import { Form, FormInput, FormGroup } from "shards-react";
import { FormTextarea } from "shards-react";
import { IoMdAddCircleOutline } from "react-icons/io";
import style from './addSession.module.css'

export default function AjoutSeance()
{
    const [module, setModule] = useState("module");
    const [type, setType]     = useState("type");
    const [group, setGroup]   = useState("groupe");
    const tab = [];

    function aaa(e) {
        setGroup(e)
        tab.push(e)
    }

    return (
        <Container fluid>
            <h1 className={style.title}>Ajout séance</h1>
            <div className={style.Border}>                
                <form> 
                    { (module == "module") ?
                            <FormSelect onChange={(e) => setModule(e.target.value)} className= {style.AddSubject}>
                                <option value="module">Module</option>
                                <option value="systeme">Systeme</option>
                                <option value="algo">Algo</option>
                                <option value="bado">BADO</option>
                                <option value="cpoa">CPOA</option>
                            </FormSelect>
                    : <div></div>
                    }
                    
                    { (module != "module" && type == "type") ?
                        <div>
                            <FormSelect  onChange={(e) => setType(e.target.value)} className= {style.AddSubject}>
                                <option value="type">Type</option>
                                <option value="td">TD</option>
                                <option value="tp">TP</option>
                                <option value="amphi">Amphi</option>
                            </FormSelect>
                            <Button className={style.AddSubject} onClick={() => setType("type", setModule("module"))}>Retour</Button>
                        </div> : <div></div>
                    }
                    
                    { (type != "type") ?
                        <div>
                            <FormSelect  onChange={(e) => aaa(e.target.value)} className= {style.AddSubject}>
                            <option value="groupe" >Groupe</option>
                            <option value="a1" >A1</option>
                            <option value="a2" >A2</option>
                            <option value="b1" >B1</option>
                            <option value="b2" >B2</option>
                            <option value="c2" >C2</option>
                            </FormSelect>
                            <Button className={style.AddSubject} onClick={() => setGroup("groupe", setType("type"))}>Retour</Button>
                        </div> : <div></div>
                    }

                    { (group != "groupe") ?
                    <Button className={style.AddSubject}>Valider</Button>
                    : <div></div>
                    }

                    <span className= {style.AddSubject}>Module : {module} Type : {type} Groupe : {group}</span>
                </form>
            </div>
        </Container>
    )
}