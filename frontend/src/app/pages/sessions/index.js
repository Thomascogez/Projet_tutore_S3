import React, {useState, useEffect, useCallback} from "react";
import { Container, Row, Col, Button, Card, CardHeader } from "shards-react";
import style from "./sessions.module.css";
import { navigate } from "hookrouter";
import { FaBookOpen } from "react-icons/fa";
import moment from "moment";
import 'moment/locale/fr';

//seances components
import WorkContainer from "../../components/sessions_components/WorkContainers";
import DayContainer from "../../components/sessions_components/DayContainer";
import MounthSelector from "../../components/sessions_components/MounthSelector";
import Work from "../../components/sessions_components/Work";
import { APIgetAllSession } from "../../api/sessionFetch";
import PageLoader from "../../components/layouts/loader";

export default function Seances() {
    
  moment.locale("fr" )
  const [allSeance, setAllSeance] = useState({});
  const [date, setDate] = useState(moment().format("YYYY MM"));
  const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true)
        APIgetAllSession( moment(date).format("MM"), moment(date).format("YYYY") ) //fetching session types
            .then(data => {
                setLoading(false)
                setAllSeance(data.data);
          })
          .catch(err => console.log(err));
  }, [date]);

  const getSetDate = useCallback((value) => {
      setDate(value)
  }, []);

  return (        
    <Container fluid className={style.SeancesContainer}>
      <Button onClick={() => navigate("/seances/ajoutSeance")}>
        <FaBookOpen style={{ marginRight: "15px" }} /> Ajouter séance
      </Button>

      { loading ? (
        <>
          <PageLoader />
        </>
      ) : (
        <>
          <MounthSelector getSetDate={getSetDate} date={date}/>

          {Object.entries(allSeance).length === 0?(<h2>Aucune séance sur ce mois</h2>):("")}
            {Object.entries(allSeance).map(key1 => (
            <>
              {/*<Row className={style.WorkRow}>*/}
              {/*  <Card>*/}
              {/*    <CardHeader> Semaine {key1[0]} </CardHeader>*/}

              {/*    <Col lg="12" sm="12">*/}
              {/*      <Row className={style.DailyWorkRow}>*/}
              {/*          { Object.entries(key1[1]).map(key2 =>(*/}
              {/*              <>*/}
              {/*              <Col lg="1" sm="1">*/}
              {/*                  <DayContainer day= { moment(date.format("YYYY")+ "-" + date.format("MM")+ "-" +  key2[0]).format('dddd') } />*/}
              {/*              </Col>*/}
              {/*              */}
              {/*              <Col lg="11" sm="11">*/}
              {/*                  <WorkContainer>*/}
              {/*                      { Object.entries(key2[1]).map(key3 =>(*/}
              {/*                          <>*/}
              {/*                              /!*<Work color={key3.module.color } name={key3.module.name } finished={false} typeCours="TP" />*!/*/}
              {/*                          </>*/}
              {/*                      ))}*/}
              {/*                  </WorkContainer>*/}
              {/*              </Col>*/}
              {/*              </>*/}
              {/*          ))}*/}
              {/*      </Row>*/}
              {/*    </Col>*/}
              {/*  </Card>*/}
              {/*</Row>*/}
            </>
          ))}
        </>
      )}
    </Container>
  );
}
