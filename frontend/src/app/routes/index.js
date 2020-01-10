import React from 'react'
import Home from '../pages/home'
import UserprofileEdit from '../pages/userProfil/_index'
import Userprofile from '../pages/userProfil/otherProfil'
import Password from '../pages/home/passwordForget'
import Seances from '../pages/sessions'
import AddEvent from '../pages/event/addEvent'
import AddUser from '../pages/admin/users/addUser'
import Administration from '../pages/admin'
import EditGroup from '../pages/admin/group'
import GererUtilisateur from '../pages/admin/users'
import EditModule from '../pages/admin/module'
import Options from '../pages/options'
import AddSession from '../pages/sessions/addSession/'
import PasswordReset from "../pages/home/passwordReset";
import ViewsSession from '../pages/sessions/view/index'
import Types from "../pages/admin/types/index";
import MyEvents from "../pages/event/myEvents";
import MySession from "../pages/sessions/mySession/index";

import ProtectedRoute from '../utils/protectedRoute'
import ProtectedRouteAdmin from '../utils/protectedRouteAdmin';
import Sessions from "../pages/admin/sessions";
import Settings from "../pages/admin/settings";
import LegalNotice from "../pages/legalNotice";

const routes = {
    '/': () => <Home />,
    '/mentionLegales': () => <LegalNotice />,
    '/passwordForget': () => <Password />,
    '/passwordReset/:token': (token) => <PasswordReset token={token} />,

    '/profil/:idUser': (idUser) => <ProtectedRoute> <Userprofile idUser={idUser} /></ProtectedRoute>,
    '/profil': () => <ProtectedRoute> <UserprofileEdit /></ProtectedRoute>,
    '/mesSeances': () => <ProtectedRoute> <MySession /> </ProtectedRoute>,
    '/mesEvenements': () => <ProtectedRoute> <MyEvents /> </ProtectedRoute>,
    '/seances': () => <ProtectedRoute> <Seances />                          </ProtectedRoute>,
    '/seances/ajoutSeance': () => <ProtectedRoute> <AddSession />                       </ProtectedRoute>,
    '/seances/:seanceId': (seanceId) => <ProtectedRoute> <ViewsSession seanceId={seanceId} /> </ProtectedRoute>,
    '/seances/evenement/ajout': () => <ProtectedRoute> <AddEvent />                         </ProtectedRoute>,
    '/evenement/modifier/:eventID': (eventID) => <ProtectedRoute> <AddEvent edit eventID={eventID} /> </ProtectedRoute>,

    '/seances/modifier/:sessionID': (sessionID) => <ProtectedRoute> <AddSession id={sessionID} edit />  </ProtectedRoute>,

    '/administration': () => <ProtectedRoute><ProtectedRouteAdmin> <Administration /> </ProtectedRouteAdmin></ProtectedRoute>,
    '/administration/utilisateurs': () => <ProtectedRoute><ProtectedRouteAdmin> <GererUtilisateur /></ProtectedRouteAdmin></ProtectedRoute>,
    '/administration/utilisateurs/ajout': () => <ProtectedRoute><ProtectedRouteAdmin> <AddUser />        </ProtectedRouteAdmin></ProtectedRoute>,
    '/administration/modules': () => <ProtectedRoute><ProtectedRouteAdmin> <EditModule />     </ProtectedRouteAdmin></ProtectedRoute>,
    '/administration/groupes': () => <ProtectedRoute><ProtectedRouteAdmin> <EditGroup />      </ProtectedRouteAdmin></ProtectedRoute>,
    '/administration/types': () => <ProtectedRoute><ProtectedRouteAdmin> <Types />          </ProtectedRouteAdmin></ProtectedRoute>,
    '/administration/sessions': () => <ProtectedRoute><ProtectedRouteAdmin> <Sessions />       </ProtectedRouteAdmin></ProtectedRoute>,
    '/administration/parametres': () => <ProtectedRoute><ProtectedRouteAdmin> <Settings />       </ProtectedRouteAdmin></ProtectedRoute>,

   
};

export default routes;