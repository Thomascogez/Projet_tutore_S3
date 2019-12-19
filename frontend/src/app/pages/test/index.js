/**
 * Ajout
 *
 * Component by the route /addUsers and contain all the functionnality to add a new Course / event
 */

import React, { useState } from "react";
import Toggle from '../../components/options_components/Toggle'
import { FormSelect } from 'shards-react'

export default function Ajout() {

  const [status, setStatus] = useState( "Matière" );
  const [status2, setStatus2] = useState( "Groupe" );

  return (
    <div>
        <Toggle text="Theme sombre"/>

        <FormSelect onChange={(e) => setStatus(e.target.value)}>
            <option value="Matière"> Matière </option>
            <option value="Systeme">Systeme</option>
            <option value="EC">E.C</option>
            <option value="Bado">Bado</option>
        </FormSelect>

        { status != "Matière" ? <FormSelect onChange={(e) => setStatus(e.target.value)}>
            <option value="Groupe"> Groupe </option>
            <option value="Systeme">Systeme</option>
            <option value="EC">E.C</option>
            <option value="Bado">Bado</option>
        </FormSelect> : <div></div>}
        <span>{status}</span>
    </div>
  );
}
