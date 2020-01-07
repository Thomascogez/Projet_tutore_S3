import React, { useState, useEffect, useCallback } from "react";
import { Container, Row, Col, Button, Card, CardBody } from "shards-react";
import style from "./sessions.module.css";
import { navigate } from "hookrouter";
import { FaBookOpen, FaPlus, FaMinus } from "react-icons/fa";
import moment from "moment";
import "moment/locale/fr";
//seances components
import WorkContainer from "../../components/sessions_components/WorkContainers";
import DayContainer from "../../components/sessions_components/DayContainer";
import MounthSelector from "../../components/sessions_components/MounthSelector";
import Work from "../../components/sessions_components/Work";
import { APIgetAllSession } from "../../api/sessionFetch";
import PageLoader from "../../components/layouts/loader";
import Collapse from "../../components/layouts/Collapse/CollapseSessions";
import {
  FloatingMenu,
  MainButton,
  ChildButton,
} from 'react-floating-button-menu';
import CollapseLoader from "../../components/loader/CollapseLoader";

export default function Seances() {
  moment.locale("fr");
  const [allSessions, setAllSessions] = useState({});
  const [date, setDate] = useState(moment().format("YYYY MM"));
  const [loading, setLoading] = useState(true);
  const [openMenu, setOpenMenu] = useState(false)
  var duration = 0;

  function addDuration(dur) {
    duration += dur
  }

  function reinitDuration() {
    duration = 0
  }

  function sortFunction(a, b) {
    if (a[0] === b[0]) {
      return 0;
    }
    else {
      return (a[0] < b[0]) ? -1 : 1;
    }
  }

  useEffect(() => {
    console.log("ok");

    setLoading(true);
    APIgetAllSession(moment(date).format("MM"), moment(date).format("YYYY")) //fetching session types
      .then(data => {
        let tmp = {};

        Object.entries(data.data).map(weekSessions => {
          tmp[parseInt(weekSessions[0])] = [];
          let test = Object.entries(weekSessions[1]).sort(sortFunction);
          test.map(daySessions => {
            tmp[parseInt(weekSessions[0])].push(daySessions)
          })
        })
        setAllSessions(tmp);
        setLoading(false)
      })
      .catch(err => console.log(err));
  }, [date]);

  useEffect(() => {
    console.log(allSessions.length);
  }, [allSessions])

  const getSetDate = useCallback(value => {
    setDate(value.format("YYYY MM"));
  }, []);

  return (
    <>
      <Container fluid className={style.SeancesContainer}>
        <MounthSelector getSetDate={getSetDate} date={date} />
        {loading ?
          <>
            <Card style={{ margin: "5px 0px 5px 0px" }}>
              <CardBody>
                <CollapseLoader />
              </CardBody>
            </Card>
            <Card style={{ margin: "5px 0px 5px 0px" }}>
              <CardBody>
                <CollapseLoader />
              </CardBody>
            </Card>
            <Card style={{ margin: "5px 0px 5px 0px" }}>
              <CardBody>
                <CollapseLoader />
              </CardBody>
            </Card>
            <Card style={{ margin: "5px 0px 5px 0px" }}>
              <CardBody>
                <CollapseLoader />
              </CardBody>
            </Card>
            <Card style={{ margin: "5px 0px 5px 0px" }}>
              <CardBody>
                <CollapseLoader />
              </CardBody>
            </Card>
          </>

          :
          <>


            {Object.entries(allSessions).length === 0 ? !loading && <h2>Aucune séance sur ce mois</h2> : ("")}

            {Object.entries(allSessions).map(weekSessions => (
              <>

                <Row className={style.WorkRow}>
                  <Card style={{ width: "100%" }}>
                    <CardBody>
                      <Collapse
                        title={"Semaine " + weekSessions[0] + " ( du " + moment().day("Lundi").year((date.split(" "))[0]).week(weekSessions[0]).format("DD/MM/Y") + " au " + moment().day("Lundi").year((date.split(" "))[0]).week(weekSessions[0]).add(6, 'days').format("DD/MM/Y") + " )"}
                      >

                        <Row className={style.DailyWorkRow}>
                          {Object.entries(weekSessions[1]).map(daySessions => (
                            <>
                              <Col lg="2" md="12">
                                {<DayContainer day={moment(date.replace(/ /g, "") + daySessions[1][0]).format("dddd") + " " + daySessions[1][0]} />}
                              </Col>

                              <Col lg="10" sm="12">
                                <WorkContainer>
                                  {Object.entries(daySessions[1][1]).map(session => (
                                    <>
                                      {Object.entries(session[1].events).map(events2 => (
                                        <>
                                          {addDuration(events2[1].duration)}
                                        </>
                                      ))}

                                      <Work key={session[1].id} id={session[1].id} color={session[1].module.color === "" ? "#000000" : session[1].module.color} name={session[1].module.name} duration={duration} />
                                      {reinitDuration()}
                                    </>
                                  ))}
                                </WorkContainer>
                              </Col>
                            </>
                          ))}
                        </Row>
                        {/* </Col> */}
                      </Collapse>
                    </CardBody>
                  </Card>

                </Row>
              </>
            ))}

          </>
        }

        <FloatingMenu
          className="floating-button"
          slideSpeed={500}
          direction="up"
          spacing={8}
          isOpen={openMenu}
        >
          <MainButton
            iconResting={<FaPlus style={{ fontSize: 20, color: "black" }} />}
            iconActive={<FaMinus style={{ fontSize: 20, color: "black" }} />}
            backgroundColor="black"
            onClick={() => setOpenMenu(!openMenu)}
            size={56}
          />
          <ChildButton
            icon={<FaBookOpen style={{ fontSize: 20, color: "black" }} />}
            backgroundColor="white"
            size={40}
            onClick={() => console.log('First button clicked')}
          />
          {/* <ChildButton
        icon={<MdFavorite style={{ fontSize: 20 }} nativeColor="black" />}
        backgroundColor="white"
        size={40}
      />
      <ChildButton
        icon={<MdFavorite style={{ fontSize: 20 }} nativeColor="black" />}
        backgroundColor="white"
        size={40}
      /> */}
        </FloatingMenu>
      </Container>

    </>
  );
}
