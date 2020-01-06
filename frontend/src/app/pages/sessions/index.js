import React from "react";
import { Container, Row, Col, Button, Card, CardHeader } from "shards-react";
import style from "./sessions.module.css";
import { navigate } from "hookrouter";
import { FaBookOpen } from "react-icons/fa";


//seances components
import WeekContainer from "../../components/sessions_components/WeekContainer";
import WorkContainer from "../../components/sessions_components/WorkContainers";
import DayContainer from "../../components/sessions_components/DayContainer";
import MounthSelector from "../../components/sessions_components/MounthSelector";
import Work from "../../components/sessions_components/Work";

export default function Seances() {
  return (
    <Container fluid className={style.SeancesContainer}>
      <Button onClick={() => navigate("/seances/ajoutSeance")}><FaBookOpen style={{ marginRight: "15px" }} /> Ajouter séance</Button>
      <MounthSelector mounth="Décembre" />
      <Row className={style.WorkRow}>
        <Card>
        <CardHeader>Semaine n°24</CardHeader>
        <Col lg="12" sm="12">
          <Row className={style.DailyWorkRow}>
            <Col lg="1" sm="1">
              <DayContainer day="Lundi" />
            </Col>
            <Col lg="11" sm="11" >
              <WorkContainer>
                <Work color="green" name="algo" finished={false} typeCours="TP" />
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
            <Col lg="1" sm="1">
              <DayContainer day="mardi" />
            </Col>
            <Col lg="11" sm="11">
                <WorkContainer>
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
        </Col>
        </Card>
      </Row>
      <Row className={style.WorkRow}>
        <Col lg="1" sm="12">
          <WeekContainer week="25" />
        </Col>
        <Col lg="11" sm="12">
          <Row className={style.DailyWorkRow}>
            <Col lg="1" sm="1">
              <DayContainer day="jeudi" />
            </Col>
            <Col lg="11" sm="11">
              <WorkContainer>
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
            <Col lg="1" sm="1">
              <DayContainer day="Vendredi" />
            </Col>

            <Col lg="11" sm="11">
              <WorkContainer>
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
        </Col>
      </Row>

    </Container>
  );
}
