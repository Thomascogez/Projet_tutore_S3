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
  Collapse,
  FormTextarea,
  Button
} from "shards-react";
import { FaAngleRight, FaAngleDown, FaFileAlt } from "react-icons/fa";
import ProfileRound from "../../../components/profileRound_component/ProfileRound";
import style from "./eventview.module.css";
export default function ViewsEvent() {
  const [eventCollapse, setEventCollapse] = useState(true);
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
              size = "Big"
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
              <h1>Base de donnée <Badge theme="success">TP</Badge></h1>
              <div
                onClick={() => setEventCollapse(!eventCollapse)}
                className={style.ViewCollapse}
              >
                {eventCollapse ? <FaAngleDown /> : <FaAngleRight />}Voir Les
                événements de la séances
              </div>
              <Collapse open={eventCollapse}>
                <table className={`table-responsive table table-striped ${style.EventTable}`}>
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
                      <td><a href="#">Voir plus de détails</a> </td>
                      <td>00h30</td>
                      <td><Badge theme="info">Fait</Badge></td>
                      <td style={{ textAlign: "center" }}><FaFileAlt color="gray" /></td>
                    </tr>
                    <tr>
                      <th scope="row">Hadoum boukachour</th>
                      <td><a href="#">Voir plus de détails</a> </td>
                      <td>00h30</td>
                      <td><Badge theme="warning">a faire</Badge></td>
                      <td style={{ textAlign: "center" }}><FaFileAlt color="green" /></td>
                    </tr>
                    <tr>
                      <th scope="row">Hadoum boukachour</th>
                      <td><a href="#">Voir plus de détails</a> </td>
                      <td>00h30</td>
                      <td><Badge theme="warning">a faire</Badge></td>
                      <td style={{ textAlign: "center" }}><FaFileAlt color="green" /></td>
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

                {/* FETCH ALL COMMENT HERE */}
                <table class="table table-responsive">
                  <thead>
                    <tr>
                      <th scope="col"></th>
                      <th scope="col"></th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row"> <ProfileRound size="Small"  letter="t" bgcolor="blue" fcolor="#fff" /></th>
                      <td>Mauris id dignissim turpis. Donec ornare lacus pulvinar aliquet vestibulum. Pellentesque tempor ornare lacus, aliquet sodales tellus. Nullam porttitor ligula sed sem laoreet, nec luctus turpis sollicitudin. Nullam vulputate, ante sit amet ullamcorper vehicula, risus est molestie eros, eget iaculis tortor ipsum volutpat tellus</td>
                      <td>Le 23/09/19</td>
                    </tr>
                    <tr>
                      <th scope="row"> <ProfileRound size="Small"  letter="t" bgcolor="blue" fcolor="#fff" /></th>
                      <td>Mauris id dignissim turpis. Donec ornare lacus pulvinar aliquet vestibulum. Pellentesque tempor ornare lacus, aliquet sodales tellus. Nullam porttitor ligula sed sem laoreet, nec luctus turpis sollicitudin. Nullam vulputate, ante sit amet ullamcorper vehicula, risus est molestie eros, eget iaculis tortor ipsum volutpat tellus</td>
                      <td>Le 23/09/19</td>
                    </tr>
                    <tr>
                      <th scope="row"> <ProfileRound size="Small"  letter="t" bgcolor="blue" fcolor="#fff" /></th>
                      <td>Mauris id dignissim turpis. Donec ornare lacus pulvinar aliquet vestibulum. Pellentesque tempor ornare lacus, aliquet sodales tellus. Nullam porttitor ligula sed sem laoreet, nec luctus turpis sollicitudin. Nullam vulputate, ante sit amet ullamcorper vehicula, risus est molestie eros, eget iaculis tortor ipsum volutpat tellus</td>
                      <td>Le 23/09/19</td>
                    </tr>
                  </tbody>
                </table>
                <div className={style.AddComment}>
                  <h5>Ajouter un nouveau commentaire</h5>
                  <ProfileRound size="Small" letter="t" bgcolor="blue" fcolor="#fff" />
                  <FormTextarea placeholder="Votre commentaire ... (120 charactères max.)" maxLength="120" />
                  <Button style={{ marginLeft: "10px", }}>Ajouter</Button>
                </div>



              </Collapse>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
