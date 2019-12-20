import React, {useState} from 'react'
import { Container,Button,Fade, FormSelect, Collapse } from 'shards-react'

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

    const [state, setState] = useState(false);

    function ChangeModule(e)
    {
        setState(!state);
        setModule(e.target.value);        
    }

    function ChangeType(e)
    {
        setType(e.target.value);
    }

    return (
        <Container fluid>
            <h1 className={style.title}>Ajout séance</h1>
            <div className={style.Border}>                
                <form> 
                    <FormSelect onChange={(e) => ChangeModule(e)} className= {style.AddSubject}>
                        <option value="module">Module</option>
                        <ListeComponent lst={lstModule} />
                    </FormSelect>
                    
                    { (module != "module") ?
                        <Collapse open={state}>
                            <Fade in={state}>
                                <FormSelect  onChange={(e) => setType(e.target.value)} className= {style.AddSubject}>
                                    <option value="type">Type</option>
                                    <ListeComponent lst={lstType} />
                                </FormSelect>
                             </Fade>
                        </Collapse>
                        : <React.Fragment/>
                    }
                    

                    { (type != "type" && module != "module") ?
                       
                        <FormSelect  onChange={(e) => setGroup(e.target.value)} className= {style.AddSubject}>
                            <option value="groupe" >Groupe</option>
                            <ListeComponent lst={lstGroupe} />
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