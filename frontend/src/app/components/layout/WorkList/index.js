import React from 'react';
import Style from './workList.module.css'


export default function workList( props ) {
    return (
        <div> 
            <div className={Style.week}> {props.texte} </div>
            <div className={Style.work}>  </div>
        </div>
  );
}
