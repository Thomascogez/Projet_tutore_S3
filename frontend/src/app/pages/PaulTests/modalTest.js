import React from "react";
import Modal from "../../components/seances_components/Modal";
import Comment from "../../components/seances_components/Comment";

import style from "../seances/seances.module.css";

export default function test() {
  return (
    <div class={style.Titre}>
      <h1>Test Modal</h1>
      <div>
        <table class={style.ModalTestTable}>
          <tr>
            <th>
              <Modal
                name="Mathematiques"
                cours="Veuillez remplir le questionnaire ci-joint !"
                typeCours="TD"
                fichier="FichierARemplir.odf"
                color="#FF0000"
              >
                <div>
                  <Comment
                    name="Lepivert"
                    date="07/10/18"
                    hour="10:04"
                    comment="Doit-on le rendre sur Eureka ou par mail ?"
                  />
                  <Comment
                    name="Charier"
                    date="08/10/18"
                    hour="07:56"
                    comment="Doit-on vous l'envoyer au format actuelle ou pdf?"
                  />
                  <Comment
                    name="Boukachour"
                    date="08/10/18"
                    hour="12:03"
                    comment="À quoi va servir ce document?"
                  />
                </div>
              </Modal>
            </th>
            <th>
              <Modal
                name="CPOA"
                cours="Il y aura un contrôle le 12/09/20, reviser tout depuis le début d'année"
                typeCours="TD"
                fichier=""
                color="#00FF00"
              >
                  <div>
                    <Comment 
                        name="GMan"
                        date="25/12/20"
                        hour="09:43"
                        comment="Tu fais pas d'effort !"
                    />
                  </div>
                </Modal>
            </th>
            <th>
              <Modal
                name="JAVA"
                cours="Exercice 4 du TP 5 à finir avant le 10/08/19"
                typeCours="TP"
                fichier=""
                color="#0000FF"
              >
                  <div>
                      <Comment
                        name="Ducon"
                        date="31/12/39"
                        hour="23:59"
                        comment="Fini !"
                      />
                  </div>
                </Modal>

            </th>
          </tr>
        </table>
      </div>
    </div>
  );
}
