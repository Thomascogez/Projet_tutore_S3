/**
 * Ajout
 *
 * Component by the route /addUsers and contain all the functionnality to add a new Course / event
 */

import React, { useState } from "react";
import CP from '../../components/colorPicker_component/colorPicker'
import ProfilRound from '../../components/profileRound_component/ProfilRound'

export default function Ajout() {
  return (
    <div>
        <CP/>
        <ProfilRound letter="C" bgcolor="#9cb6ff"/>
    </div>
  );
}