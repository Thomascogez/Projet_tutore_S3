import React, {useState} from 'react'
import { Container, Row, Col, FormSelect } from 'shards-react'

import { Button,ButtonGroup,} from "shards-react";
import { Form, FormInput, FormGroup } from "shards-react";
import { FormTextarea } from "shards-react";
import { IoMdAddCircleOutline } from "react-icons/io";
import style from './addSession.module.css'

import ListeModule from '../../components/addSession_components/listeModule'
import ListeType from '../../components/addSession_components/listeType'
import ListeGroupe from '../../components/addSession_components/listeGroupe'

export default function AjoutSeance()
{
    const lstModule = ["Math", "Algo", "Bado", "MPA"];
    const lstType   = ["TP", "TD", "Amphi"];
    const lstGroupe = ["J1", "C2", "B1"];

    const [module, setModule] = useState("module");
    const [type, setType]     = useState("type");
    const [group, setGroup]   = useState("groupe");

    return (
        <Container fluid>
            <h1 className={style.title}>Ajout séance</h1>
            <div className={style.Border}>                
                <form> 
                    <FormSelect onChange={(e) => setModule(e.target.value)} className= {style.AddSubject}>
                        <option value="module">Module</option>
                        <ListeModule lstModule={lstModule} />
                    </FormSelect>
                    
                    { (module != "module") ?
                        <FormSelect  onChange={(e) => setType(e.target.value)} className= {style.AddSubject}>
                            <option value="type">Type</option>
                            <ListeType lstType={lstType} />
                        </FormSelect>
                        : <React.Fragment/>
                    }
                    
                    { (type != "type" && module != "module") ?
                       
                        <FormSelect  onChange={(e) => setGroup(e.target.value)} className= {style.AddSubject}>
                            <option value="groupe" >Groupe</option>
                            <ListeGroupe lstGroupe={lstGroupe} />
                        </FormSelect>
                    : <React.Fragment/>
                    }

                    { (group != "groupe" && module!="module" && type!="type") ?
                        <Button className={style.AddSubject}>Valider</Button>
                    : <React.Fragment/>
                    }
                </form>
            </div>
        </Container>
    )
}