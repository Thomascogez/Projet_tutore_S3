import React from "react";
import styles from './seance.module.css'
export default function SeanceContainer(props) {
  return (
    <table className={`table ${styles.Container}`}>
      <thead>
        <tr>
      
          <th>Module</th>
          <th>Date</th>
          <th>Type</th>
          <th>Groupe</th>
          <th>Enseignant</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
       {props.children}
      </tbody>
    </table>
  );
}
