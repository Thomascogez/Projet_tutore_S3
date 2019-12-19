import React from 'react';
import style from './userprofil.module.css'
import { AiOutlineNumber } from 'react-icons/ai';
import { IoIosPerson,IoIosAt } from 'react-icons/io'
import { MdDateRange,MdTagFaces,MdGroup } from 'react-icons/md'
import { FaStarOfLife } from 'react-icons/fa'

export default function Userprofil() {
  return (
    <div className={ style.content}>

        <div className={style.top}> 
        
            <div className={style.icon}> <MdTagFaces className={style.img}/>  </div>
            <div className={style.title}> Page de profil </div>
        </div>

        <div className={style.left}> 
            <div>       
                <div className={style.txtid }><AiOutlineNumber/>  PL172666 </div>
                <div className={style.line}></div> 
            </div>

            <div>       
                <div className={style.txtid }><IoIosPerson/>  Léo Prévost</div>
                <div className={style.line}></div> 
            </div>

            <div>       
                <div className={style.txtid }><IoIosAt/> leo.prevost@etu.univ-lehavre.fr  </div>
                <div className={style.line}></div> 
            </div>

            </div>

            <div className={style.right} > 
            <div>       
                    <div className={style.txtid }><MdDateRange/>  08/08/1999 </div>
                    <div className={style.line}></div> 
                </div>
                <div>       
                    <div className={style.txtid2 }><MdGroup/> J1 </div>
                    <div className={style.line}></div> 
                </div>
                
                <div>       
                    <div className={style.txtid2 }><FaStarOfLife/> ************** </div>
                    <div className={style.line}></div> 
                </div>
            </div>

    </div>




  );
}