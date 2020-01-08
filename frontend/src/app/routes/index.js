import React from 'react'
import Home from '../pages/home'
import UserprofileEdit from '../pages/userProfil/_index'
import Userprofile from '../pages/userProfil/otherProfil'
import Password from '../pages/home/passwordForget'
import Seances from '../pages/sessions'
import AddEvent from '../pages/event/addEvent/_index'
import AddUser from '../pages/admin/users/addUser'
import Administration from '../pages/admin'
import EditGroup from '../pages/admin/group'
import GererUtilisateur from '../pages/admin/users'
import EditModule from '../pages/admin/module'
import Options from '../pages/options'
import AddSession from '../pages/sessions/addSession/_index'
import Test from '../pages/test'
import PasswordReset from "../pages/home/passwordReset";
import ViewsSession from '../pages/event/view/index'
import Types from "../pages/admin/types/index";
import MyEvents from "../pages/event/myEvents";
import MySession from "../pages/mySession/index";

import ProtectedRoute from '../utils/protectedRoute'
import ProtectedRouteAdmin from '../utils/protectedRouteAdmin';
import Sessions from "../pages/admin/sessions";
import Settings from "../pages/admin/settings";

const routes = {
    '/' : () => <Home />,
    '/passwordForget' : () => <Password />,
    '/passwordReset/:token' : (token) => <PasswordReset token={token} />,

    '/profil/:idUser' : (idUser) =>    <ProtectedRoute> <Userprofile idUser={idUser} /></ProtectedRoute>,
    '/profil' : () =>    <ProtectedRoute> <UserprofileEdit /></ProtectedRoute>,
    '/options' : () =>   <ProtectedRoute> <Options />   </ProtectedRoute>,
    '/mesSeances': () => <ProtectedRoute> <MySession /> </ProtectedRoute>,
    '/myEvents': () => <ProtectedRoute> <MyEvents /> </ProtectedRoute>,
    '/seances': () => <ProtectedRoute> <Seances />                          </ProtectedRoute>,
    '/seances/ajoutSeance': () => <ProtectedRoute> <AddSession />                       </ProtectedRoute>,
    '/seance/:seanceId': (seanceId) => <ProtectedRoute> <ViewsSession seanceId={seanceId} /> </ProtectedRoute>,
    '/seances/evenement/ajout': () => <ProtectedRoute> <AddEvent />                         </ProtectedRoute>,
    '/evenement/modifier/:eventID': (eventID) => <ProtectedRoute> <AddEvent edit eventID={eventID} /> </ProtectedRoute>,

    '/seances/modifier/:sessionID': (sessionID) => <ProtectedRoute> <AddSession id={sessionID} edit />  </ProtectedRoute>,

    '/administration': () => <ProtectedRoute><ProtectedRouteAdmin> <Administration /> </ProtectedRouteAdmin></ProtectedRoute>,
    '/administration/utilisateurs': () => <ProtectedRoute><ProtectedRouteAdmin> <GererUtilisateur /></ProtectedRouteAdmin></ProtectedRoute>,
    '/administration/utilisateurs/ajout': () => <ProtectedRoute><ProtectedRouteAdmin> <AddUser />        </ProtectedRouteAdmin></ProtectedRoute>,
    '/administration/modules': () => <ProtectedRoute><ProtectedRouteAdmin> <EditModule />     </ProtectedRouteAdmin></ProtectedRoute>,
    '/administration/groupe': () => <ProtectedRoute><ProtectedRouteAdmin> <EditGroup />      </ProtectedRouteAdmin></ProtectedRoute>,
    '/administration/type': () => <ProtectedRoute><ProtectedRouteAdmin> <Types />          </ProtectedRouteAdmin></ProtectedRoute>,
    '/administration/sessions': () => <ProtectedRoute><ProtectedRouteAdmin> <Sessions />       </ProtectedRouteAdmin></ProtectedRoute>,
    '/administration/parametres': () => <ProtectedRoute><ProtectedRouteAdmin> <Settings />       </ProtectedRouteAdmin></ProtectedRoute>,

    '/test': () => <Test />,
};

export default routes;