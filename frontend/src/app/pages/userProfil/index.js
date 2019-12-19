import React from 'react';
import style from './userprofil.module.css'
import { Badge } from "shards-react";


export default function Userprofil() {
  return (
      <div className={ style.content}>

      <div> icon </div>

         <div className={style.id }> </div> 
         <div> er141215 </div>
         <div className={style.fname }> quelquun </div>
         <div className={style.name}>personne</div>

      </div>
  );
}