import React from 'react'
import { Container, Row, Col } from 'shards-react'
import style from './seances.module.css'

//seances components
import WeekContainer from '../../components/seances_components/WeekContainer'
import WorkContainer from '../../components/seances_components/WorkContainers'
import MounthSelector from '../../components/seances_components/MounthSelector'
import Work from '../../components/seances_components/Work'

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
                        <Work color="red" name="math" finished={true} />
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
