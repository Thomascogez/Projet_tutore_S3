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

export default function Seances() {
  moment.locale("fr");
  const [allSessions, setAllSessions] = useState([]);
  const [date, setDate] = useState(moment().format("YYYY MM"));
  const [loading, setLoading] = useState(true);

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
            let tmp = [];

            Object.entries(data.data).map(weekSessions => {
                tmp[weekSessions[0]] = [];
                let test = Object.entries(weekSessions[1]).sort(sortFunction);

                test.map(daySessions => {
                    tmp[weekSessions[0]].push(daySessions)
                })
            })
            setAllSessions(tmp);
        })
      .catch(err => console.log(err));
  }, [date]);

  const getSetDate = useCallback(value => {
    setDate(value);
  }, []);

  return (
    <Container fluid className={style.SeancesContainer}>
      <Button onClick={() => navigate("/seances/ajoutSeance")}>
        <FaBookOpen style={{ marginRight: "15px" }} /> Ajouter séance
      </Button>

      {loading ? ( <> <PageLoader /> </> ) : 
      ( <>
          <MounthSelector getSetDate={getSetDate} date={date} />

          {allSessions.length === 0 ? ( <h2>Aucune séance sur ce mois</h2> ) : ( "" )}

          {allSessions.map(weekSessions => (
            <>
            {console.log(weekSessions)}
              <Row className={style.WorkRow}>
                <Card style={{ width: "100%" }}>
                  <CardHeader> Semaine {weekSessions[0]} </CardHeader>

                  <Col lg="12" sm="12">
                    <Row className={style.DailyWorkRow}>
                      {Object.entries(weekSessions[1]).map(key2 => (
                        <>
                          <Col lg="1" sm="1">
                            { <DayContainer day={ moment( date.replace(/ /g, "") + key2[0] ).format("dddd") + " " + key2[0] } /> }
                          </Col>

                          <Col lg="11" sm="11">
                            <WorkContainer>
                              {Object.entries(key2[1]).map(key3 => (
                                  
                                    <Work color={ key3[1].module.color === "" ? "#000000" : key3[1].module.color } name={key3[1].module.name} />
                              ))}
                            </WorkContainer>
                          </Col>
                        </>
                      ))}
                    </Row>
                  </Col>
                </Card>
              </Row>
            </>
          ))}
        </>
      )}
    </Container>
  );
}
