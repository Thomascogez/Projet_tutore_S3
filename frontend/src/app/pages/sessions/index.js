import React, { useState, useEffect, useCallback } from "react";
import { Container, Row, Col, Button, Card, CardHeader } from "shards-react";
import style from "./sessions.module.css";
import { navigate } from "hookrouter";
import { FaBookOpen } from "react-icons/fa";
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

export default function Seances() {
  moment.locale("fr");
  const [allSessions, setAllSessions] = useState({});
  const [date, setDate] = useState(moment().format("YYYY MM"));
  const [loading, setLoading] = useState(true);
  var  duration = 0;

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
    <Container fluid className={style.SeancesContainer}>
      <Button onClick={() => navigate("/seances/ajoutSeance")}>
        <FaBookOpen style={{ marginRight: "15px" }} /> Ajouter séance
      </Button>

      {loading ? ( <> <PageLoader /> </> ) : 
      ( <>
          <MounthSelector getSetDate={getSetDate} date={date} />

          {Object.entries(allSessions).length === 0 ? ( <h2>Aucune séance sur ce mois</h2> ) : ( "" )}

          {Object.entries(allSessions).map(weekSessions => (
            <>
            
              <Row className={style.WorkRow}>
                <Card style={{ width: "100%" }}>
                    <Collapse
                        title={"Semaine " + weekSessions[0] + " ( du " + moment().day("Lundi").year((date.split(" "))[0]).week(weekSessions[0]).format("DD/MM/Y") + " au " + moment().day("Lundi").year((date.split(" "))[0]).week(weekSessions[0]).add(6,'days').format("DD/MM/Y") + " )"}
                    >

                        <Col lg="12" sm="12">
                            <Row className={style.DailyWorkRow}>
                            {Object.entries(weekSessions[1]).map(daySessions => (
                                <>
                                <Col lg="1" sm="1">
                                    { <DayContainer day={ moment( date.replace(/ /g, "") + daySessions[1][0] ).format("dddd") + " " + daySessions[1][0] } /> }
                                </Col>

                                <Col lg="11" sm="11">
                                    <WorkContainer>
                                    { Object.entries(daySessions[1][1]).map(session =>(
                                        <>
                                           
                                            
                                            {Object.entries(session[1].events).map(events2 =>(
                                                <>
                                                    {addDuration(events2[1].duration)}
                                                </>
                                            ))}
                                            
                                            <Work key={session[1].id} id={session[1].id} color={ session[1].module.color === "" ? "#000000" : session[1].module.color } name={session[1].module.name} duration={duration} />
                                            {reinitDuration()}
                                        </>
                                    ))}
                                    </WorkContainer>
                                </Col>
                                </>
                            ))}
                            </Row>
                        </Col>
                    </Collapse>
                </Card>
              </Row>
            </>
          ))}
        </>
      )}
    </Container>
  );
}
