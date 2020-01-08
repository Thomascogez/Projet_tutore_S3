import React, { useState } from "react";
import { Collapse as ShardCollaps, Badge } from "shards-react";
import { FaAngleDown, FaAngleRight } from "react-icons/fa";
import style from "./collapse.module.css";
import ModalViewDetails from "../../view_event_components/ModalViewDetails"
import ModalViewFiles from "../../view_event_components/ModalViewsFiles"
import {FaFileAlt} from 'react-icons/fa';

export default function Collapse({ title, size, events }) {
  const [open, setOpen] = useState(false);
  console.log(events)
  function tab(){
      return (<div className="table-responsive">
      <table className={`table  ${style.EventTable}`}>
          <thead>
              <tr>
                  <th>Type</th>
                  <th>Nom séance</th>
                  <th>Type séance</th>
                  <th>Description</th>
                  <th>Durée</th> 
                  {/* ({totalDuration}h) */}
                  <th>Echéance</th>
                  <th>Pièces jointes</th>
                  {/* <th>Edition</th> */}
              </tr>
          </thead>
          <tbody>
            {
              events.map(event => (
                <tr>
                  
            <td>
              {event.type === "fait" ? 
                <Badge theme="info" style={{width: "50px"}}>{event.type}</Badge>
                :
                <Badge theme="warning" style={{width: "50px"}}>{event.type}</Badge>
              }
            </td>
            <td>
              <Badge theme="info" style={{backgroundColor: event.session.module.color, width: "70px"}}>[ {event.session.module.code}] </Badge> {event.session.module.name}
            </td>
            <td>{event.session.type}</td>
            <td><ModalViewDetails text={event.name}/></td>

            <td>
                {event.attachmentEvents.length !== 0 ?(
                    <ModalViewFiles
                        files={event.attachmentEvents}
                    />
                ) : (
                    <FaFileAlt style={{ color: "grey" }} />
                )}
            </td>
                </tr>
              ))
            }
          </tbody>
      </table>
  </div>)
  }

  return (
    <>
        <tr>
          <td onClick={() => setOpen(!open)} className={style.ViewCollapse}>
            {open ? <FaAngleDown /> : <FaAngleRight />} {title}
          </td>
        </tr>
        <ShardCollaps open={open}>{tab()}</ShardCollaps>
    </>
  );
}
