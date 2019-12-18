import React from 'react'
import { Container, Row, Col } from 'shards-react'
import style from './seances.module.css'

//seances components
import WeekContainer from '../../components/seances_components/WeekContainer'
import WorkContainer from '../../components/seances_components/WorkContainers'
import MounthSelector from '../../components/seances_components/MounthSelector'
import Work from '../../components/seances_components/Work'
import Comment from '../../components/seances_components/Comment'


export default function Seances() {
    return (
        <Container fluid className={style.SeancesContainer}>
            <MounthSelector mounth="Décembre" />
            <Row>
                <Col lg="1" sm="12">
                    <WeekContainer week="24" />
                </Col>
                <Col lg="11" sm="12">
                    <WorkContainer>
                        <Work color="red" 
                            name="Math" 
                            finished={true} 
                            cours="Voici un formulaire à completer et à me renvoyer !" 
                            typeCours="TP" 
                            fichier="Formulaire.odf">
                        <div>
                            <Comment
                                name="Lepivert"
                                date="07/10/19"
                                hour="10:04"
                                comment="Doit-on le rendre sur Eureka ou par mail ?"
                            />
                            <Comment
                                name="Charier"
                                date="08/10/19"
                                hour="07:56"
                                comment="Doit-on vous l'envoyer au format actuel ou pdf?"
                            />
                        </div>
                        </Work>
                        <Work color="green" name="algo" finished={false} />
                        <Work color="blue" name="cpoa" finished={true} />
                        <Work color="aqua" name="bado" finished={true} />
                        <Work color="tomato" name="salut" finished={false} />
                        <Work color="red" name="math" finished={false} />
                        <Work color="green" name="algo" finished={false} />
                        <Work color="blue" name="cpoa" finished={false} />
                        <Work color="aqua" name="bado" finished={true} />
                        <Work color="tomato" name="salut" finished={false} />
                    </WorkContainer>

                </Col>
            </Row>
            <Row>
                <Col lg="1" sm="12">
                    <WeekContainer week="25" />
                </Col>
                <Col lg="11" sm="12">
                    <WorkContainer>

                        <Work color="green" name="algo" finished={false} />
                        <Work color="blue" name="cpoa" finished={false} />
                        <Work color="aqua" name="bado" finished={false} />
                        <Work color="tomato" name="salut" finished={false} />
                        <Work color="red" name="math" finished={false} />
                        <Work color="green" name="algo" finished={false} />
                        <Work color="blue" name="cpoa" finished={false} />
                        <Work color="aqua" name="bado" finished={false} />
                        <Work color="tomato" name="salut" finished={false} />
                    </WorkContainer>

                </Col>
            </Row>
        </Container>
    )
}
