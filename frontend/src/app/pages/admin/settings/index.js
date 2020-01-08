import React, {useState, useEffect} from 'react'
import PageLoader from "../../../components/layouts/loader";
import {useDispatch, useSelector} from "react-redux";
import {Button, Card, CardBody, CardHeader, Slider} from "shards-react";
import {APIEditSettings, APIGetSettings} from "../../../api/settingFetch";
import img from "../../../assets/images/error_401.jpg";
import {navigate} from "hookrouter";
import {toast} from "react-toastify";

export default function Settings()
{
    const [loader, setLoader] = useState(false);

    const [maxEventSession, setMaxEventSession]       = useState(0);
    const [maxAttachmentEvent, setMaxAttachmentEvent] = useState(0);

    useEffect( () => {
        setLoader(true)
        APIGetSettings()
            .then(data => {
                setLoader(false);
                setMaxEventSession(data.data.maxEventSession);
                setMaxAttachmentEvent(data.data.maxAttachmentEvent);
            })
    }, []);

    const handleSend = () => {
        setLoader(true)
        let req = {
            "max_event": parseInt(maxEventSession),
            "max_attachment": parseInt(maxAttachmentEvent)
        };

        APIEditSettings(req)
            .then(data => {
                setLoader(false);
                toast.success("Modification effectuée");
            })
            .catch(err => console.log(err.response))
    };

    return (        <div>
            <Card>
                <CardHeader>
                    <h1 style={{padding:20}}>Paramètres de Schoolshare</h1>
                </CardHeader>
                <CardBody>
                    <h4>Nombre maximum d'évènement par séances : {parseInt(maxEventSession)}</h4>
                    <Slider onSlide={e => setMaxEventSession(e[0])} connect={[true, false]} start={[maxEventSession]} range={{ min: 0, max: 20 }} step={1} />

                </CardBody>
                <CardBody>
                    <h4>Nombre maximum de pièces jointes par évènement : {parseInt(maxAttachmentEvent)}</h4>
                    <Slider onSlide={e => setMaxAttachmentEvent(e[0])} connect={[true, false]} start={[maxAttachmentEvent]} range={{ min: 0, max: 20 }} step={1} />

                </CardBody>
                <Button style={{width: "100%", display: "block", marginLeft: "auto", marginRight: "auto"}}
                        onClick={() => handleSend()}>Valider les changements</Button>
            </Card>


            { (loader === true) ? (
                <PageLoader />
            ):(
                <React.Fragment />
            )}
        </div>
    )
}