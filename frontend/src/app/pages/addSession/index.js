import React, {useState} from 'react'
import { Container,Button,Fade, FormSelect, Row, Col } from 'shards-react'
import {navigate} from 'hookrouter'

import style from './addSession.module.css'

import ListeComponent from '../../components/addSession_components/listeComponent'

export default function AjoutSeance()
{
    const lstModule = ["Math", "Algo", "Bado", "MPA"];
    const lstType   = ["TP", "TD", "Amphi"];
    const lstGroupe = ["J1", "C2", "B1"];

    const [module, setModule] = useState("module");
    const [type, setType]     = useState("type");
    const [group, setGroup]   = useState("groupe");

    const [state, setState]   = useState(false);
    const [state2, setState2] = useState(false);
    const [state3, setState3] = useState(false);

    function ChangeModule(e)
    {
        setState(true);
        setModule(e.target.value);        
    }

    function ChangeType(e)
    {
        setType(e.target.value);
        setState2(true)
    }
    function ChangeButtonValid(e)
    {
        setGroup(e.target.value);
        setState3(true)
    }

    return ( 
        <Container fluid>
            <Button onClick={() => navigate("/seances")} style={{marginTop:"25px", marginLeft:"20px"}}>Retour </Button>
            <h1 className={style.title}>Ajout séance</h1>
            <div className={style.Border}>                
                <form> 
                    <Container>
                        <Row className={style.Ligne}>
                            <Col lg="12" sm="12">
                                <FormSelect onChange={(e) => ChangeModule(e)} className= {style.AddSubject}>
                                    <option value="module">Module</option>
                                    <ListeComponent lst={lstModule} />
                                </FormSelect>
                            </Col>
                        </Row>

                        <Row className={style.Ligne}>     
                            <Col  lg="12" sm="12">                   
                                { (module != "module") ?
                                        <Fade in={state}>
                                            <FormSelect  onChange={(e) => ChangeType(e)} className= {style.AddSubject}>
                                                <option value="type">Type</option>
                                                <ListeComponent lst={lstType} />
                                            </FormSelect>
                                        </Fade>
                                    : <React.Fragment/>
                                } 
                            </Col>
                        </Row>
                        
                        <Row className={style.Ligne}>
                            <Col  lg="12" sm="12">
                                { (type != "type" && module != "module") ?
                                        <Fade in={state2}>                      
                                            <FormSelect  onChange={(e) =>ChangeButtonValid(e)} className= {style.AddSubject}>
                                                <option value="groupe" >Groupe</option>
                                                <ListeComponent lst={lstGroupe} />
                                            </FormSelect>
                                        </Fade>
                                : <React.Fragment/>
                                }
                            </Col>
                        </Row>
                        <Row className={style.Ligne}>
                            <Col  lg="12" sm="12">
                                { (group != "groupe" && module!="module" && type!="type") ?
                                        <Fade in={state3}>
                                            <Button className={style.AddSubject}>Valider</Button>
                                        </Fade>
                                : <React.Fragment/>
                                }
                            </Col>
                        </Row>
                    </Container>
                </form>
            </div>
        </Container>
    )
}