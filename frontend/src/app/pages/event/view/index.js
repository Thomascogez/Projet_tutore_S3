import React, { useState, useEffect } from "react";
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

import moment from 'moment';

import { FaAngleRight, FaAngleDown, FaFileAlt } from "react-icons/fa";
import ProfileRound from "../../../components/profileRound_component/ProfileRound";
import style from "./eventview.module.css";
import { APIgetSession } from "../../../api/sessionFetch";
import ModalViewDetail from '../../../components/view_event_components/ModalViewDetails'
import ModalViewFiles from '../../../components/view_event_components/ModalViewsFiles'



//loader 

import ProfileLoader from '../../../components/loader/ProfileLoader'
import TextLoader from '../../../components/loader/TextLoader'
import TableLoader from '../../../components/loader/TableLoader'
import TitleLoader from '../../../components/loader/TitleLoader'

/**
 * ViewsEvent
 *
 * Component the display all the information of a seance
 */
export default function ViewsEvent() {
  const [info, setInfo] = useState({}); //hook that hold data about the loaded course

  useEffect(() => {
    //fetch the api to get information about the session
    APIgetSession(118)
      .then(data => {
        console.log(data.data);
        setInfo(data.data);
      })
      .catch(err => console.log(err));
  }, []);

  //hooks for collapse view
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
            <>{info.user ? <ProfileRound size="Big" bgcolor={"red"} letter={info.user.firstname.charAt(0) } fcolor="#fff" /> : <ProfileLoader /> }</>
            <CardBody>
            <CardTitle>{info.user ? info.user.firstname+" "+info.user.lastname  : <TextLoader width="100" x="51" />}</CardTitle>
            <>{info.user ? <Badge theme="light"> <a href={`mailto:${info.user.username}@univ-lehavre.fr`}>{info.user.username}@univ-lehavre.fr</a></Badge>:<TextLoader width="80" x="60" />}  </>
            </CardBody>
          </Card>
        </Col>

        <Col lg="9" sm="12">
          <Card>
            <CardHeader style={{ marginBottom: "10px" }}>
              Groupe :{" "}
              {info.groupe && (
                <Badge style={{ backgroundColor: info.groupe.color }}>
                  {info.groupe.name}
                </Badge>
              )}
            </CardHeader>
            <CardBody>
              <h1>
                {/*  */}
                {info.module ? <>{info.module.name} <Badge theme="success">{info.type && info.type}</Badge></>  : <TitleLoader />}
                
              </h1>
              <div
                onClick={() => setEventCollapse(!eventCollapse)}
                className={style.ViewCollapse}
              >
                {eventCollapse ? <FaAngleDown /> : <FaAngleRight />}Voir Les
                événements de la séances
              </div>
              <Collapse open={eventCollapse}>
                <div className="table-responsive">
                  <table className={`table  ${style.EventTable}`}>
                    <thead>
                      <tr>
                        <th>Type</th>
                        <th scope="col">Professeur</th>
                        <th>Description</th>
                        <th>Durée</th>
                        <th>Echéance</th>
                        <th>Piéces jointes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {info.events ?
                        info.events.map(event => (
                          <tr key={event.id}>
                            <td>
                              {event.type === "fait" ? <Badge theme="info">{event.type}</Badge> : <Badge theme="warning">{event.type}</Badge> }
                            </td>
                            <th scope="row">{`${event.user.firstname} ${event.user.lastname}`}</th>
                            <td>
                              <ModalViewDetail text={event.name} />
                            </td>
                            <td>00h30</td>
                            
                            <td>{moment(event.dueAt).format("MM/DD/YYYY")}</td>
                           
                            <td style={{ textAlign: "center" }}>
                              {event.attachmentEvents.length !== 0 ? <ModalViewFiles files={event.attachmentEvents} /> : <FaFileAlt style={{color:"grey"}} />}
                            </td>
                          </tr>
                        ))
                        :
                        <>
                          <TableLoader />
                          <TableLoader />
                        </>
                       
                      }

                    </tbody>
                  </table>
                </div>
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
                <table className="table table-responsive">
                  <thead>
                    <tr>
                      <th scope="col"></th>
                      <th scope="col"></th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">
                        {" "}
                        <ProfileRound
                          size="Small"
                          letter="t"
                          bgcolor="blue"
                          fcolor="#fff"
                        />
                      </th>
                      <td>
                        Mauris id dignissim turpis. Donec ornare lacus pulvinar
                        aliquet vestibulum. Pellentesque tempor ornare lacus,
                        aliquet sodales tellus. Nullam porttitor ligula sed sem
                        laoreet, nec luctus turpis sollicitudin. Nullam
                        vulputate, ante sit amet ullamcorper vehicula, risus est
                        molestie eros, eget iaculis tortor ipsum volutpat tellus
                      </td>
                      <td>Le 23/09/19</td>
                    </tr>
                    <tr>
                      <th scope="row">
                        {" "}
                        <ProfileRound
                          size="Small"
                          letter="t"
                          bgcolor="blue"
                          fcolor="#fff"
                        />
                      </th>
                      <td>
                        Mauris id dignissim turpis. Donec ornare lacus pulvinar
                        aliquet vestibulum. Pellentesque tempor ornare lacus,
                        aliquet sodales tellus. Nullam porttitor ligula sed sem
                        laoreet, nec luctus turpis sollicitudin. Nullam
                        vulputate, ante sit amet ullamcorper vehicula, risus est
                        molestie eros, eget iaculis tortor ipsum volutpat tellus
                      </td>
                      <td>Le 23/09/19</td>
                    </tr>
                    <tr>
                      <th scope="row">
                        {" "}
                        <ProfileRound
                          size="Small"
                          letter="t"
                          bgcolor="blue"
                          fcolor="#fff"
                        />
                      </th>
                      <td>
                        Mauris id dignissim turpis. Donec ornare lacus pulvinar
                        aliquet vestibulum. Pellentesque tempor ornare lacus,
                        aliquet sodales tellus. Nullam porttitor ligula sed sem
                        laoreet, nec luctus turpis sollicitudin. Nullam
                        vulputate, ante sit amet ullamcorper vehicula, risus est
                        molestie eros, eget iaculis tortor ipsum volutpat tellus
                      </td>
                      <td>Le 23/09/19</td>
                    </tr>
                  </tbody>
                </table>
                <div className={style.AddComment}>
                  <h5>Ajouter un nouveau commentaire</h5>
                  <ProfileRound
                    size="Small"
                    letter="t"
                    bgcolor="blue"
                    fcolor="#fff"
                  />
                  <FormTextarea
                    placeholder="Votre commentaire ... (120 charactères max.)"
                    maxLength="120"
                  />
                  <Button style={{ marginLeft: "10px" }}>Ajouter</Button>
                </div>
              </Collapse>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
