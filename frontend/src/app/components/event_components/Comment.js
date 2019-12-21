import React from "react";
import ProfileRound from '../profileRound_component/ProfileRound'
import style from './event.module.css'
export default function Comment(props)
{
   
    return (
        <div className= {style.Comment}>
          
           <span className={style.CommentName}>John Doe</span>
           <p className={style.CommentContent}>Mauris id dignissim turpis. Donec ornare lacus pulvinar aliquet vestibulum. Pellentesque tempor ornare lacus, aliquet sodales tellus. Nullam porttitor ligula sed sem laoreet, nec luctus turpis sollicitudin. Nullam vulputate, ante sit amet ullamcorper vehicula, risus est molestie eros, eget iaculis tortor ipsum volutpat tellus</p>
        
        </div>
    )
}