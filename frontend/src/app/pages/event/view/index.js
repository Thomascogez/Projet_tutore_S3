import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Badge,
  CardHeader,
  Collapse
} from "shards-react";
import { FaAngleRight, FaAngleDown } from "react-icons/fa";
import ProfileRound from "../../../components/profileRound_component/ProfileRound";
import style from "./sessionview.module.css";
export default function ViewsEvent() {
  const [eventCollapse, setEventCollapse] = useState(false);
  const [commentCollapse, setCommentCollapse] = useState(false);
  return (
    <Container fluid className={style.SessionViewContainer}>
      <Row>
        <Col lg="3" sm="12">
          <Card className={style.CreatorCard}>
            <CardHeader style={{ marginBottom: "10px" }}>
              Créateur de la séance
            </CardHeader>
            <ProfileRound
              className={style.UserProfileLetter}
              bgcolor="red"
              letter="t"
              fcolor="#fff"
            />
            <CardBody>
              <CardTitle>John Doe</CardTitle>
              <Badge theme="light">
                <a href="mailto:dj157896@univ-lehavre.fr">
                  dj157896@univ-lehavre.fr
                </a>
              </Badge>
            </CardBody>
          </Card>
        </Col>

        <Col lg="9" sm="12">
          <Card>
            <CardHeader style={{ marginBottom: "10px" }}>
              Informations de la séances
            </CardHeader>
            <CardBody>
              <div
                onClick={() => setEventCollapse(!eventCollapse)}
                className={style.ViewCollapse}
              >
                {eventCollapse ? <FaAngleDown /> : <FaAngleRight />}Voir Les
                événements de la séances
              </div>
              <Collapse open={eventCollapse}>
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Professeur</th>
                      <th >Description</th>
                      <th >Durée</th>
                      <th >Echéance</th>
                      <th >Piéces jointes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">Hadoum boukachour</th>
                      <td>Requêtes 1 a 7</td>
                      <td>00h30</td>
                      <td>a faire</td>
                      <td><a href="#">Voir les piéces jointes</a></td>
                    </tr>
                  </tbody>
                </table>
              </Collapse>
              <div
                onClick={() => setCommentCollapse(!commentCollapse)}
                className={style.ViewCollapse}
              >
                {commentCollapse ? <FaAngleDown /> : <FaAngleRight />}Voir /
                Ajouter un commentaire
              </div>
              <Collapse open={commentCollapse}>
                  
              </Collapse>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
