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

import Loader from 'react-loader-spinner'
import { FaAngleRight, FaAngleDown } from "react-icons/fa";
import ProfileRound from "../../../components/profileRound_component/ProfileRound";
import style from "./eventview.module.css";

import Comment from "../../../components/view_event_components/Comment";
import Event from '../../../components/view_event_components/Event'

//api
import { APIgetSession } from "../../../api/sessionFetch";
import { APIgetComment, APIpostComment } from '../../../api/CommentFetch';


//loader

import ProfileLoader from "../../../components/loader/ProfileLoader";
import TextLoader from "../../../components/loader/TextLoader";
import TableLoader from "../../../components/loader/TableLoader";
import TitleLoader from "../../../components/loader/TitleLoader";

/**
 * ViewsEvent
 *
 * Component the display all the information of a seance
 */
export default function ViewsEvent(props) {
  const [info, setInfo] = useState({}); //hook that hold data about the loaded course

  const [comments, setComments] = useState([]); //hook that hold fetched comment from the api

  const [newComment, setNewComment] = useState(""); //hook that handle new comment

  const [verifBut, setVerifBut] = useState(false);

  const handleCommentSubmit = () => {  //handle comment submit

    setVerifBut(true);

    if( newComment != null && newComment.length !== 0  && newComment.length < 120){

      APIpostComment(info.id, newComment)
        .then(data => {
          //toast success
          console.log(data);         
        })
        .catch(err => {
          //toast err
        })
    }else {
      //toast err ....
    }
  }


  useEffect(() => {
    //fetch the api to get information about the session
    APIgetSession(props.seanceId.seanceId)
      .then(data => {
        console.log(data.data);
        setInfo(data.data);
      })
      .catch(err => console.log(err));
  }, []);


  
  useEffect(() => {
    // /api/sessions/{id_session}/comments
    APIgetComment(info.id)
      .then(data =>{ 
          setComments(data.data)
          console.log(data.data);
          
        })
      .catch();
  }, [info]);

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
            <>
              {info.user ? (
                <ProfileRound
                  size="Big"
                  bgcolor={info.user.color}
                  letter={info.user.firstname.charAt(0)}
                  fcolor="#fff"
                />
              ) : (
                <ProfileLoader />
              )}
            </>
            <CardBody>
              <CardTitle>
                {info.user ? (
                  info.user.firstname + " " + info.user.lastname
                ) : (
                  <TextLoader width="100" x="51" />
                )}
              </CardTitle>
              <>
                {info.user ? (
                  <Badge theme="light">
                    {" "}
                    <a href={`mailto:${info.user.username}@univ-lehavre.fr`}>
                      {info.user.username}@univ-lehavre.fr
                    </a>
                  </Badge>
                ) : (
                  <TextLoader width="80" x="60" />
                )}{" "}
              </>
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
                {info.module ? (
                  <>
                    {info.module.name}{" "}
                    <Badge theme="success">{info.type && info.type}</Badge>
                  </>
                ) : (
                  <TitleLoader />
                )}
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
                      {info.events ? (
                        info.events.map(event => (
                          <Event key={event.key} data={event} />
                        ))
                      ) : (
                        <>
                          <TableLoader />
                          <TableLoader />
                        </>
                      )}
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
                <table className="table table-responsive">
                  <thead>
                    <tr>
                      <th scope="col"></th>
                      <th scope="col"></th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {comments &&
                      comments.map(comment => (
                      <Comment key={comment.id} data={comment} />
                      ))}
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
                    value={newComment}
                    onChange = {e => setNewComment(e.target.value)}
                  />
                  <Button disabled={verifBut || newComment === ""} onClick={() => handleCommentSubmit()} style={{ marginLeft: "10px" }}>{verifBut ? <Loader
                    type="ThreeDots"
                    color="#FFF"
                    height={20}
                    width={50}
              /> : "Ajouter"}</Button>
                  
                </div>
              </Collapse>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
