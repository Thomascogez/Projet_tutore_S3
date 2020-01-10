import React from 'react'
import style from "./profileround.module.css"
import PropTypes from 'prop-types';

export default function ProfileRound({letter, bgcolor, fcolor, size}) {
    
    ProfileRound.propTypes = {
        /**Lettre a aficher */
        letter  : PropTypes.string,
        /**Couleur du fond  */
        bgcolor : PropTypes.string,
        /**Couleur du texte */
        fcolor  : PropTypes.string,
        /** Taille de L'affiche du composant */
        size    : PropTypes.oneOf(['Big','Medium','Small'])

    }
    return (
        <div className = {`${style.ProfileRound} ${style[size]}`} style={{backgroundColor:bgcolor, color:fcolor}}>
            {letter}
        </div>
    )
    
}
