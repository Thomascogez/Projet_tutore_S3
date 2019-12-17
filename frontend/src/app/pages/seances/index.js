import React from 'react'
import { Container, Row, Col } from 'shards-react'
import style from './seances.module.css'

//seances components
import WeekContainer from '../../components/seances_components/WeekContainer'
import WorkContainer from '../../components/seances_components/WorkContainers'
import MounthSelector from '../../components/seances_components/MounthSelector'
import Matiere from '../../components/seances_components/Matiere'

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
                        <Matiere color="red" name="math" />
                        <Matiere color="green" name="algo" />
                        <Matiere color="blue" name="cpoa" />
                        <Matiere color="aqua" name="bado" />
                        <Matiere color="tomato" name="salut" />
                        <Matiere color="red" name="math" />
                        <Matiere color="green" name="algo" />
                        <Matiere color="blue" name="cpoa" />
                        <Matiere color="aqua" name="bado" />
                        <Matiere color="tomato" name="salut" />
                    </WorkContainer>

                </Col>
            </Row>
            <Row>
                <Col lg="1" sm="12">
                    <WeekContainer week="25" />
                </Col>
                <Col lg="11" sm="12">
                    <WorkContainer>
                        <Matiere color="red" name="math" />
                        <Matiere color="green" name="algo" />
                        <Matiere color="blue" name="cpoa" />
                        <Matiere color="aqua" name="bado" />
                        <Matiere color="tomato" name="salut" />
                        <Matiere color="red" name="math" />
                        <Matiere color="green" name="algo" />
                        <Matiere color="blue" name="cpoa" />
                        <Matiere color="aqua" name="bado" />
                        <Matiere color="tomato" name="salut" />
                    </WorkContainer>

                </Col>
            </Row>
        </Container>
    )
}
